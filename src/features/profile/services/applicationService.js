import {
  collection,
  deleteDoc,
  doc,
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

function applicationsCol() {
  return collection(getFirebaseDb(), COLLECTIONS.APPLICATIONS);
}

function savedJobsCol() {
  return collection(getFirebaseDb(), COLLECTIONS.SAVED_JOBS);
}

async function findApplication(candidateId, jobId) {
  const q = query(
    applicationsCol(),
    where("candidateId", "==", candidateId),
    where("jobId", "==", jobId),
    limit(1)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() };
}

async function listCandidateApplications(candidateId) {
  const q = query(
    applicationsCol(),
    where("candidateId", "==", candidateId),
    limit(50)
  );
  const snapshot = await getDocs(q);
  const apps = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  apps.sort((a, b) => {
    const aTime = a.createdAt?.toMillis?.() ?? a.createdAt?.seconds * 1000 ?? 0;
    const bTime = b.createdAt?.toMillis?.() ?? b.createdAt?.seconds * 1000 ?? 0;
    return bTime - aTime;
  });
  return apps;
}

async function listOrganizationApplications(organizationId, max = 100) {
  if (!organizationId) return [];
  const q = query(
    applicationsCol(),
    where("organizationId", "==", organizationId),
    limit(max)
  );
  const snapshot = await getDocs(q);
  const apps = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  apps.sort((a, b) => {
    const aTime = a.createdAt?.toMillis?.() ?? a.createdAt?.seconds * 1000 ?? 0;
    const bTime = b.createdAt?.toMillis?.() ?? b.createdAt?.seconds * 1000 ?? 0;
    return bTime - aTime;
  });
  return apps;
}

async function listJobApplications(jobId, max = 100) {
  if (!jobId) return [];
  const q = query(
    applicationsCol(),
    where("jobId", "==", jobId),
    limit(max)
  );
  const snapshot = await getDocs(q);
  const apps = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  apps.sort((a, b) => {
    const aTime = a.createdAt?.toMillis?.() ?? a.createdAt?.seconds * 1000 ?? 0;
    const bTime = b.createdAt?.toMillis?.() ?? b.createdAt?.seconds * 1000 ?? 0;
    return bTime - aTime;
  });
  return apps;
}

async function updateApplicationStatus(applicationId, status) {
  await updateDoc(doc(getFirebaseDb(), COLLECTIONS.APPLICATIONS, applicationId), {
    status,
    updatedAt: serverTimestamp()
  });
}

async function applyToJob({ candidateId, job, candidateName = "", candidatePhone = "" }) {
  const existing = await findApplication(candidateId, job.id);
  if (existing) return { ...existing, alreadyApplied: true };

  const appRef = doc(applicationsCol());
  const application = {
    candidateId,
    candidateName: candidateName || "",
    candidatePhone: candidatePhone || "",
    jobId: job.id,
    organizationId: job.organizationId,
    organizationName: job.organizationName ?? "",
    jobTitle: job.title ?? "",
    location: job.location ?? "",
    status: "applied",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  await setDoc(appRef, application);
  return { id: appRef.id, ...application, alreadyApplied: false };
}

async function findSavedJob(candidateId, jobId) {
  const q = query(
    savedJobsCol(),
    where("candidateId", "==", candidateId),
    where("jobId", "==", jobId),
    limit(1)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() };
}

async function listSavedJobIds(candidateId) {
  const q = query(
    savedJobsCol(),
    where("candidateId", "==", candidateId),
    limit(100)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, jobId: d.data().jobId }));
}

async function listSavedJobs(candidateId) {
  const q = query(
    savedJobsCol(),
    where("candidateId", "==", candidateId),
    limit(100)
  );
  const snapshot = await getDocs(q);
  const saved = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  saved.sort((a, b) => {
    const aTime = a.createdAt?.toMillis?.() ?? a.createdAt?.seconds * 1000 ?? 0;
    const bTime = b.createdAt?.toMillis?.() ?? b.createdAt?.seconds * 1000 ?? 0;
    return bTime - aTime;
  });
  return saved;
}

async function saveJob({ candidateId, job }) {
  const existing = await findSavedJob(candidateId, job.id);
  if (existing) return existing;

  const ref = doc(savedJobsCol());
  const saved = {
    candidateId,
    jobId: job.id,
    organizationId: job.organizationId,
    organizationName: job.organizationName ?? "",
    jobTitle: job.title ?? "",
    location: job.location ?? "",
    createdAt: serverTimestamp()
  };
  await setDoc(ref, saved);
  return { id: ref.id, ...saved };
}

async function unsaveJob(savedDocId) {
  await deleteDoc(doc(getFirebaseDb(), COLLECTIONS.SAVED_JOBS, savedDocId));
}

export {
  applyToJob,
  findApplication,
  findSavedJob,
  listCandidateApplications,
  listJobApplications,
  listOrganizationApplications,
  listSavedJobIds,
  listSavedJobs,
  saveJob,
  unsaveJob,
  updateApplicationStatus
};
