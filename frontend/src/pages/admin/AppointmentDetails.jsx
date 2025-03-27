import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { getAppointmentById, updateAppointmentStatus } from "../../services/adminAppointmentService.js"
import AppointmentStatusBadge from "../../components/AppointmentStatusBadge"
import Loading from "../../components/Loading.jsx"

const AppointmentDetails = () => {
  const { appointmentId } = useParams()
  const navigate = useNavigate()
  const [appointment, setAppointment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    fetchAppointmentDetails()
  }, [appointmentId])

  const fetchAppointmentDetails = async () => {
    try {
      setLoading(true)
      const response = await getAppointmentById(appointmentId)
      setAppointment(response.data)
    } catch (error) {
      toast.error("Failed to fetch appointment details")
      navigate("/admin/appointments")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (newStatus) => {
    try {
      setProcessing(true)
      await updateAppointmentStatus(appointmentId, newStatus)
      toast.success(`Appointment ${newStatus} successfully`)
      fetchAppointmentDetails()
    } catch (error) {
      toast.error(`Failed to ${newStatus} appointment`)
    } finally {
      setProcessing(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
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

  if (loading) {
    return (
      <Loading />
    )
  }

  if (!appointment) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-700 p-4 rounded-md">Appointment not found</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link to="/admin/appointments" className="text-primary-600 hover:text-primary-800 mr-4">
          &larr; Back to Appointments
        </Link>
        <h1 className="text-3xl font-bold">Appointment Details</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-semibold">
              Appointment: {appointment.user?.name} with Dr. {appointment.doctor?.name}
            </h2>
            <AppointmentStatusBadge status={appointment.status} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Patient Information</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img
                      src={appointment.user?.profileImage || "/placeholder.svg?height=64&width=64"}
                      alt={appointment.user?.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=64&width=64"
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-lg">{appointment.user?.name}</p>
                    <p className="text-gray-600">{appointment.user?.email}</p>
                  </div>
                </div>
                {appointment.user?.phone && (
                  <p className="mb-2">
                    <span className="font-medium">Phone:</span> {appointment.user.phone}
                  </p>
                )}
                {appointment.user?.address && (
                  <p>
                    <span className="font-medium">Address:</span> {appointment.user.address}
                  </p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Doctor Information</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img
                      src={appointment.doctor?.profileImage || "/placeholder.svg?height=64&width=64"}
                      alt={appointment.doctor?.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=64&width=64"
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-lg">Dr. {appointment.doctor?.name}</p>
                    <p className="text-gray-600">{appointment.doctor?.specialization}</p>
                  </div>
                </div>
                {appointment.doctor?.phone && (
                  <p className="mb-2">
                    <span className="font-medium">Phone:</span> {appointment.doctor.phone}
                  </p>
                )}
                {appointment.doctor?.email && (
                  <p>
                    <span className="font-medium">Email:</span> {appointment.doctor.email}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Appointment Information</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="mb-2">
                <span className="font-medium">Date & Time:</span> {formatDate(appointment.date)}
              </p>
              <p className="mb-2">
                <span className="font-medium">Status:</span>{" "}
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </p>
              <p className="mb-2">
                <span className="font-medium">Booked on:</span> {formatDate(appointment.createdAt)}
              </p>
              {appointment.payment && (
                <p>
                  <span className="font-medium">Payment Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${appointment.payment.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : appointment.payment.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                      }`}
                  >
                    {appointment.payment.status.charAt(0).toUpperCase() + appointment.payment.status.slice(1)}
                  </span>
                </p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Reason for Appointment</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p>{appointment.reason}</p>
            </div>
          </div>

          {appointment.notes && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Doctor's Notes</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p>{appointment.notes}</p>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            {appointment.status === "pending" && (
              <button
                onClick={() => handleStatusChange("confirmed")}
                disabled={processing}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {processing ? "Processing..." : "Confirm Appointment"}
              </button>
            )}

            {appointment.status === "confirmed" && (
              <button
                onClick={() => handleStatusChange("completed")}
                disabled={processing}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {processing ? "Processing..." : "Mark as Completed"}
              </button>
            )}

            {(appointment.status === "pending" || appointment.status === "confirmed") && (
              <button
                onClick={() => handleStatusChange("cancelled")}
                disabled={processing}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {processing ? "Processing..." : "Cancel Appointment"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentDetails

