import { getCurrentUser } from "./auth";

export default function ProtectedRoute({ children }) {
  const user = getCurrentUser();

  if (!user) {
    window.location.href = "/login"; 
    return null;
  }

  return children;
}
