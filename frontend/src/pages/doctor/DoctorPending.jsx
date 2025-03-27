import { Link } from "react-router-dom"
import { useDoctorAuth } from "../../hooks/useDoctorAuth.jsx"

const DoctorPending = () => {
  const { doctor, logout } = useDoctorAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Account Pending Verification</h2>
          <p className="text-gray-600 mb-6">
            Thank you for registering as a doctor, {doctor?.name}. Your account is currently pending verification by our
            administrators.
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-md mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">What happens next?</h3>
          <ul className="list-disc list-inside text-blue-700 space-y-1">
            <li>Our team will review your credentials</li>
            <li>We may contact you for additional information</li>
            <li>Once verified, you'll have full access to the doctor dashboard</li>
            <li>This process typically takes 1-2 business days</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h3 className="font-semibold mb-2">Your Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <p className="text-gray-600 text-sm">Name</p>
              <p>{doctor?.name}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Email</p>
              <p>{doctor?.email}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Specialization</p>
              <p>{doctor?.specialization}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">License Number</p>
              <p>{doctor?.licenseNumber}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-secondary text-center">
            Return to Home
          </Link>
          <button onClick={handleLogout} className="btn-primary text-center">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default DoctorPending

