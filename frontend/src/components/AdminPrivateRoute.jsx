import { Navigate } from "react-router-dom"
import { useAdminAuth } from "../hooks/useAdminAuth.jsx"
import Loading from "./Loading.jsx"

const AdminPrivateRoute = ({ children, superAdminOnly = false }) => {
  const { isAuthenticated, isSuperAdmin, loading } = useAdminAuth()

  if (loading) {
    return (
      <Loading />
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />
  }

  if (superAdminOnly && !isSuperAdmin) {
    return <Navigate to="/admin/dashboard" />
  }

  return children
}

export default AdminPrivateRoute

