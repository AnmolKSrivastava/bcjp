import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirebaseDb, getFirebaseStorage } from "@/lib/firebase";
import { COLLECTIONS } from "@/utils/constants";
import { updateUserProfile } from "@/features/auth/services/userService";
import { isValidTaxonomy, taxonomyPayload } from "@/features/taxonomy";

function candidateDocRef(uid) {
  return doc(getFirebaseDb(), COLLECTIONS.CANDIDATES, uid);
}

function parseSkillsInput(value) {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function calcCompletionPercent(data) {
  const fields = [
    data.fullName,
    data.industryId,
    data.departmentId,
    data.roleId,
    data.yearsOfExperience,
    data.preferredWorkLocation,
    data.expectedSalary,
    data.availability,
    data.skills?.length,
    data.languages?.length
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

async function fetchCandidateProfile(uid) {
  const snapshot = await getDoc(candidateDocRef(uid));
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
}

async function uploadResume(uid, file) {
  const ext = file.name.split(".").pop() ?? "pdf";
  const storageRef = ref(getFirebaseStorage(), `resumes/${uid}/resume.${ext}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

async function saveCandidateProfile(uid, formData, phone) {
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

  let resumeUrl = null;
  if (formData.resumeFile) {
    resumeUrl = await uploadResume(uid, formData.resumeFile);
  }

  const skills = parseSkillsInput(formData.skills);
  const candidate = {
    userId: uid,
    fullName: formData.fullName.trim(),
    ...taxonomy,
    // Legacy display field for older UI that still reads occupation
    occupation: taxonomy.roleName,
    yearsOfExperience: formData.yearsOfExperience,
    preferredWorkLocation: formData.preferredWorkLocation.trim(),
    expectedSalary: formData.expectedSalary.trim(),
    availability: formData.availability,
    skills,
    languages: formData.languages,
    phone: phone ?? "",
    resumeUrl,
    status: "active",
    profileCompletionPercent: 0,
    version: 1,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  candidate.profileCompletionPercent = calcCompletionPercent(candidate);

  await setDoc(candidateDocRef(uid), candidate, { merge: true });
  await updateUserProfile(uid, {
    displayName: candidate.fullName,
    onboardingComplete: true
  });

  return fetchCandidateProfile(uid);
}

export {
  calcCompletionPercent,
  fetchCandidateProfile,
  parseSkillsInput,
  saveCandidateProfile
};
