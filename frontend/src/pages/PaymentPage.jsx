import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAuth } from "../hooks/useAuth"
import { getAppointmentById } from "../services/appointmentService"
import { createPaymentOrder, verifyPayment, loadRazorpayScript } from "../services/paymentService"
import { Calendar, Clock, Stethoscope, BadgeCheck, FileText, IndianRupee, AlertCircle } from 'lucide-react';
import Loading from "../components/Loading"

const PaymentPage = () => {
  const { appointmentId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [appointment, setAppointment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)

  useEffect(() => {
    fetchAppointmentDetails()
    loadRazorpaySDK()
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

  const loadRazorpaySDK = async () => {
    const isLoaded = await loadRazorpayScript()
    setRazorpayLoaded(isLoaded)
    if (!isLoaded) {
      toast.error("Razorpay SDK failed to load. Please check your internet connection.")
    }
  }

  const handlePayment = async () => {
    if (!razorpayLoaded) {
      toast.error("Razorpay is not loaded yet. Please try again.")
      return
    }

    try {
      setProcessing(true)
      const orderResponse = await createPaymentOrder(appointmentId)
      const { orderId, amount, currency, key } = orderResponse.data
      const options = {
        key: key,
        amount: amount * 100,
        currency: currency,
        name: "MedConnect",
        description: `Appointment with Dr. ${appointment.doctor.name}`,
        order_id: orderId,
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#0ea5e9",
        },
        handler: async (response) => {
          try {
            await verifyPayment({
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            })

            toast.success("Payment successful!")
            navigate(`/payment-success/${appointmentId}`)
          } catch (error) {
            toast.error("Payment verification failed. Please contact support.")
            navigate(`/payment-failed/${appointmentId}`)
          }
        },
        modal: {
          ondismiss: () => {
            setProcessing(false)
            toast.info("Payment cancelled")
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to process payment")
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
    <div className="max-w-5xl mx-auto px-4 py-8 pt-20">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Complete Your Payment</h1>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-2xl">
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-blue-600" />
            Appointment Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-gray-500 mb-2 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-gray-500" />
                Doctor
              </p>
              <p className="font-medium text-gray-800">Dr. {appointment.doctor?.name}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-2 flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-gray-500" />
                Specialization
              </p>
              <p className="font-medium text-gray-800">{appointment.doctor?.specialization}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                Date & Time
              </p>
              <p className="font-medium text-gray-800">{formatDate(appointment.date)}</p>
            </div>
            <div>
              <p className="text-gray-500 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-gray-500" />
                Status
              </p>
              <p className="font-medium text-gray-800">
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-600" />
              Reason for Appointment
            </h3>
            <p className="text-gray-600">{appointment.reason}</p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <IndianRupee className="w-6 h-6 text-blue-600" />
                Payment Summary
              </h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between">
                <span className="text-gray-600">Consultation Fee</span>
                <span className="font-medium text-gray-800">₹{appointment.doctor?.consultationFee || 500}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%)</span>
                <span className="font-medium text-gray-800">
                  ₹{Math.round((appointment.doctor?.consultationFee || 500) * 0.18)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4 flex justify-between font-semibold">
                <span className="text-gray-800">Total Amount</span>
                <span className="text-gray-800">
                  ₹{Math.round((appointment.doctor?.consultationFee || 500) * 1.18)}
                </span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing || !razorpayLoaded}
              className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <Clock className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <IndianRupee className="w-5 h-5" />
                  Pay ₹{Math.round((appointment.doctor?.consultationFee || 500) * 1.18)}
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-6">
              By clicking the button, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a> and{" "}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage

