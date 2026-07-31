import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { Loader2, Lock, Mail, Shield } from "lucide-react";
import { useAuth } from "@/features/auth";
import {
  getEmailAuthErrorMessage,
  signInWithEmailPassword,
  signOutEmailAuth
} from "@/features/auth/services/emailAuthService";
import { USER_ROLES } from "@/utils/constants";

const t = {
  en: {
    title: "Admin Login",
    subtitle: "Sign in with your admin email and password.",
    email: "Email",
    emailPlaceholder: "admin@bharatgig.com",
    password: "Password",
    passwordPlaceholder: "Enter password",
    signIn: "Sign in",
    signingIn: "Signing in…",
    backHome: "Back to Home",
    setupHint:
      "Enable Email/Password in Firebase Authentication, create the admin user there, then set users/{uid}.role = \"admin\" in Firestore.",
    notAdmin:
      "This account is not a platform admin. Set users/{uid}.role = \"admin\" in Firestore for this user."
  },
  hi: {
    title: "एडमिन लॉगिन",
    subtitle: "अपने एडमिन ईमेल और पासवर्ड से साइन इन करें।",
    email: "ईमेल",
    emailPlaceholder: "admin@bharatgig.com",
    password: "पासवर्ड",
    passwordPlaceholder: "पासवर्ड दर्ज करें",
    signIn: "साइन इन",
    signingIn: "साइन इन हो रहा है…",
    backHome: "होम पर वापस",
    setupHint:
      "Firebase Authentication में Email/Password चालू करें, एडमिन यूज़र बनाएँ, फिर Firestore में users/{uid}.role = \"admin\" सेट करें।",
    notAdmin:
      "यह खाता प्लेटफ़ॉर्म एडमिन नहीं है। Firestore में इस यूज़र के लिए role = \"admin\" सेट करें।"
  }
};

function AdminLoginPage({ lang = "en" }) {
  const txt = t[lang] || t.en;
  const navigate = useNavigate();
  const { user, profile, loading, profileLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pendingCheck, setPendingCheck] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pendingCheck || loading || profileLoading) return;

    if (profile?.role === USER_ROLES.ADMIN) {
      setPendingCheck(false);
      setSubmitting(false);
      navigate("/admin", { replace: true });
      return;
    }

    setPendingCheck(false);
    setSubmitting(false);
    setError(txt.notAdmin);
    signOutEmailAuth().catch(() => {});
  }, [pendingCheck, loading, profileLoading, profile, navigate, txt.notAdmin]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signInWithEmailPassword(email, password);
      setPendingCheck(true);
    } catch (err) {
      console.error("Admin email login failed:", err);
      setError(getEmailAuthErrorMessage(err?.code, lang));
      setSubmitting(false);
      setPendingCheck(false);
    }
  };

  if (!loading && !profileLoading && user && profile?.role === USER_ROLES.ADMIN) {
    return <Navigate to="/admin" replace />;
  }

  const busy = submitting || pendingCheck || loading || profileLoading;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#2563EB]">
            <Shield className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#0F172A]">{txt.title}</h1>
          <p className="mt-2 text-sm text-[#64748B]">{txt.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="admin-email" className="text-sm font-semibold text-[#0F172A]">
              {txt.email}
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={txt.emailPlaceholder}
                className="h-12 w-full rounded-xl border-2 border-[#E2E8F0] bg-white pl-10 pr-3 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="admin-password" className="text-sm font-semibold text-[#0F172A]">
              {txt.password}
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={txt.passwordPlaceholder}
                className="h-12 w-full rounded-xl border-2 border-[#E2E8F0] bg-white pl-10 pr-3 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-70"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {busy ? txt.signingIn : txt.signIn}
          </button>
        </form>

        <p className="mt-5 text-center text-xs leading-relaxed text-[#94A3B8]">{txt.setupHint}</p>
        <div className="mt-4 text-center">
          <Link to="/" className="text-sm font-semibold text-[#2563EB] hover:underline">
            {txt.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}

export { AdminLoginPage };
