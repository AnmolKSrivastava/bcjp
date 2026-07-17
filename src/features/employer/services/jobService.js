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
async function createJobOpening({ userId, organization, formData }) {
  if (!organization?.id) {
    throw new Error("Organization is required to post a job.");
  }

  const jobRef = doc(collection(getFirebaseDb(), COLLECTIONS.JOB_OPENINGS));
  const salaryMin = parseSalaryNumber(formData.salaryMin);
  const salaryMax = parseSalaryNumber(formData.salaryMax);
  const openings = Number(formData.openings) || 1;

  const job = {
    organizationId: organization.id,
    organizationName: organization.name ?? "",
    title: formData.title.trim(),
    description: formData.description.trim(),
    employmentType: formData.employmentType,
    location: formData.location.trim(),
    salaryMin,
    salaryMax,
    openings,
    experienceRequired: formData.experienceRequired,
    skills: parseSkillsInput(formData.skills),
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

export {
  closeJobOpening,
  createJobOpening,
  fetchJobOpening,
  listOpenJobs,
  listOrganizationJobs,
  parseSkillsInput,
  reopenJobOpening,
  updateJobStatus
};
