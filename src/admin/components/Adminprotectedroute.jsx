import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
  const user = useSelector((state) => state?.auth.user);

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminProtectedRoute;