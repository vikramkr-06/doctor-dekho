import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth.jsx"
import { useForm } from "../hooks/useForm.jsx"
import { Eye, EyeOff } from "lucide-react"


const Login = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const { values, errors, handleChange, validate, resetForm } = useForm({
    email: "",
    password: "",
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
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
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10">
          <h2 className="text-4xl font-bold underline text-center mb-8 text-stone-600 animate-fade-in">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email:
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
                <p className="text-red-400 mt-1 text-sm animate-fade-in">{errors.email}</p>
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
            <button
              type="submit"
              className="w-full px-6 py-3 cursor-pointer bg-gradient-to-r from-stone-600 to-zinc-600 text-white font-semibold rounded-lg hover:from-gray-700 hover:to-zinc-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Login
            </button>
          </form>
          <p className="text-center text-gray-700 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-stone-700 hover:underline font-semibold transition-all duration-300"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

