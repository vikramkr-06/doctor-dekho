import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import {
  loginDoctor,
  logoutDoctor,
  registerDoctor,
  getCurrentDoctor,
  updateDoctorProfile,
} from "../services/doctorAuthService.js"

export const DoctorAuthContext = createContext()

export const DoctorAuthProvider = ({ children }) => {
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkDoctorLoggedIn = async () => {
      try {
        const doctorData = await getCurrentDoctor()
        setDoctor(doctorData)
      } catch (error) {
        console.error("Doctor not authenticated", error)
      } finally {
        setLoading(false)
      }
    }

    checkDoctorLoggedIn()
  }, [])

  const register = async (doctorData) => {
    try {
      setLoading(true)
      const response = await registerDoctor(doctorData)
      setDoctor(response.doctor)
      toast.success("Doctor registration successful! Awaiting verification.")
      return true
    } catch (error) {
      toast.error(error.response?.data?.error || "Doctor registration failed")
      return false
    } finally {
      setLoading(false)
    }
  }

  const login = async (doctorData) => {
    try {
      setLoading(true)
      const response = await loginDoctor(doctorData)
      setDoctor(response.doctor)
      toast.success("Doctor login successful!")
      return true
    } catch (error) {
      toast.error(error.response?.data?.error || "Doctor login failed")
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await logoutDoctor()
      setDoctor(null)
      toast.success("Doctor logged out successfully")
    } catch (error) {
      toast.error("Doctor logout failed")
    }
  }

  const updateProfile = async (profileData) => {
    try {
      setLoading(true)
      const response = await updateDoctorProfile(profileData)
      setDoctor(response.doctor)
      toast.success("Profile updated successfully")
      return true
    } catch (error) {
      toast.error(error.response?.data?.error || "Profile update failed1")
      return false
    } finally {
      setLoading(false)
    }
  }

  return (
    <DoctorAuthContext.Provider
      value={{
        doctor,
        loading,
        register,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!doctor,
        isVerified: doctor?.isVerified || false,
      }}
    >
      {children}
    </DoctorAuthContext.Provider>
  )
}

