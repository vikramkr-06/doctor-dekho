import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { getUserPayments } from "../services/paymentService"
import Loading from "../components/Loading"
import { Calendar, Stethoscope, IndianRupee, AlertCircle, CheckCircle, XCircle, FileText, ArrowRight } from 'lucide-react';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await getUserPayments();
        setPayments(response.data);
      } catch (error) {
        toast.error("Failed to fetch payment history");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-20">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
        <FileText className="w-8 h-8 text-blue-600" />
        Payment History
      </h1>

      {payments.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-xl font-medium mb-4 text-gray-800 flex items-center justify-center gap-2">
            <AlertCircle className="w-6 h-6 text-gray-500" />
            No payment records found
          </h2>
          <p className="text-gray-600 mb-6">You haven't made any payments yet.</p>
          <Link
            to="/find-doctors"
            className="btn-primary flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all mx-auto w-fit"
          >
            <ArrowRight className="w-5 h-5" />
            Book an Appointment
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      Date
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-gray-500" />
                      Doctor
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-gray-500" />
                      Amount
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-gray-500" />
                      Status
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {formatDate(payment.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Dr. {payment.doctor?.name}</div>
                      <div className="text-sm text-gray-500">{payment.doctor?.specialization}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-gray-500" />
                        {formatAmount(payment.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${payment.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : payment.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : payment.status === "failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        {payment.status === "completed" ? (
                          <CheckCircle className="w-4 h-4 mr-1" />
                        ) : payment.status === "pending" ? (
                          <AlertCircle className="w-4 h-4 mr-1" />
                        ) : payment.status === "failed" ? (
                          <XCircle className="w-4 h-4 mr-1" />
                        ) : null}
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentHistory

