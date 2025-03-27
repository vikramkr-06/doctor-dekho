import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAdminAuth } from "../../hooks/useAdminAuth.jsx"
import { useForm } from "../../hooks/useForm.jsx"
import { useState } from "react"

import { Eye, EyeOff } from "lucide-react";


const AdminLogin = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAdminAuth()
  const [showPassword, setShowPassword] = useState(false);

  const { values, errors, handleChange, validate, resetForm } = useForm({
    email: "",
    password: "",
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard")
    }
  }, [isAuthenticated, navigate])

  const validationRules = {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
    password: {
      required: true,
    },
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (validate(validationRules)) {
      const success = await login(values)
      if (success) {
        resetForm()
        navigate("/admin/dashboard")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
        <div className="bg-gray-900 text-white py-5 px-6 text-center rounded-t-xl">
          <h2 className="text-2xl font-semibold">Admin Login</h2>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-4 flex items-center text-gray-600 hover:text-gray-900"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Admin access only. Unauthorized access is prohibited.</p>
          </div>
        </div>
      </div>
    </div >
  )
}

export default AdminLogin

