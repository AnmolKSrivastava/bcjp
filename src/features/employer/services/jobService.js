import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";
import { COLLECTIONS } from "@/utils/constants";
import { isValidTaxonomy, taxonomyPayload } from "@/features/taxonomy";

function jobDocRef(jobId) {
  return doc(getFirebaseDb(), COLLECTIONS.JOB_OPENINGS, jobId);
}

function parseSkillsInput(value) {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseSalaryNumber(value) {
  const digits = String(value ?? "").replace(/[^\d]/g, "");
  return digits ? Number(digits) : null;
}

function mapJobDoc(snapshot) {
  return { id: snapshot.id, ...snapshot.data() };
}

async function fetchJobOpening(jobId) {
  if (!jobId) return null;
  const snapshot = await getDoc(jobDocRef(jobId));
  return snapshot.exists() ? mapJobDoc(snapshot) : null;
}

/**
 * Public listing of open jobs, newest first.
 * Sorts client-side so listing works while the composite index builds.
 */
async function listOpenJobs(max = 24) {
  const jobsQuery = query(
    collection(getFirebaseDb(), COLLECTIONS.JOB_OPENINGS),
    where("status", "==", "open"),
    limit(Math.max(max, 50))
  );
  const snapshot = await getDocs(jobsQuery);
  const jobs = snapshot.docs.map(mapJobDoc);
  jobs.sort((a, b) => {
    const aTime = a.createdAt?.toMillis?.() ?? a.createdAt?.seconds * 1000 ?? 0;
    const bTime = b.createdAt?.toMillis?.() ?? b.createdAt?.seconds * 1000 ?? 0;
    return bTime - aTime;
  });
  return jobs.slice(0, max);
}

async function listOrganizationJobs(organizationId, max = 50) {
  if (!organizationId) return [];
  const jobsQuery = query(
    collection(getFirebaseDb(), COLLECTIONS.JOB_OPENINGS),
    where("organizationId", "==", organizationId),
    limit(max)
  );
  const snapshot = await getDocs(jobsQuery);
  const jobs = snapshot.docs.map(mapJobDoc);
  jobs.sort((a, b) => {
    const aTime = a.createdAt?.toMillis?.() ?? a.createdAt?.seconds * 1000 ?? 0;
    const bTime = b.createdAt?.toMillis?.() ?? b.createdAt?.seconds * 1000 ?? 0;
    return bTime - aTime;
  });
  return jobs;
}

async function updateJobStatus(jobId, status) {
  await updateDoc(jobDocRef(jobId), {
    status,
    updatedAt: serverTimestamp()
  });
  return fetchJobOpening(jobId);
}

async function closeJobOpening(jobId) {
  return updateJobStatus(jobId, "closed");
}

async function reopenJobOpening(jobId) {
  return updateJobStatus(jobId, "open");
}

/**
 * Create a job opening for an employer's organization.
 */
function buildJobFields(formData) {
  if (
    !isValidTaxonomy({
      industryId: formData.industryId,
      departmentId: formData.departmentId,
      roleId: formData.roleId
    })
  ) {
    throw new Error("Please select a valid industry, department, and job role.");
  }

  const taxonomy = taxonomyPayload({
    industryId: formData.industryId,
    departmentId: formData.departmentId,
    roleId: formData.roleId
  });

  return {
    ...taxonomy,
    // Legacy field kept for older listings that read title
    title: taxonomy.roleName,
    description: formData.description.trim(),
    employmentType: formData.employmentType,
    location: formData.location.trim(),
    salaryMin: parseSalaryNumber(formData.salaryMin),
    salaryMax: parseSalaryNumber(formData.salaryMax),
    openings: Number(formData.openings) || 1,
    experienceRequired: formData.experienceRequired,
    skills: parseSkillsInput(formData.skills)
  };
}

/** Map a job doc into PostJobModal form state */
function jobToForm(job) {
  if (!job) return null;
  return {
    industryId: job.industryId || "",
    departmentId: job.departmentId || "",
    roleId: job.roleId || "",
    employmentType: job.employmentType || "",
    location: job.location || "",
    salaryMin: job.salaryMin != null ? String(job.salaryMin) : "",
    salaryMax: job.salaryMax != null ? String(job.salaryMax) : "",
    openings: job.openings != null ? String(job.openings) : "1",
    experienceRequired: job.experienceRequired || "",
    skills: Array.isArray(job.skills) ? job.skills.join(", ") : "",
    description: job.description || ""
  };
}

async function createJobOpening({ userId, organization, formData }) {
  if (!organization?.id) {
    throw new Error("Organization is required to post a job.");
  }

  const fields = buildJobFields(formData);
  const jobRef = doc(collection(getFirebaseDb(), COLLECTIONS.JOB_OPENINGS));

  const job = {
    organizationId: organization.id,
    organizationName: organization.name ?? "",
    ...fields,
    status: "open",
    createdBy: userId,
    publishedAt: serverTimestamp(),
    version: 1,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  await setDoc(jobRef, job);
  return fetchJobOpening(jobRef.id);
}

/**
 * Update editable fields on an existing job. Preserves org, creator, status, timestamps.
 */
async function updateJobOpening(jobId, formData) {
  if (!jobId) {
    throw new Error("Job id is required.");
  }

  const existing = await fetchJobOpening(jobId);
  if (!existing) {
    throw new Error("Job not found.");
  }

  const fields = buildJobFields(formData);
  await updateDoc(jobDocRef(jobId), {
    ...fields,
    updatedAt: serverTimestamp()
  });
  return fetchJobOpening(jobId);
}

export {
  closeJobOpening,
  createJobOpening,
  fetchJobOpening,
  jobToForm,
  listOpenJobs,
  listOrganizationJobs,
  parseSkillsInput,
  reopenJobOpening,
  updateJobOpening,
  updateJobStatus
};
