import { getCurrentUser } from "./auth";

export default function ProtectedRoute({ children }) {
  const user = getCurrentUser();

  if (!user || user.role !== "admin") {
    window.location.href = "/login"; 
    return null;
  }

  return children;
}
