import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";
const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  const signOut = async () => {
    if (!isFirebaseConfigured) return;
    await firebaseSignOut(getFirebaseAuth());
  };
  return <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>;
}
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
export {
  AuthProvider,
  useAuth
};
