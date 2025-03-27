import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { getAllAppointments, updateAppointmentStatus } from "../../services/adminAppointmentService.js"
import AppointmentStatusBadge from "../../components/AppointmentStatusBadge"

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [processingId, setProcessingId] = useState(null)

  useEffect(() => {
    fetchAppointments()
  }, [filter, selectedDate])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const response = await getAllAppointments(filter, selectedDate)
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
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const filteredAppointments = appointments.filter((appointment) => {
    return (
      appointment.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Appointments</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md text-sm ${filter === "all" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
            >
              All Appointments
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-md text-sm ${filter === "pending" ? "bg-yellow-600 text-white" : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("confirmed")}
              className={`px-4 py-2 rounded-md text-sm ${filter === "confirmed" ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                }`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-md text-sm ${filter === "completed" ? "bg-green-600 text-white" : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter("cancelled")}
              className={`px-4 py-2 rounded-md text-sm ${filter === "cancelled" ? "bg-red-600 text-white" : "bg-red-100 text-red-800 hover:bg-red-200"
                }`}
            >
              Cancelled
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No appointments found matching your criteria</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
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
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 mr-3">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={appointment.user?.profileImage || "/placeholder.svg?height=40&width=40"}
                            alt={appointment.user?.name}
                            onError={(e) => {
                              e.target.src = "/placeholder.svg?height=40&width=40"
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{appointment.user?.name}</div>
                          <div className="text-sm text-gray-500">{appointment.user?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 mr-3">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={appointment.doctor?.profileImage || "/placeholder.svg?height=40&width=40"}
                            alt={appointment.doctor?.name}
                            onError={(e) => {
                              e.target.src = "/placeholder.svg?height=40&width=40"
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Dr. {appointment.doctor?.name}</div>
                          <div className="text-sm text-gray-500">{appointment.doctor?.specialization}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(appointment.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <AppointmentStatusBadge status={appointment.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/appointments/${appointment._id}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          View
                        </Link>

                        {appointment.status === "pending" && (
                          <button
                            onClick={() => handleStatusChange(appointment._id, "confirmed")}
                            disabled={processingId === appointment._id}
                            className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                          >
                            {processingId === appointment._id ? "Processing..." : "Confirm"}
                          </button>
                        )}

                        {appointment.status === "confirmed" && (
                          <button
                            onClick={() => handleStatusChange(appointment._id, "completed")}
                            disabled={processingId === appointment._id}
                            className="text-green-600 hover:text-green-900 disabled:opacity-50"
                          >
                            {processingId === appointment._id ? "Processing..." : "Complete"}
                          </button>
                        )}

                        {(appointment.status === "pending" || appointment.status === "confirmed") && (
                          <button
                            onClick={() => handleStatusChange(appointment._id, "cancelled")}
                            disabled={processingId === appointment._id}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                          >
                            {processingId === appointment._id ? "Processing..." : "Cancel"}
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
  )
}

export default ManageAppointments

