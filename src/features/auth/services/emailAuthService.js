import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

function getEmailAuthErrorMessage(code, lang = "en") {
  const messages = {
    "auth/invalid-email": {
      en: "Please enter a valid email address.",
      hi: "कृपया एक वैध ईमेल पता दर्ज करें।"
    },
    "auth/user-disabled": {
      en: "This admin account has been disabled.",
      hi: "यह एडमिन खाता निष्क्रिय कर दिया गया है।"
    },
    "auth/user-not-found": {
      en: "No account found with this email.",
      hi: "इस ईमेल से कोई खाता नहीं मिला।"
    },
    "auth/wrong-password": {
      en: "Incorrect password. Please try again.",
      hi: "गलत पासवर्ड। कृपया पुनः प्रयास करें।"
    },
    "auth/invalid-credential": {
      en: "Incorrect email or password.",
      hi: "गलत ईमेल या पासवर्ड।"
    },
    "auth/too-many-requests": {
      en: "Too many attempts. Please try again later.",
      hi: "बहुत अधिक प्रयास। कृपया बाद में पुनः प्रयास करें।"
    },
    "auth/operation-not-allowed": {
      en: "Email/password sign-in is not enabled. Enable it in Firebase Console → Authentication → Sign-in method.",
      hi: "ईमेल/पासवर्ड साइन-इन सक्षम नहीं है। Firebase Console → Authentication → Sign-in method में इसे चालू करें।"
    },
    "auth/network-request-failed": {
      en: "Network error. Check your connection and try again.",
      hi: "नेटवर्क त्रुटि। कनेक्शन जाँचें और पुनः प्रयास करें।"
    }
  };
  return (
    messages[code]?.[lang] ??
    (lang === "hi" ? "लॉगिन विफल। पुनः प्रयास करें।" : "Login failed. Please try again.")
  );
}

async function signInWithEmailPassword(email, password) {
  const credential = await signInWithEmailAndPassword(
    getFirebaseAuth(),
    String(email || "").trim(),
    String(password || "")
  );
  return credential.user;
}

async function signOutEmailAuth() {
  await firebaseSignOut(getFirebaseAuth());
}

export { getEmailAuthErrorMessage, signInWithEmailPassword, signOutEmailAuth };
