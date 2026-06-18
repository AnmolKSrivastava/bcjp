import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (value) => typeof value === "string" && value.length > 0
);
let authInstance = null;
function getFirebaseAuth() {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Add credentials to your .env file.");
  }
  if (!authInstance) {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    authInstance = getAuth(app);
  }
  return authInstance;
}
export {
  getFirebaseAuth,
  isFirebaseConfigured
};
