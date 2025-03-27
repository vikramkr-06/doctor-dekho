import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import { getAllDoctors, verifyDoctor, rejectDoctor, deleteDoctor } from "../../services/adminDashboardService.js"
import Loading from "../../components/Loading.jsx"

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const location = useLocation()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const filterParam = queryParams.get("filter")
    if (filterParam) {
      setFilter(filterParam)
    }

    fetchDoctors()
  }, [location.search])

  const fetchDoctors = async () => {
    try {
      setLoading(true)
      const response = await getAllDoctors()
      setDoctors(response.data)
    } catch (error) {
      toast.error("Failed to fetch doctors")
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (doctorId) => {
    try {
      await verifyDoctor(doctorId)
      toast.success("Doctor verified successfully")
      fetchDoctors()
    } catch (error) {
      toast.error("Failed to verify doctor")
    }
  }

  const handleReject = async (doctorId) => {
    try {
      await rejectDoctor(doctorId)
      toast.success("Doctor verification rejected")
      fetchDoctors()
    } catch (error) {
      toast.error("Failed to reject doctor verification")
    }
  }

  const handleDelete = async (doctorId) => {
    if (window.confirm("Are you sure you want to delete this doctor? This action cannot be undone.")) {
      try {
        await deleteDoctor(doctorId)
        toast.success("Doctor deleted successfully")
        fetchDoctors()
      } catch (error) {
        toast.error("Failed to delete doctor")
      }
    }
  }

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesFilter =
      filter === "all" || (filter === "verified" && doctor.isVerified) || (filter === "pending" && !doctor.isVerified)

    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesFilter && matchesSearch
  })

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Doctors</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md text-sm ${
                filter === "all" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              All Doctors
            </button>
            <button
              onClick={() => setFilter("verified")}
              className={`px-4 py-2 rounded-md text-sm ${
                filter === "verified" ? "bg-green-600 text-white" : "bg-green-100 text-green-800 hover:bg-green-200"
              }`}
            >
              Verified
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-md text-sm ${
                filter === "pending" ? "bg-yellow-600 text-white" : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              }`}
            >
              Pending Verification
            </button>
          </div>

          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No doctors found matching your criteria</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Specialization
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    License Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">Dr. {doctor.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{doctor.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{doctor.specialization}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{doctor.licenseNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {doctor.isVerified ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Verified
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {!doctor.isVerified && (
                          <button
                            onClick={() => handleVerify(doctor._id)}
                            className="text-green-600 cursor-pointer hover:text-green-900"
                          >
                            Verify
                          </button>
                        )}
                        {doctor.isVerified && (
                          <button
                            onClick={() => handleReject(doctor._id)}
                            className="text-yellow-600 cursor-pointer hover:text-yellow-900"
                          >
                            Unverify
                          </button>
                        )}
                        <button onClick={() => handleDelete(doctor._id)} className="text-red-600 cursor-pointer hover:text-red-900">
                          Delete
                        </button>
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

export default ManageDoctors

