import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { getPaymentDetails, refundPayment } from "../../services/adminPaymentService.js"
import Loading from "../../components/Loading.jsx"

const PaymentDetails = () => {
  const { paymentId } = useParams()
  const navigate = useNavigate()
  const [payment, setPayment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    fetchPaymentDetails()
  }, [paymentId])

  const fetchPaymentDetails = async () => {
    try {
      setLoading(true)
      const response = await getPaymentDetails(paymentId)
      setPayment(response.data)
    } catch (error) {
      toast.error("Failed to fetch payment details")
      navigate("/admin/payments")
    } finally {
      setLoading(false)
    }
  }

  const handleRefund = async () => {
    if (!window.confirm("Are you sure you want to refund this payment?")) {
      return
    }

    try {
      setProcessing(true)
      await refundPayment(paymentId)
      toast.success("Payment refunded successfully")
      fetchPaymentDetails()
    } catch (error) {
      toast.error("Failed to refund payment")
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

  const formatAmount = (amount) => {
    return `₹${amount.toFixed(2)}`
  }

  if (loading) {
    return (
      <Loading />
    )
  }

  if (!payment) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-700 p-4 rounded-md">Payment not found</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link to="/admin/payments" className="text-primary-600 hover:text-primary-800 mr-4">
          &larr; Back to Payments
        </Link>
        <h1 className="text-3xl font-bold">Payment Details</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-semibold">Payment ID: {payment.razorpayPaymentId || "N/A"}</h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${payment.status === "completed"
                ? "bg-green-100 text-green-800"
                : payment.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : payment.status === "failed"
                    ? "bg-red-100 text-red-800"
                    : "bg-purple-100 text-purple-800"
                }`}
            >
              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Patient Information</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img
                      src={payment.user?.profileImage || "/placeholder.svg?height=64&width=64"}
                      alt={payment.user?.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=64&width=64"
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-lg">{payment.user?.name}</p>
                    <p className="text-gray-600">{payment.user?.email}</p>
                  </div>
                </div>
                {payment.user?.phone && (
                  <p className="mb-2">
                    <span className="font-medium">Phone:</span> {payment.user.phone}
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
                      src={payment.doctor?.profileImage || "/placeholder.svg?height=64&width=64"}
                      alt={payment.doctor?.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=64&width=64"
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-medium text-lg">Dr. {payment.doctor?.name}</p>
                    <p className="text-gray-600">{payment.doctor?.specialization}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Payment Information</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="mb-2">
                    <span className="font-medium">Amount:</span> {formatAmount(payment.amount)}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Currency:</span> {payment.currency}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Payment Method:</span> {payment.paymentMethod}
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <span className="font-medium">Payment ID:</span> {payment.razorpayPaymentId || "N/A"}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Order ID:</span> {payment.razorpayOrderId}
                  </p>
                  <p className="mb-2">
                    <span className="font-medium">Date:</span> {formatDate(payment.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {payment.appointment && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Appointment Information</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="mb-2">
                  <span className="font-medium">Date & Time:</span> {formatDate(payment.appointment.date)}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Status:</span>{" "}
                  {payment.appointment.status.charAt(0).toUpperCase() + payment.appointment.status.slice(1)}
                </p>
                <p className="mb-2">
                  <span className="font-medium">Reason:</span> {payment.appointment.reason}
                </p>
                <div className="mt-2">
                  <Link
                    to={`/admin/appointments/${payment.appointment._id}`}
                    className="text-primary-600 hover:text-primary-800"
                  >
                    View Appointment Details
                  </Link>
                </div>
              </div>
            </div>
          )}

          {payment.status === "completed" && (
            <div className="flex justify-end">
              <button
                onClick={handleRefund}
                disabled={processing}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {processing ? "Processing..." : "Refund Payment"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PaymentDetails

