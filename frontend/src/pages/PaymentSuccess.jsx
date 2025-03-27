import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { getAppointmentById } from "../services/appointmentService"
import { CheckCircle, Stethoscope, Calendar, Clock, BadgeCheck, AlertCircle, ArrowRight, Home } from 'lucide-react';
import Loading from "../components/Loading"

const PaymentSuccess = () => {
  const { appointmentId } = useParams()
  const [appointment, setAppointment] = useState(null)
  const [loading, setLoading] = useState(true)

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
    } finally {
      setLoading(false)
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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pt-20">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-50 rounded-full mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold mb-4 text-gray-800">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">
          Your appointment has been confirmed and payment has been processed successfully.
        </p>
        {appointment && (
          <div className="bg-gray-50 p-6 rounded-lg mb-8 text-left">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
              <Stethoscope className="w-5 h-5 text-blue-600" />
              Appointment Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 mb-1 flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-gray-500" />
                  Doctor
                </p>
                <p className="font-medium text-gray-800">Dr. {appointment.doctor?.name}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-gray-500" />
                  Specialization
                </p>
                <p className="font-medium text-gray-800">{appointment.doctor?.specialization}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  Date & Time
                </p>
                <p className="font-medium text-gray-800">{formatDate(appointment.date)}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-gray-500" />
                  Status
                </p>
                <p className="font-medium text-gray-800">
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/appointments"
            className="btn-gray flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
          >
            <ArrowRight className="w-5 h-5" />
            View All Appointments
          </Link>
          <Link
            to="/dashboard"
            className="btn-secondary flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all"
          >
            <Home className="w-5 h-5" />
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess

