import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { getUpcomingAppointments, getAppointmentHistory } from "../services/appointmentService"
import AppointmentCard from "../components/AppointmentCard"
import Loading from "../components/Loading"

const AppointmentList = () => {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAppointments()
  }, [activeTab])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      let response

      if (activeTab === "upcoming") {
        response = await getUpcomingAppointments()
      } else {
        response = await getAppointmentHistory()
      }

      setAppointments(response.data)
    } catch (error) {
      toast.error("Failed to fetch appointments")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pb-8 pt-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-600 to-stone-600 bg-clip-text text-transparent animate-gradient">
          My Appointments
        </h1>
        <Link
          to="/find-doctors"
          className="btn-primary bg-gradient-to-r from-gray-500 to-stone-500 text-white px-6 py-3 rounded-lg hover:from-gray-600 hover:to-stone-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Book New Appointment
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-2xl overflow-hidden mb-8 transform transition-all duration-500 hover:shadow-3xl">
        <div className="flex border-b border-gray-200">
          <button
            className={`flex-1 py-4 cursor-pointer text-center font-semibold text-lg ${activeTab === "upcoming"
                ? "bg-gradient-to-r from-gray-50 to-stone-50 text-primary-700 border-b-2 border-primary-500"
                : "text-gray-600 hover:bg-gray-50 transition-all duration-300"
              }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Appointments
          </button>
          <button
            className={`flex-1 py-4 cursor-pointer text-center font-semibold text-lg ${activeTab === "history"
                ? "bg-gradient-to-r from-gray-50 to-stone-50 text-primary-700 border-b-2 border-primary-500"
                : "text-gray-600 hover:bg-gray-50 transition-all duration-300"
              }`}
            onClick={() => setActiveTab("history")}
          >
            Appointment History
          </button>
        </div>
        <div className="p-6">
          {loading ? (
            <Loading />
          ) : appointments.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-2xl font-medium text-gray-800 mb-4">
                {activeTab === "upcoming" ? "No Upcoming Appointments" : "No Past Appointments"}
              </h3>
              <p className="text-gray-600 mb-6">
                {activeTab === "upcoming"
                  ? "You don't have any upcoming appointments. Book one now!"
                  : "You don't have any past appointments."}
              </p>
              {activeTab === "upcoming" && (
                <Link
                  to="/find-doctors"
                  className="btn-primary bg-gradient-to-r from-gray-500 to-stone-500 text-white px-6 py-3 rounded-lg hover:from-gray-600 hover:to-stone-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Book an Appointment
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {appointments.map((appointment) => (
                <AppointmentCard key={appointment._id} appointment={appointment} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AppointmentList

