import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { getAllDoctors } from "../services/appointmentService"
import { Search, ChevronDown } from "lucide-react";
import Loading from "../components/Loading";

const FindDoctors = () => {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [specialization, setSpecialization] = useState("")

  const specializations = [
    "Cardiologist",
    "Dermatologist",
    "Endocrinologist",
    "Gynecologist",
    "Neurologist",
    "Obstetrics",
    "Oncologist",
    "Ophthalmology",
    "Orthopedic",
    "Pediatrician",
    "Psychiatrist",
    "Urologist",
  ]

  useEffect(() => {
    fetchDoctors()
  }, [])

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

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSpecialization =
      specialization === "" || doctor.specialization.toLowerCase() === specialization.toLowerCase()

    return matchesSearch && matchesSpecialization
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-20">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Find a Doctor</h1>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search by name or specialization
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search doctors..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            </div>
          </div>
          <div className="relative md:w-64">
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by specialization
            </label>
            <div className="relative">
              <select
                id="specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full appearance-none pl-4 pr-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
              >
                <option value="">All Specializations</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : filteredDoctors.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No doctors found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img src={doctor.profileImage} alt="" className="h-16 w-16 rounded-full" />
                  <div className="mt-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
                    <p className="text-gray-600 mb-4">{doctor.specialization}</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Link
                    to={`/doctor-details/${doctor._id}`}
                    className="text-gray-600 hover:text-gray-800 border-2 rounded-lg py-1 px-4 font-medium transition-all"
                  >
                    View Profile
                  </Link>

                  <Link
                    to={`/book-appointment/${doctor._id}`}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition-all"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FindDoctors

