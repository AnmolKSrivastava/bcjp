import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";
import { COLLECTIONS } from "@/utils/constants";
import { closeJobOpening, reopenJobOpening } from "@/features/employer/services/jobService";

function sortByCreatedDesc(items) {
  return [...items].sort((a, b) => {
    const aTime = a.createdAt?.toMillis?.() ?? a.createdAt?.seconds * 1000 ?? 0;
    const bTime = b.createdAt?.toMillis?.() ?? b.createdAt?.seconds * 1000 ?? 0;
    return bTime - aTime;
  });
}

function mapDocs(snapshot) {
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

async function listAllOrganizations(max = 100) {
  const snapshot = await getDocs(
    query(collection(getFirebaseDb(), COLLECTIONS.ORGANIZATIONS), limit(max))
  );
  return sortByCreatedDesc(mapDocs(snapshot));
}

async function listAllJobs(max = 100) {
  const snapshot = await getDocs(
    query(collection(getFirebaseDb(), COLLECTIONS.JOB_OPENINGS), limit(max))
  );
  return sortByCreatedDesc(mapDocs(snapshot));
}

async function listAllCandidates(max = 100) {
  const snapshot = await getDocs(
    query(collection(getFirebaseDb(), COLLECTIONS.CANDIDATES), limit(max))
  );
  return sortByCreatedDesc(mapDocs(snapshot));
}

async function listAllApplications(max = 100) {
  const snapshot = await getDocs(
    query(collection(getFirebaseDb(), COLLECTIONS.APPLICATIONS), limit(max))
  );
  return sortByCreatedDesc(mapDocs(snapshot));
}

async function updateOrganizationAdmin(orgId, updates) {
  await updateDoc(doc(getFirebaseDb(), COLLECTIONS.ORGANIZATIONS, orgId), {
    ...updates,
    updatedAt: serverTimestamp()
  });
}

async function verifyOrganization(orgId) {
  await updateOrganizationAdmin(orgId, { verificationStatus: "verified" });
}

async function suspendOrganization(orgId) {
  await updateOrganizationAdmin(orgId, { status: "suspended" });
}

async function reactivateOrganization(orgId) {
  await updateOrganizationAdmin(orgId, { status: "active" });
}

async function adminCloseJob(jobId) {
  return closeJobOpening(jobId);
}

async function adminReopenJob(jobId) {
  return reopenJobOpening(jobId);
}

export {
  adminCloseJob,
  adminReopenJob,
  listAllApplications,
  listAllCandidates,
  listAllJobs,
  listAllOrganizations,
  reactivateOrganization,
  suspendOrganization,
  verifyOrganization
};
