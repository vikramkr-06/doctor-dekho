import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { getAppointmentById, cancelAppointment } from "../services/appointmentService"
import AppointmentStatusBadge from "../components/AppointmentStatusBadge"
import { ArrowLeft, Stethoscope, Calendar, Clock, BadgeCheck, Mail, Phone, FileText, Clipboard, AlertCircle, CreditCard, XCircle } from 'lucide-react';
import Loading from "../components/Loading"


const UserAppointmentDetails = () => {
  const { appointmentId } = useParams()
  const navigate = useNavigate()

  const [appointment, setAppointment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(false)

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
      navigate("/appointments")
    } finally {
      setLoading(false)
    }
  }

  const handleCancelAppointment = async () => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return
    }

    try {
      setCancelling(true)
      await cancelAppointment(appointmentId)
      toast.success("Appointment cancelled successfully")
      fetchAppointmentDetails()
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to cancel appointment")
    } finally {
      setCancelling(false)
    }
  }

  const handleProceedToPayment = () => {
    navigate(`/payment/${appointmentId}`)
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

  const canCancel = () => {
    if (!appointment) return false
    return ["pending", "confirmed"].includes(appointment.status)
  }

  const needsPayment = () => {
    if (!appointment) return false
    return appointment.status === "pending"
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
    <div className="max-w-4xl mx-auto px-4 py-8 pt-20">
      <div className="flex items-center mb-8">
        <Link to="/appointments" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Back to Appointments
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 ml-4">Appointment Details</h1>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <Stethoscope className="w-6 h-6 text-blue-600" />
              Appointment with Dr. {appointment.doctor?.name}
            </h2>
            <AppointmentStatusBadge status={appointment.status} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-blue-600" />
                Doctor Information
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-3 flex items-center gap-2 text-gray-600">
                  <BadgeCheck className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Name:</span> Dr. {appointment.doctor?.name}
                </p>
                <p className="mb-3 flex items-center gap-2 text-gray-600">
                  <Stethoscope className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Specialization:</span> {appointment.doctor?.specialization}
                </p>
                {appointment.doctor?.email && (
                  <p className="mb-3 flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Email:</span> {appointment.doctor.email}
                  </p>
                )}
                {appointment.doctor?.phone && (
                  <p className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Phone:</span> {appointment.doctor.phone}
                  </p>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Appointment Information
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="mb-3 flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Date & Time:</span> {formatDate(appointment.date)}
                </p>
                <p className="mb-3 flex items-center gap-2 text-gray-600">
                  <AlertCircle className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Status:</span>{" "}
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </p>
                <p className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Booked on:</span> {formatDate(appointment.createdAt)}
                </p>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Reason for Appointment
            </h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600">{appointment.reason}</p>
            </div>
          </div>
          {appointment.notes && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                <Clipboard className="w-5 h-5 text-blue-600" />
                Doctor's Notes
              </h3>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600">{appointment.notes}</p>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-4">
            {needsPayment() && (
              <button
                onClick={handleProceedToPayment}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all flex items-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Proceed to Payment
              </button>
            )}

            {canCancel() && (
              <button
                onClick={handleCancelAppointment}
                disabled={cancelling}
                className="bg-red-600 text-white cursor-pointer px-6 py-3 rounded-lg hover:bg-red-700 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <XCircle className="w-5 h-5" />
                {cancelling ? "Cancelling..." : "Cancel Appointment"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserAppointmentDetails

