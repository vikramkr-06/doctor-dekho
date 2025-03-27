import { useContext } from "react"
import { DoctorAuthContext } from "../context/DoctorAuthContext.jsx"

export const useDoctorAuth = () => {
  const context = useContext(DoctorAuthContext)

  if (!context) {
    throw new Error("useDoctorAuth must be used within a DoctorAuthProvider")
  }

  return context
}

