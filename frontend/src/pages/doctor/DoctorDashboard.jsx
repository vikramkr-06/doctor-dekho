import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useDoctorAuth } from "../../hooks/useDoctorAuth.jsx"
import { getDoctorAppointmentStats, getTodayAppointments } from "../../services/doctorAppointmentService"
import AppointmentStatusBadge from "../../components/AppointmentStatusBadge"
import Loading from "../../components/Loading.jsx"
import {
  UserCircle,
  Calendar,
  Clock,
  Stethoscope,
  ClipboardList,
  Settings,
  ArrowRight,
  Users,
  CheckCircle,
  XCircle,
  User, Mail, Phone
} from "lucide-react";

const DoctorDashboard = () => {
  const { doctor } = useDoctorAuth()
  const [stats, setStats] = useState({
    today: 0,
    tomorrow: 0,
    thisWeek: 0,
    total: 0,
    completed: 0,
    cancelled: 0,
  })
  const [todayAppointments, setTodayAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [statsResponse, appointmentsResponse] = await Promise.all([
        getDoctorAppointmentStats(),
        getTodayAppointments(),
      ])
      setStats(statsResponse.data)
      setTodayAppointments(appointmentsResponse.data)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  }

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <UserCircle className="w-8 h-8 text-blue-500" />
          Doctor Dashboard
        </h1>
        <Link
          to="/doctor/profile-update"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
        >
          <Settings className="w-5 h-5" />
          Update Profile
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-blue-500">
        <h2 className="text-xl font-semibold mb-4">
          Welcome, Dr. {doctor?.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <Stethoscope className="w-5 h-5 text-blue-500 mr-2" />
            <div>
              <p className="text-gray-600">Specialization</p>
              <p className="font-medium">{doctor?.specialization}</p>
            </div>
          </div>
          <div className="flex items-center">
            <User className="w-5 h-5 text-blue-500 mr-2" />
            <div>
              <p className="text-gray-600">License Number</p>
              <p className="font-medium">{doctor?.licenseNumber}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-blue-500 mr-2" />
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{doctor?.email}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-blue-500 mr-2" />
            <div>
              <p className="text-gray-600">Phone</p>
              <p className="font-medium">{doctor?.phone}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-500" />
            Today's Appointments
          </h3>
          <p className="text-3xl font-bold">{stats.today}</p>
          <Link
            to="/doctor/appointments"
            className="text-blue-500 text-sm mt-4 hover:underline flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Clock className="w-6 h-6 text-green-500" />
            This Week
          </h3>
          <p className="text-3xl font-bold">{stats.thisWeek}</p>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Tomorrow: {stats.tomorrow}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-purple-500" />
            Total Appointments
          </h3>
          <p className="text-3xl font-bold">{stats.total}</p>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Completed: {stats.completed}
            </span>
            <span className="flex items-center gap-1">
              <XCircle className="w-4 h-4 text-red-500" />
              Cancelled: {stats.cancelled}
            </span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-500" />
              Today's Schedule
            </h3>
            <Link
              to="/doctor/appointments"
              className="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {todayAppointments.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No appointments scheduled for today.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{appointment.user?.name}</p>
                      <p className="text-sm text-gray-600">
                        {formatTime(appointment.date)}
                      </p>
                    </div>
                    <AppointmentStatusBadge status={appointment.status} />
                  </div>
                  <div className="mt-2">
                    <Link
                      to={`/doctor/appointments/${appointment._id}`}
                      className="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1"
                    >
                      View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-green-500" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/doctor/appointments"
              className="bg-blue-100 text-blue-800 p-4 rounded-lg flex flex-col items-center justify-center text-center hover:bg-blue-200 transition-colors"
            >
              <ClipboardList className="w-8 h-8 mb-2" />
              <span className="font-semibold mb-1">Manage Appointments</span>
              <span className="text-sm">View and update appointments</span>
            </Link>

            <Link
              to="/doctor/schedule"
              className="bg-green-100 text-green-800 p-4 rounded-lg flex flex-col items-center justify-center text-center hover:bg-green-200 transition-colors"
            >
              <Calendar className="w-8 h-8 mb-2" />
              <span className="font-semibold mb-1">Manage Schedule</span>
              <span className="text-sm">Set your availability</span>
            </Link>

            <Link
              to="/doctor/profile-update"
              className="bg-purple-100 text-purple-800 p-4 rounded-lg flex flex-col items-center justify-center text-center hover:bg-purple-200 transition-colors"
            >
              <Settings className="w-8 h-8 mb-2" />
              <span className="font-semibold mb-1">Update Profile</span>
              <span className="text-sm">Edit your information</span>
            </Link>

            <div className="bg-gray-100 text-gray-800 p-4 rounded-lg flex flex-col items-center justify-center text-center">
              <Users className="w-8 h-8 mb-2" />
              <span className="font-semibold mb-1">Total Patients</span>
              <span className="text-2xl font-bold">{stats.completed}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard

