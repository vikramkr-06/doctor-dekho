import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDoctorAuth } from "../../hooks/useDoctorAuth.jsx"
import { useForm } from "../../hooks/useForm.jsx"

const DoctorRegister = () => {
  const navigate = useNavigate()
  const { register, isAuthenticated, isVerified } = useDoctorAuth()
  const [errors, setErrors] = useState({})

  const { values, handleChange, validate, resetForm } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    licenseNumber: "",
    phone: "",
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
    specialization: {
      required: true,
    },
    licenseNumber: {
      required: true,
    },
    phone: {
      required: true,
      pattern: /^[0-9]{10}$/,
      message: "Please enter a valid 10-digit phone number",
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
      const { confirmPassword, ...doctorData } = values

      const success = await register(doctorData)
      if (success) {
        resetForm()
        navigate("/doctor/pending")
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto pt-20 px-6">
      <div className="bg-white shadow-xl rounded-2xl px-8 py-2 border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">Doctor Registration</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
            {[
              { label: "Full Name", name: "name", type: "text", placeholder: "Enter your full name" },
              { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
              { label: "Specialization", name: "specialization", type: "text", placeholder: "e.g., Cardiology, Pediatrics" },
              { label: "License Number", name: "licenseNumber", type: "text", placeholder: "Enter your medical license number" },
              { label: "Phone Number", name: "phone", type: "tel", placeholder: "10-digit phone number" },
              { label: "Password", name: "password", type: "password", placeholder: "Enter your password" },
              { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Confirm your password" }
            ].map((field, index) => (
              <div key={index}>
                <label htmlFor={field.name} className="block text-gray-700 font-medium mb-2">{field.label}</label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={values[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border focus:outline-0 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
                  placeholder={field.placeholder}
                />
                {errors[field.name] && <p className="text-red-500 mt-1 text-sm">{errors[field.name]}</p>}
              </div>
            ))}
          </div>

          <div className="bg-blue-50 p-4 rounded-md mb-6 text-sm text-blue-800 border-l-4 border-blue-600">
            <p className="font-semibold mb-1">Important Note:</p>
            <p>Your account will need to be verified by an administrator before accessing all features. We will review your credentials and approve your account as soon as possible.</p>
          </div>

          <button type="submit" className="w-full py-3 bg-primary-600 hover:bg-primary-700 cursor-pointer font-bold rounded-lg shadow-md transition duration-300">
            Register as Doctor
          </button>
        </form>

        <p className="text-center text-gray-600 mt-3">
          Already have an account?{' '}
          <Link to="/doctor/login" className="text-primary-600 hover:underline font-medium">
            Login
          </Link>
        </p>

        <div className="mt-2 pt-2 border-t border-gray-300">
          <p className="text-center text-gray-600">
            <Link to="/register" className="text-primary-600 hover:underline font-medium">
              Register as Patient
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DoctorRegister

