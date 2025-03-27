import { Link, useNavigate } from "react-router-dom"
import { useAdminAuth } from "../hooks/useAdminAuth.jsx"

const AdminNavbar = () => {
  const { admin, logout, isAuthenticated, isSuperAdmin } = useAdminAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate("/admin/login")
  }

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/admin/dashboard" className="text-2xl font-bold">
            Admin Panel
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="hidden md:flex items-center gap-3">
                  <img src={admin?.profileImage} alt={admin.name} className="h-10 w-10 rounded-full" />
                  <p className="px-2 py-1 border-2 border-blue-200 rounded-lg">{admin?.name}</p>
                  {isSuperAdmin && (
                    <span className="ml-1 text-xs bg-yellow-500 text-gray-900 px-2 py-1 rounded">Super Admin</span>
                  )}
                </span>

                <div className="relative group">
                  <button className="text-white hover:text-gray-300">Menu</button>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <Link to="/admin/users" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Manage Users
                    </Link>
                    <Link to="/admin/doctors" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Manage Doctors
                    </Link>
                    {isSuperAdmin && (
                      <Link to="/admin/admins" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Manage Admins
                      </Link>
                    )}
                    <Link to="/admin/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Profile
                    </Link>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/admin/login"
                className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar