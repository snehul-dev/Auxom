import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user);

  console.log("ADMIN USER:", user);
  console.log("ADMIN ROLE:", user?.role);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role?.toLowerCase() !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminProtectedRoute;