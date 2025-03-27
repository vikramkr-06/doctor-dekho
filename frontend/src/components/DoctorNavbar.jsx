import { Link, useNavigate } from "react-router-dom"
import { useDoctorAuth } from "../hooks/useDoctorAuth.jsx"
import { Menu, User, LogOut, Home, Calendar, Clock, Settings, AlertCircle } from "lucide-react"

const DoctorNavbar = () => {
  const { doctor, logout, isAuthenticated, isVerified } = useDoctorAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/doctor/login")
  }

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold flex items-center">
            <Home className="mr-2" />
            Medibook{" "}
            <span className="text-sm font-normal bg-white text-gray-700 px-2 py-1 rounded ml-2">Doctor</span>
          </Link>

          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center space-x-2">
                  {doctor?.profileImage && (
                    <img
                      src={`${doctor.profileImage}`}
                      alt={doctor.name}
                      className="w-8 h-8 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://avatar.iran.liara.run/public/45"
                      }}
                    />
                  )}
                  <span className="font-medium">Dr. {doctor?.name}</span>
                </div>

                {isVerified ? (
                  <div className="relative group">
                    <button className="text-white hover:text-gray-300 flex items-center space-x-1">
                      <Menu className="w-5 h-5" />
                      <span>Menu</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <Link
                        to="/doctor/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Home className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                      <Link
                        to="/doctor/appointments"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Appointments
                      </Link>
                      <Link
                        to="/doctor/schedule"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        Manage Schedule
                      </Link>
                      <Link
                        to="/doctor/profile-update"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Update Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="/doctor/pending" className="text-white hover:text-gray-300 flex items-center space-x-1">
                      <AlertCircle className="w-5 h-5" />
                      <span>Pending</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="bg-white text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md font-medium flex items-center space-x-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <Link to="/doctor/login" className="text-white hover:text-gray-300 flex items-center space-x-1">
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/doctor/register"
                  className="bg-white text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md font-medium flex items-center space-x-1"
                >
                  <User className="w-4 h-4" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default DoctorNavbar