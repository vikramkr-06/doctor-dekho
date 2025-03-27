import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { getDoctorAppointments, updateAppointmentStatus } from "../../services/doctorAppointmentService"
import AppointmentStatusBadge from "../../components/AppointmentStatusBadge"
import { Eye, Check, CircleCheck, XCircle } from "lucide-react";
import Loading from "../../components/Loading"

const DoctorAppointments = () => {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [processingId, setProcessingId] = useState(null)

  useEffect(() => {
    fetchAppointments()
  }, [activeTab, selectedDate])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const status =
        activeTab === "upcoming"
          ? "pending,confirmed"
          : activeTab === "completed"
            ? "completed"
            : activeTab === "cancelled"
              ? "cancelled"
              : ""
      const formattedDate = selectedDate.toISOString().split("T")[0]
      const response = await getDoctorAppointments(status, formattedDate)
      setAppointments(response.data)
    } catch (error) {
      toast.error("Failed to fetch appointments")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      setProcessingId(appointmentId)
      await updateAppointmentStatus(appointmentId, newStatus)
      toast.success(`Appointment ${newStatus} successfully`)
      fetchAppointments()
    } catch (error) {
      toast.error(`Failed to ${newStatus} appointment`)
    } finally {
      setProcessingId(null)
    }
  }

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value))
  }

  const getTodayFormatted = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Appointments</h1>
        <Link
          to="/doctor/schedule"
          className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
        >
          <CircleCheck className="w-5 h-5" />
          Manage Schedule
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="flex border-b">
          {["upcoming", "completed", "cancelled"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === tab
                ? "bg-gray-50 text-gray-700 border-b-2 border-gray-500"
                : "text-gray-600 hover:bg-gray-50"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label
              htmlFor="appointmentDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Filter by date
            </label>
            <input
              type="date"
              id="appointmentDate"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={handleDateChange}
              className="w-full md:w-64 px-5 py-2 cursor-pointer border-gray-300 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500"
            />
          </div>

          {loading ? (
            <Loading />
          ) : appointments.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No appointments found
              </h3>
              <p className="text-gray-500">
                {activeTab === "upcoming"
                  ? "You don't have any upcoming appointments for the selected date."
                  : activeTab === "completed"
                    ? "You don't have any completed appointments for the selected date."
                    : "You don't have any cancelled appointments for the selected date."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 mr-3">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={`${appointment.user?.profileImage}`}
                              alt={appointment.user?.name}
                              onError={(e) => {
                                e.target.src = "/placeholder.svg?height=40&width=40";
                              }}
                            />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {appointment.user?.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {appointment.user?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(appointment.date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <AppointmentStatusBadge status={appointment.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link
                            to={`/doctor/appointments/${appointment._id}`}
                            className="text-gray-600 cursor-pointer hover:text-gray-900 flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Link>
                          {appointment.status === "pending" && (
                            <button
                              onClick={() =>
                                handleStatusChange(appointment._id, "confirmed")
                              }
                              disabled={processingId === appointment._id}
                              className="text-green-600 hover:text-green-900 disabled:opacity-50 flex items-center gap-1"
                            >
                              <Check className="w-4 h-4" />
                              {processingId === appointment._id
                                ? "Processing..."
                                : "Confirm"}
                            </button>
                          )}

                          {appointment.status === "confirmed" && (
                            <button
                              onClick={() =>
                                handleStatusChange(appointment._id, "completed")
                              }
                              disabled={processingId === appointment._id}
                              className="text-blue-600 cursor-pointer hover:text-blue-900 disabled:opacity-50 flex items-center gap-1"
                            >
                              <CircleCheck className="w-4 h-4" />
                              {processingId === appointment._id
                                ? "Processing..."
                                : "Complete"}
                            </button>
                          )}

                          {(appointment.status === "pending" ||
                            appointment.status === "confirmed") && (
                              <button
                                onClick={() =>
                                  handleStatusChange(appointment._id, "cancelled")
                                }
                                disabled={processingId === appointment._id}
                                className="text-red-600 cursor-pointer hover:text-red-900 disabled:opacity-50 flex items-center gap-1"
                              >
                                <XCircle className="w-4 h-4" />
                                {processingId === appointment._id
                                  ? "Processing..."
                                  : "Cancel"}
                              </button>
                            )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointments

