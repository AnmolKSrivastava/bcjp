import { LoginModal } from "./components/LoginModal";
import { RoleSelectionModal } from "./components/RoleSelectionModal";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { usePhoneAuth, formatIndianPhone } from "./hooks/usePhoneAuth";
export {
  AuthProvider,
  LoginModal,
  RoleSelectionModal,
  formatIndianPhone,
  useAuth,
  usePhoneAuth
};
