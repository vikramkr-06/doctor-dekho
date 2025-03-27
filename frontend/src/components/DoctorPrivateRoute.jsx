import { Navigate } from "react-router-dom"
import { useDoctorAuth } from "../hooks/useDoctorAuth.jsx"
import Loading from "./Loading.jsx"

const DoctorPrivateRoute = ({ children, requireVerification = true }) => {
  const { isAuthenticated, isVerified, loading } = useDoctorAuth()

  if (loading) {
    return (
      <Loading />
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/doctor/login" />
  }

  if (requireVerification && !isVerified) {
    return <Navigate to="/doctor/pending" />
  }

  return children
}

export default DoctorPrivateRoute
