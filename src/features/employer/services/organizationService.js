import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  writeBatch
} from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";
import { COLLECTIONS } from "@/utils/constants";

function organizationDocRef(orgId) {
  return doc(getFirebaseDb(), COLLECTIONS.ORGANIZATIONS, orgId);
}

async function fetchOrganization(orgId) {
  if (!orgId) return null;
  const snapshot = await getDoc(organizationDocRef(orgId));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

/**
 * Create organization and link it to the employer user account.
 */
async function saveOrganizationProfile(userId, formData, phone) {
  const orgRef = doc(collection(getFirebaseDb(), COLLECTIONS.ORGANIZATIONS));
  const organization = {
    name: formData.companyName.trim(),
    industry: formData.industry,
    city: formData.city.trim(),
    contactPersonName: formData.contactPersonName.trim(),
    contactPhone: phone ?? "",
    description: formData.description?.trim() ?? "",
    ownerId: userId,
    createdBy: userId,
    verificationStatus: "pending",
    status: "active",
    version: 1,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  const batch = writeBatch(getFirebaseDb());
  batch.set(orgRef, organization);
  batch.update(doc(getFirebaseDb(), COLLECTIONS.USERS, userId), {
    organizationId: orgRef.id,
    displayName: formData.contactPersonName.trim(),
    onboardingComplete: true,
    updatedAt: serverTimestamp()
  });
  await batch.commit();

  return fetchOrganization(orgRef.id);
}

export { fetchOrganization, saveOrganizationProfile };
