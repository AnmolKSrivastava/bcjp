import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp
} from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";
import { COLLECTIONS } from "@/utils/constants";

function userDocRef(uid) {
  return doc(getFirebaseDb(), COLLECTIONS.USERS, uid);
}

/**
 * Fetch the Firestore user profile for a given auth uid.
 * Returns null when the user has not completed onboarding yet.
 */
async function fetchUserProfile(uid) {
  const snapshot = await getDoc(userDocRef(uid));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

/**
 * Create the user document right after first login (onboarding).
 * Document shape follows documentation/08-architecture/02-Database-Architecture-and-Data-Model.md
 */
async function createUserProfile(user, { role, language }) {
  const profile = {
    phone: user.phoneNumber ?? "",
    role,
    language,
    displayName: "",
    organizationId: null,
    onboardingComplete: false,
    status: "active",
    version: 1,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  await setDoc(userDocRef(user.uid), profile);
  return fetchUserProfile(user.uid);
}

/**
 * Update mutable fields on the user document.
 */
async function updateUserProfile(uid, updates) {
  await updateDoc(userDocRef(uid), {
    ...updates,
    updatedAt: serverTimestamp()
  });
  return fetchUserProfile(uid);
}

export {
  createUserProfile,
  fetchUserProfile,
  updateUserProfile
};
