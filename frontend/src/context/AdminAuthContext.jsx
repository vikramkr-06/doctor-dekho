import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import {
  loginAdmin,
  logoutAdmin,
  getCurrentAdmin,
  updateAdminProfile,
  createAdmin,
  getAllAdmins,
  deleteAdmin,
} from "../services/adminAuthService.js"

export const AdminAuthContext = createContext()

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAdminLoggedIn = async () => {
      try {
        const adminData = await getCurrentAdmin()
        setAdmin(adminData)
      } catch (error) {
        console.error("Admin not authenticated", error)
      } finally {
        setLoading(false)
      }
    }

    checkAdminLoggedIn()
  }, [])

  const login = async (adminData) => {
    try {
      setLoading(true)
      const response = await loginAdmin(adminData)
      setAdmin(response.admin)
      toast.success("Admin login successful!")
      return true
    } catch (error) {
      toast.error(error.response?.data?.error || "Admin login failed")
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await logoutAdmin()
      setAdmin(null)
      toast.success("Admin logged out successfully")
    } catch (error) {
      toast.error("Admin logout failed")
    }
  }

  const updateProfile = async (profileData) => {
    try {
      setLoading(true)
      const response = await updateAdminProfile(profileData)
      setAdmin(response.admin)
      toast.success("Profile updated successfully")
      return true
    } catch (error) {
      toast.error(error.response?.data?.error || "Profile update failed")
      return false
    } finally {
      setLoading(false)
    }
  }

  const createNewAdmin = async (adminData) => {
    try {
      setLoading(true)
      const response = await createAdmin(adminData)
      toast.success("New admin created successfully")
      return response.admin
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to create admin")
      return null
    } finally {
      setLoading(false)
    }
  }

  const getAdmins = async () => {
    try {
      setLoading(true)
      const response = await getAllAdmins()
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch admins")
      return []
    } finally {
      setLoading(false)
    }
  }

  const removeAdmin = async (adminId) => {
    try {
      setLoading(true)
      await deleteAdmin(adminId)
      toast.success("Admin deleted successfully")
      return true
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to delete admin")
      return false
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        loading,
        login,
        logout,
        updateProfile,
        createNewAdmin,
        getAdmins,
        removeAdmin,
        isAuthenticated: !!admin,
        isSuperAdmin: admin?.role === "superadmin",
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  )
}

