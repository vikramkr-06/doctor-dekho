import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { getAllPayments, refundPayment } from "../../services/adminPaymentService.js"

const ManagePayments = () => {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [processingId, setProcessingId] = useState(null)

  useEffect(() => {
    fetchPayments()
  }, [filter, selectedDate])

  const fetchPayments = async () => {
    try {
      setLoading(true)
      const response = await getAllPayments(filter, selectedDate)
      setPayments(response.data)
    } catch (error) {
      toast.error("Failed to fetch payments")
    } finally {
      setLoading(false)
    }
  }

  const handleRefund = async (paymentId) => {
    if (!window.confirm("Are you sure you want to refund this payment?")) {
      return
    }

    try {
      setProcessingId(paymentId)
      await refundPayment(paymentId)
      toast.success("Payment refunded successfully")
      fetchPayments()
    } catch (error) {
      toast.error("Failed to refund payment")
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

  const formatAmount = (amount) => {
    return `₹${amount.toFixed(2)}`
  }

  const filteredPayments = payments.filter((payment) => {
    return (
      payment.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.doctor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.razorpayPaymentId?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Payments</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md text-sm ${filter === "all" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
            >
              All Payments
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-md text-sm ${filter === "completed" ? "bg-green-600 text-white" : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-md text-sm ${filter === "pending" ? "bg-yellow-600 text-white" : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("failed")}
              className={`px-4 py-2 rounded-md text-sm ${filter === "failed" ? "bg-red-600 text-white" : "bg-red-100 text-red-800 hover:bg-red-200"
                }`}
            >
              Failed
            </button>
            <button
              onClick={() => setFilter("refunded")}
              className={`px-4 py-2 rounded-md text-sm ${filter === "refunded" ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                }`}
            >
              Refunded
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
              placeholder="Search payments..."
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
        ) : filteredPayments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No payments found matching your criteria</div>
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
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 mr-3">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={payment.user?.profileImage || "/placeholder.svg?height=40&width=40"}
                            alt={payment.user?.name}
                            onError={(e) => {
                              e.target.src = "/placeholder.svg?height=40&width=40"
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{payment.user?.name}</div>
                          <div className="text-sm text-gray-500">{payment.user?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 mr-3">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={payment.doctor?.profileImage || "/placeholder.svg?height=40&width=40"}
                            alt={payment.doctor?.name}
                            onError={(e) => {
                              e.target.src = "/placeholder.svg?height=40&width=40"
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Dr. {payment.doctor?.name}</div>
                          <div className="text-sm text-gray-500">{payment.doctor?.specialization}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatAmount(payment.amount)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(payment.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${payment.status === "completed"
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
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{payment.razorpayPaymentId || "N/A"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link to={`/admin/payments/${payment._id}`} className="text-primary-600 hover:text-primary-900">
                          View
                        </Link>

                        {payment.status === "completed" && (
                          <button
                            onClick={() => handleRefund(payment._id)}
                            disabled={processingId === payment._id}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                          >
                            {processingId === payment._id ? "Processing..." : "Refund"}
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

export default ManagePayments

