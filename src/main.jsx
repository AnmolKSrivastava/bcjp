import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app/App";
import { AuthProvider } from "@/features/auth";
import { ScrollToTop } from "@/shared/common/ScrollToTop";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ScrollToTop />
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
