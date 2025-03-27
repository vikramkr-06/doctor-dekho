import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { getDoctorById, getDoctorTimeSlots } from "../services/appointmentService"
import { CalendarDays, ArrowLeft } from "lucide-react";
import Loading from "../components/Loading"

const DoctorDetails = () => {
  const { doctorId } = useParams()
  const [doctor, setDoctor] = useState(null)
  const [availableDays, setAvailableDays] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDoctorDetails()
    fetchDoctorSchedule()
  }, [doctorId])

  const fetchDoctorDetails = async () => {
    try {
      setLoading(true)
      const response = await getDoctorById(doctorId)
      setDoctor(response.data)
    } catch (error) {
      toast.error("Failed to fetch doctor details")
    } finally {
      setLoading(false)
    }
  }

  const fetchDoctorSchedule = async () => {
    try {
      const response = await getDoctorTimeSlots(doctorId)
      if (response.data) {
        setAvailableDays(Object.keys(response.data))
      }
    } catch (error) {
      console.error("Failed to fetch doctor schedule:", error)
    }
  }

  const formatDay = (day) => {
    return day.charAt(0).toUpperCase() + day.slice(1)
  }

  if (loading) {
    return (
      <Loading />
    )
  }

  if (!doctor) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-700 p-4 rounded-md">Doctor not found</div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-6 pt-20">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/find-doctors" className="text-gray-600 hover:text-gray-800 flex items-center gap-1">
          <ArrowLeft className="w-5 h-5" /> Back to Doctors
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Doctor Profile</h1>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <div className="flex items-center gap-5">
              <img src={doctor.profileImage} alt={doctor.name} className="h-16 w-16 rounded-full" />
              <div className="">
                <h2 className="text-2xl font-semibold text-gray-900">Dr. {doctor.name}</h2>
                <p className="text-gray-600 text-lg">{doctor.specialization}</p>
              </div>
            </div>

            <Link to={`/book-appointment/${doctorId}`} className="bg-gray-700 px-5 py-2 rounded-lg hover:bg-gray-600 text-white font-medium">
              Book Appointment
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-3 text-gray-900">Doctor Information</h3>
              <p className="flex items-center gap-2 mb-2">
                <span className="font-medium text-gray-800">Name:</span> Dr. {doctor.name}
              </p>
              <p className="flex items-center gap-2 mb-2">
                <span className="font-medium text-gray-800">Specialization:</span> {doctor.specialization}
              </p>
              <p className="flex items-center gap-2 mb-2 text-gray-700">
                <span className="font-medium text-gray-800">consultationFee: ₹</span>{doctor.consultationFee}
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-3 text-gray-900">Availability</h3>
              {availableDays.length > 0 ? (
                <div>
                  <p className="mb-2 font-medium text-gray-800">Available on:</p>
                  <div className="flex flex-wrap gap-2">
                    {availableDays.map((day) => (
                      <span key={day} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {day}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-gray-600 flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-blue-500" />
                    Book an appointment to see available time slots.
                  </p>
                </div>
              ) : (
                <p className="text-gray-600">No availability information found.</p>
              )}
            </div>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-2">About Dr. {doctor.name}</h3>
            <p className="text-gray-700">
              Dr. {doctor.name} is a specialized {doctor.specialization} doctor with years of experience in treating various
              conditions. Book an appointment to consult with Dr. {doctor.name} for professional medical advice.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
        <h3 className="text-lg font-medium mb-4 text-gray-900">How to Book an Appointment</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Click on the "Book Appointment" button above</li>
          <li>Select your preferred date from the calendar</li>
          <li>Choose an available time slot</li>
          <li>Provide the reason for your appointment</li>
          <li>Confirm your booking</li>
        </ol>

        <div className="mt-6 text-center">
          <Link to={`/book-appointment/${doctorId}`} className="bg-gray-700 px-5 py-2 rounded-lg hover:bg-gray-600 text-white font-medium">
            Book Appointment Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DoctorDetails

