import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getAppointmentById } from "../services/appointmentService"
import Loading from "../components/Loading"
import { XCircle, Stethoscope, CreditCard, ArrowLeft, AlertCircle } from 'lucide-react';

const PaymentFailed = () => {
  const { appointmentId } = useParams()
  const navigate = useNavigate()
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

  const handleRetryPayment = () => {
    navigate(`/payment/${appointmentId}`)
  }

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pt-20">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-50 rounded-full mb-6">
          <XCircle className="w-10 h-10 text-red-600" />
        </div>

        <h1 className="text-3xl font-bold mb-4 text-gray-800">Payment Failed</h1>
        <p className="text-gray-600 mb-8">
          We couldn't process your payment. Please try again or use a different payment method.
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
                  <Stethoscope className="w-4 h-4 text-gray-500" />
                  Doctor
                </p>
                <p className="font-medium text-gray-800">Dr. {appointment.doctor?.name}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-gray-500" />
                  Specialization
                </p>
                <p className="font-medium text-gray-800">{appointment.doctor?.specialization}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleRetryPayment}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all"
          >
            <CreditCard className="w-5 h-5" />
            Retry Payment
          </button>
          <Link
            to="/appointments"
            className="btn-secondary flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            View Appointments
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailed

