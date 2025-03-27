import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getDoctorDetails, getDoctorTimeSlots, createAppointment } from "../services/appointmentService"
import DatePicker from "../components/DatePicker"
import TimeSlotPicker from "../components/TimeSlotPicker"
import { Loader, User, Stethoscope, IndianRupee } from "lucide-react"
import Loading from "../components/Loading"

const BookAppointment = () => {
  const { doctorId } = useParams()
  const navigate = useNavigate()

  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState(null)
  const [availableTimeSlots, setAvailableTimeSlots] = useState([])
  const [reason, setReason] = useState("")
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchDoctorDetails()
  }, [doctorId])

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableTimeSlots()
    }
  }, [selectedDate])

  const fetchDoctorDetails = async () => {
    try {
      setLoading(true)
      const response = await getDoctorDetails(doctorId)
      setDoctor(response.data)
    } catch (error) {
      toast.error("Failed to fetch doctor details")
      navigate("/find-doctors")
    } finally {
      setLoading(false)
    }
  }

  const fetchAvailableTimeSlots = async () => {
    try {
      setLoading(true)
      const formattedDate = selectedDate.toISOString().split("T")[0]
      const response = await getDoctorTimeSlots(doctorId, formattedDate)
      setAvailableTimeSlots(response.data)
    } catch (error) {
      toast.error("Failed to fetch available time slots")
    } finally {
      setLoading(false)
    }
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setSelectedTimeSlotId(null)
  }

  const handleTimeSlotSelect = (timeSlotId) => {
    setSelectedTimeSlotId(timeSlotId)
  }

  const handleContinue = () => {
    if (!selectedDate || !selectedTimeSlotId) {
      toast.error("Please select both date and time slot")
      return
    }
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!reason.trim()) {
      toast.error("Please provide a reason for the appointment")
      return
    }

    try {
      setSubmitting(true)
      const selectedSlot = availableTimeSlots.find((slot) => slot._id === selectedTimeSlotId)
      if (!selectedSlot) {
        toast.error("Selected time slot not found")
        return
      }
      const [hours, minutes] = selectedSlot.startTime.split(":").map(Number)
      const appointmentDate = new Date(selectedDate)
      appointmentDate.setHours(hours, minutes, 0, 0)

      const appointmentData = {
        doctorId,
        date: appointmentDate.toISOString(),
        reason,
      }

      const response = await createAppointment(appointmentData)
      toast.success("Appointment booked successfully")
      navigate(`/payment/${response.data._id}`)
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to book appointment")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading && !doctor) {
    return (
      <Loading />
    )
  }

  if (!doctor) {
    <div className="min-h-screen max-w-screen flex items-center justify-center">
      <div className="px-10 py3 bg-red-500 rounded-lg text-lg font-medium">Doctor not Found?</div>
    </div>
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 pt-24 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Book an Appointment</h1>
      {doctor && (
        <div className="bg-white flex flex-col md:flex-row items-center justify-between rounded-lg shadow-sm p-6 mb-4 border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-6">
            <img
              src={doctor.profileImage}
              alt={doctor.name}
              className="h-20 w-20 rounded-full border-2 border-blue-300 shadow-md"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                <User className="text-gray-500" /> Dr. {doctor.name}
              </h2>
              <p className="text-gray-600 text-lg flex items-center gap-2">
                <Stethoscope className="text-gray-500" /> {doctor.specialization}
              </p>
            </div>
          </div>
          <p className="text-gray-800 font-medium flex items-center gap-2 mt-4 md:mt-0">
            <IndianRupee className="text-gray-500" />
            Consultation Fee:
            <span className="text-gray-600 font-semibold">₹{doctor.consultationFee || 500}</span>
          </p>
        </div>
      )}

      {step === 1 ? (
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Select Date and Time</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-medium text-gray-700 mb-3">Select Date</h4>
              <DatePicker onSelectDate={handleDateSelect} />
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-700 mb-3">
                {selectedDate ? `Available Time Slots for ${selectedDate.toLocaleDateString()}` : "Select a date first"}
              </h4>

              {selectedDate ? (
                loading ? (
                  <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-4 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <TimeSlotPicker availableSlots={availableTimeSlots} onSelectTimeSlot={handleTimeSlotSelect} />
                )
              ) : (
                <div className="text-center py-8 text-gray-800">Please select a date to see available time slots</div>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleContinue}
              disabled={!selectedDate || !selectedTimeSlotId}
              className="bg-gray-800 text-white px-6 py-3 cursor-pointer rounded-lg hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Appointment Details</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="reason" className="block text-gray-700 font-medium mb-2">
                Reason for Appointment
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 min-h-[120px]"
                placeholder="Please describe your symptoms or reason for the appointment"
                required
              />
            </div>

            <div className="bg-gray-100 p-4 rounded-md mb-6 border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">Appointment Summary</h4>
              <p><span className="text-gray-600">Doctor:</span> Dr. {doctor?.name}</p>
              <p><span className="text-gray-600">Specialization:</span> {doctor?.specialization}</p>
              <p><span className="text-gray-600">Date:</span> {selectedDate?.toLocaleDateString()}</p>
              <p><span className="text-gray-600">Time:</span> {availableTimeSlots.find((slot) => slot._id === selectedTimeSlotId)?.startTime}</p>
              <p><span className="text-gray-600">Consultation Fee:</span> <span className="text-gray-600 font-semibold">₹{doctor?.consultationFee || 500}</span></p>
            </div>

            <div className="flex justify-between">
              <button type="button" onClick={handleBack} className="bg-gray-200 cursor-pointer text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition">
                Back
              </button>

              <button type="submit" disabled={submitting} className="bg-gray-600 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-gary-700 transition flex items-center">
                {submitting ? (
                  <span className="flex items-center">
                    <Loader className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                    Processing...
                  </span>
                ) : (
                  "Book and Proceed to Payment"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>

  )
}

export default BookAppointment

