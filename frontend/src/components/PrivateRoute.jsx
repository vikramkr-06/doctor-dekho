import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth.jsx"
import Loading from "./Loading.jsx"

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <Loading />
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return children
}

export default PrivateRoute

