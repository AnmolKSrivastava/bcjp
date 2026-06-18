import { LoginModal } from "./components/LoginModal";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { usePhoneAuth, formatIndianPhone } from "./hooks/usePhoneAuth";
export {
  AuthProvider,
  LoginModal,
  formatIndianPhone,
  useAuth,
  usePhoneAuth
};
