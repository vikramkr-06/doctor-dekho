import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { loginUser, logoutUser, registerUser, getCurrentUser, updateUserProfile } from "../services/authService.js"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const userData = await getCurrentUser()
        setUser(userData)
      } catch (error) {
        console.error("Not authenticated", error)
      } finally {
        setLoading(false)
      }
    }

    checkUserLoggedIn()
  }, [])

  const register = async (userData) => {
    try {
      setLoading(true)
      const response = await registerUser(userData)
      setUser(response.user)
      toast.success("Registration successful!")
      return true
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed")
      return false
    } finally {
      setLoading(false)
    }
  }

  const login = async (userData) => {
    try {
      setLoading(true)
      const response = await loginUser(userData)
      setUser(response.user)
      toast.success("Login successful!")
      return true
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed")
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await logoutUser()
      setUser(null)
      toast.success("Logged out successfully")
    } catch (error) {
      toast.error("Logout failed")
    }
  }

  const updateProfile = async (profileData) => {
    try {
      setLoading(true)
      const response = await updateUserProfile(profileData)
      setUser(response.user)
      toast.success("Profile updated successfully")
      return true
    } catch (error) {
      toast.error(error.response?.data?.error || "Profile update failed")
      return false
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

