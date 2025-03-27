import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth.jsx"
import { useForm } from "../hooks/useForm.jsx"
import { Eye, EyeOff } from "lucide-react"

const Register = () => {
  const navigate = useNavigate()
  const { register, isAuthenticated } = useAuth()
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { values, handleChange, validate, resetForm } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  const validationRules = {
    name: {
      required: true,
      minLength: 2,
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
    password: {
      required: true,
      minLength: 6,
    },
    confirmPassword: {
      required: true,
    },
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (values.password !== values.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "Passwords do not match",
      })
      return
    }

    if (validate(validationRules)) {
      const userData = { ...values }
      delete userData.confirmPassword
      setErrors({})
      const success = await register(userData)
      if (success) {
        resetForm()
        navigate("/dashboard")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-zinc-100 via-gray-200 to-stone-300">
      <div className="hidden lg:flex w-1/2 h-screen items-center justify-center p-12">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-zinc-700 mb-4 animate-fade-in">
            Welcome Back
          </h1>
          <p className="text-xl text-gray-500 animate-fade-in delay-100">
            Your journey to better health starts here.
          </p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 pt-10">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10">
          <h2 className="text-4xl font-bold underline text-center mb-8 text-stone-600 animate-fade-in">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-stone-300 border border-white/20 text-zinc-800 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 mt-1 text-sm animate-fade-in">{errors.name}</p>
              )}
            </div>

            <div className="">
              <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-stone-300 border border-white/20 text-zinc-800 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 mt-1 text-sm animate-fade-in">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-800 mb-2">
                Password:
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-stone-300 border border-white/20 text-zinc-700 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute cursor-pointer inset-y-0 top-[40%] right-3 flex items-center text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-400 mt-1 text-sm animate-fade-in">{errors.password}</p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-gray-700 mb-2 font-medium">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-stone-300 border border-white/20 text-zinc-800 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="absolute cursor-pointer inset-y-0 top-[40%] right-3 flex items-center text-gray-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 mt-1 text-sm animate-fade-in">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 cursor-pointer bg-gradient-to-r from-stone-600 to-zinc-600 text-white font-semibold rounded-lg hover:from-gray-700 hover:to-zinc-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Register
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-stone-700 hover:text-zinc-900 hover:underline font-semibold transition-all duration-300"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register

