import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { getDashboardStats } from "../../services/adminDashboardService.js"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"
import { Pie, Doughnut } from "react-chartjs-2"
import StatCard from "../../components/admin/StatCard.jsx"
import ChartCard from "../../components/admin/ChartCard.jsx"
import Loading from "../../components/Loading.jsx"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement)

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: { total: 0 },
    doctors: { total: 0, pending: 0, verified: 0 },
    admins: { total: 0 },
    appointments: { total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0 },
    payments: { total: 0, completed: 0, pending: 0, failed: 0, totalRevenue: 0 },
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true)
      const data = await getDashboardStats()
      setStats(data)
    } catch (error) {
      toast.error("Failed to fetch dashboard stats")
    } finally {
      setLoading(false)
    }
  }

  const appointmentChartData = {
    labels: ["Pending", "Confirmed", "Completed", "Cancelled"],
    datasets: [
      {
        label: "Appointments",
        data: [
          stats.appointments.pending,
          stats.appointments.confirmed,
          stats.appointments.completed,
          stats.appointments.cancelled,
        ],
        backgroundColor: [
          "rgba(255, 206, 86, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const doctorChartData = {
    labels: ["Verified", "Pending"],
    datasets: [
      {
        label: "Doctors",
        data: [stats.doctors.verified, stats.doctors.pending],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 206, 86, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  }

  const paymentChartData = {
    labels: ["Completed", "Pending", "Failed"],
    datasets: [
      {
        label: "Payments",
        data: [stats.payments.completed, stats.payments.pending, stats.payments.failed],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 206, 86, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 206, 86, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  }

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" value={stats.users.total} icon="users" color="blue" link="/admin/users" />
        <StatCard
          title="Total Doctors"
          value={stats.doctors.total}
          icon="stethoscope"
          color="green"
          link="/admin/doctors"
        />
        <StatCard
          title="Total Appointments"
          value={stats.appointments.total}
          icon="calendar"
          color="purple"
          link="/admin/appointments"
        />
        <StatCard
          title="Total Revenue"
          value={`₹${stats.payments.totalRevenue.toLocaleString()}`}
          icon="currency-rupee"
          color="emerald"
          link="/admin/payments"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ChartCard title="Appointment Status" link="/admin/appointments">
          <Doughnut
            data={appointmentChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </ChartCard>

        <ChartCard title="Doctor Verification Status" link="/admin/doctors">
          <Pie
            data={doctorChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ChartCard title="Payment Status" link="/admin/payments">
          <Doughnut
            data={paymentChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </ChartCard>

        <ChartCard title="Quick Actions">
          <div className="grid grid-cols-2 gap-4 p-4">
            <Link
              to="/admin/doctors?filter=pending"
              className="bg-yellow-100 text-yellow-800 p-4 rounded-lg flex flex-col items-center justify-center text-center hover:bg-yellow-200 transition-colors"
            >
              <span className="font-semibold mb-1">Pending Verifications</span>
              <span className="text-sm">{stats.doctors.pending} doctors waiting</span>
            </Link>

            <Link
              to="/admin/users/create"
              className="bg-blue-100 text-blue-800 p-4 rounded-lg flex flex-col items-center justify-center text-center hover:bg-blue-200 transition-colors"
            >
              <span className="font-semibold mb-1">Create New User</span>
              <span className="text-sm">Add a new patient account</span>
            </Link>

            <Link
              to="/admin/admins/create"
              className="bg-purple-100 text-purple-800 p-4 rounded-lg flex flex-col items-center justify-center text-center hover:bg-purple-200 transition-colors"
            >
              <span className="font-semibold mb-1">Create New Admin</span>
              <span className="text-sm">Add a new administrator</span>
            </Link>

            <Link
              to="/admin/profile"
              className="bg-gray-100 text-gray-800 p-4 rounded-lg flex flex-col items-center justify-center text-center hover:bg-gray-200 transition-colors"
            >
              <span className="font-semibold mb-1">My Profile</span>
              <span className="text-sm">Update your information</span>
            </Link>
          </div>
        </ChartCard>
      </div>
    </div>
  )
}

export default AdminDashboard

