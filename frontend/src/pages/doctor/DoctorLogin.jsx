import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDoctorAuth } from "../../hooks/useDoctorAuth.jsx"
import { useForm } from "../../hooks/useForm.jsx"

const DoctorLogin = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated, isVerified } = useDoctorAuth()

  const { values, errors, handleChange, validate, resetForm } = useForm({
    email: "",
    password: "",
  })

  useEffect(() => {
    if (isAuthenticated) {
      if (isVerified) {
        navigate("/doctor/dashboard")
      } else {
        navigate("/doctor/pending")
      }
    }
  }, [isAuthenticated, isVerified, navigate])

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
        if (isVerified) {
          navigate("/doctor/dashboard")
        } else {
          navigate("/doctor/pending")
        }
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Doctor Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-0 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-0 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button type="submit" className="w-full cursor-pointer bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have a doctor account?
          <Link to="/doctor/register" className="text-blue-600 hover:underline ml-1">
            Register
          </Link>
        </p>

        <div className="mt-6 border-t pt-4">
          <p className="text-center text-gray-600">
            <Link to="/login" className="text-blue-600 hover:underline">
              Login as Patient
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DoctorLogin

