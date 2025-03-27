import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { getDoctorGrowthStats } from "../../services/adminDashboardService.js"
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

const DoctorCharts = () => {
  const [doctorGrowth, setDoctorGrowth] = useState({
    labels: [],
    datasets: [
      { label: "Total", data: [] },
      { label: "Verified", data: [] },
      { label: "Pending", data: [] },
    ],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDoctorGrowthStats()
  }, [])

  const fetchDoctorGrowthStats = async () => {
    try {
      setLoading(true)
      const response = await getDoctorGrowthStats()
      setDoctorGrowth(response.data)
    } catch (error) {
      toast.error("Failed to fetch doctor growth stats")
    } finally {
      setLoading(false)
    }
  }

  const doctorGrowthLineData = {
    labels: doctorGrowth.labels,
    datasets: [
      {
        label: "Total Doctors",
        data: doctorGrowth.datasets[0].data,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
      },
      {
        label: "Verified Doctors",
        data: doctorGrowth.datasets[1].data,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: "Pending Doctors",
        data: doctorGrowth.datasets[2].data,
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        tension: 0.4,
      },
    ],
  }

  const doctorGrowthBarData = {
    labels: doctorGrowth.labels,
    datasets: [
      {
        label: "Total Doctors",
        data: doctorGrowth.datasets[0].data,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Verified Doctors",
        data: doctorGrowth.datasets[1].data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Pending Doctors",
        data: doctorGrowth.datasets[2].data,
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
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
      <h1 className="text-3xl font-bold mb-8">Doctor Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ChartCard title="Doctor Growth - Line Chart">
          <Line
            data={doctorGrowthLineData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Monthly Doctor Growth",
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

        <ChartCard title="Doctor Growth - Bar Chart">
          <Bar
            data={doctorGrowthBarData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Monthly Doctor Growth",
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
        <h2 className="text-xl font-semibold mb-4">Doctor Growth Data</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Doctors
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verified Doctors
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pending Doctors
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {doctorGrowth.labels.map((month, index) => (
                <tr key={month}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{month}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{doctorGrowth.datasets[0].data[index]}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{doctorGrowth.datasets[1].data[index]}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{doctorGrowth.datasets[2].data[index]}</div>
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

export default DoctorCharts

