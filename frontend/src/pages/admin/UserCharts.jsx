import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { getUserGrowthStats } from "../../services/adminDashboardService.js"
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
} from "chart.js"
import { Line, Bar } from "react-chartjs-2"
import ChartCard from "../../components/admin/ChartCard.jsx"
import Loading from "../../components/Loading.jsx"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

const UserCharts = () => {
  const [userGrowth, setUserGrowth] = useState({ labels: [], data: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserGrowthStats()
  }, [])

  const fetchUserGrowthStats = async () => {
    try {
      setLoading(true)
      const response = await getUserGrowthStats()
      setUserGrowth(response.data)
    } catch (error) {
      toast.error("Failed to fetch user growth stats")
    } finally {
      setLoading(false)
    }
  }

  const userGrowthChartData = {
    labels: userGrowth.labels,
    datasets: [
      {
        label: "New Users",
        data: userGrowth.data,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
    ],
  }

  const userGrowthBarData = {
    labels: userGrowth.labels,
    datasets: [
      {
        label: "New Users",
        data: userGrowth.data,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
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
      <h1 className="text-3xl font-bold mb-8">User Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ChartCard title="User Growth - Line Chart">
          <Line
            data={userGrowthChartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Monthly User Growth",
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    precision: 0,
                  },
                },
              },
            }}
          />
        </ChartCard>

        <ChartCard title="User Growth - Bar Chart">
          <Bar
            data={userGrowthBarData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Monthly User Growth",
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    precision: 0,
                  },
                },
              },
            }}
          />
        </ChartCard>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">User Growth Data</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  New Users
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {userGrowth.labels.map((month, index) => (
                <tr key={month}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{month}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{userGrowth.data[index]}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserCharts

