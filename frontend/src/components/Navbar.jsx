import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-zinc-100 via-gray-200 to-stone-300 shadow-md h-16 flex items-center fixed w-full z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-all duration-300 hover:scale-105"
            >
              Medibook
            </Link>
            <div className="hidden md:block ml-8">
              <div className="flex items-center space-x-6">
                <Link
                  to="/find-doctors"
                  className="text-gray-800 hover:text-blue-600 relative group transition-all duration-300"
                >
                  <span className="relative inline-block">
                    Find Doctors
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
                {isAuthenticated ? (
                  <div className="relative group">
                    <button className="text-gray-800 cursor-pointer hover:text-blue-600 transition-all duration-300">
                      <span className="relative inline-block">
                        Appointments
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link to="/appointments" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                        My Appointments
                      </Link>
                      <Link to="/payment-history" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">
                        Payment History
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/doctor/login"
                    className="text-gray-800 hover:text-blue-600 relative group transition-all duration-300"
                  >
                    <span className="relative inline-block">
                      List Your Practice
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center">
                  {user.profileImage && (
                    <img
                      src={`${user.profileImage}`}
                      alt={user.name}
                      className="w-12 h-12 border-2 border-blue-500 rounded-full object-cover mr-2"
                      onError={(e) => {
                        e.target.src = "https://avatar.iran.liara.run/public/16"
                      }}
                    />
                  )}
                  <span className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
                    <span>👋</span>
                    <span>Hii, <span className="text-indigo-600">{user.name}</span></span>
                  </span>

                </div>
                <Link
                  to="/dashboard"
                  className="text-gray-800 hover:text-blue-600 relative group transition-all duration-300"
                >
                  <span className="relative inline-block">
                    Dashboard
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
                <div className="relative group">
                  <button className="text-gray-800 cursor-pointer hover:text-blue-600 transition-all duration-300 focus:outline-none">
                    <span className="relative inline-block">
                      Account
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </button>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="flex items-center gap-3 p-3 border-b border-gray-100">
                      <div className="w-10 h-10 overflow-hidden rounded-full border-2 border-blue-100">
                        {user.profileImage ? (
                          <img
                            src={`${user.profileImage}`}
                            alt={user.name}
                            className="w-full h-full object-cover"
                            onError={(e) => (e.target.src = "https://avatar.iran.liara.run/public/18")}
                          />
                        ) : (
                          <img
                            src="https://avatar.iran.liara.run/public/18"
                            alt="Default Avatar"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{user.name || "Guest User"}</p>
                        <p className="text-xs text-gray-500">{user.email || "user@example.com"}</p>
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-300"
                    >
                      <User2 className="h-4 w-4 text-gray-800" />
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center cursor-pointer gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-300"
                    >
                      <LogOut className="h-4 w-4 text-gray-800" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-800 hover:text-blue-600 relative group transition-all duration-300"
                >
                  <span className="relative inline-block">
                    Login
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 my-2 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;