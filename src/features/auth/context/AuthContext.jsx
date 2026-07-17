import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";
import { createUserProfile, fetchUserProfile } from "../services/userService";
import { fetchCandidateProfile } from "@/features/profile/services/candidateService";
import { USER_ROLES } from "@/utils/constants";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [candidateProfile, setCandidateProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), async (nextUser) => {
      setUser(nextUser);
      if (nextUser) {
        setProfileLoading(true);
        try {
          const userProfile = await fetchUserProfile(nextUser.uid);
          setProfile(userProfile);
          if (userProfile?.role === USER_ROLES.WORKER) {
            setCandidateProfile(await fetchCandidateProfile(nextUser.uid));
          } else {
            setCandidateProfile(null);
          }
        } catch (err) {
          console.error("Failed to load user profile", err);
          setProfile(null);
          setCandidateProfile(null);
        } finally {
          setProfileLoading(false);
        }
      } else {
        setProfile(null);
        setCandidateProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const completeOnboarding = useCallback(
    async ({ role, language }) => {
      if (!user) throw new Error("Cannot complete onboarding without a logged-in user.");
      const created = await createUserProfile(user, { role, language });
      setProfile(created);
      setCandidateProfile(null);
      return created;
    },
    [user]
  );

  const refreshProfile = useCallback(async () => {
    if (!user) return null;
    const latest = await fetchUserProfile(user.uid);
    setProfile(latest);
    return latest;
  }, [user]);

  const refreshCandidateProfile = useCallback(async () => {
    if (!user) return null;
    const latest = await fetchCandidateProfile(user.uid);
    setCandidateProfile(latest);
    return latest;
  }, [user]);

  const signOut = async () => {
    if (!isFirebaseConfigured) return;
    await firebaseSignOut(getFirebaseAuth());
  };

  const needsOnboarding = Boolean(user) && !loading && !profileLoading && !profile;
  const needsCandidateProfile =
    Boolean(user) &&
    !loading &&
    !profileLoading &&
    profile?.role === USER_ROLES.WORKER &&
    !profile?.onboardingComplete;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        profile,
        candidateProfile,
        profileLoading,
        needsOnboarding,
        needsCandidateProfile,
        completeOnboarding,
        refreshProfile,
        refreshCandidateProfile,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
