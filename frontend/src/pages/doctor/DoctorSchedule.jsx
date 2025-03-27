import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { getDoctorSchedule, createTimeSlot, updateTimeSlot, deleteTimeSlot } from "../../services/doctorScheduleService"
import {
  CalendarDays,
  PlusCircle,
  XCircle,
  Edit,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  Loader2,
  Save,
  AlertCircle,
  Trash2,
} from "lucide-react";
import Loading from "../../components/Loading";

const DoctorSchedule = () => {
  const [schedule, setSchedule] = useState({})
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingSlot, setEditingSlot] = useState(null)
  const [formData, setFormData] = useState({
    day: "monday",
    startTime: "09:00",
    endTime: "10:00",
    maxAppointments: 1,
    isAvailable: true,
  })
  const [processing, setProcessing] = useState(false)

  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

  useEffect(() => {
    fetchSchedule()
  }, [])


  const fetchSchedule = async () => {
    try {
      setLoading(true)
      const response = await getDoctorSchedule()
      setSchedule(response.data)
    } catch (error) {
      toast.error("Failed to fetch schedule")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleAddTimeSlot = async (e) => {
    e.preventDefault()
    if (formData.startTime >= formData.endTime) {
      toast.error("Start time must be before end time")
      return
    }

    try {
      setProcessing(true)
      await createTimeSlot(formData)
      toast.success("Time slot added successfully")
      setShowAddForm(false)
      resetForm()
      fetchSchedule()
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to add time slot")
    } finally {
      setProcessing(false)
    }
  }

  const handleEditTimeSlot = async (e) => {
    e.preventDefault()

    if (formData.startTime >= formData.endTime) {
      toast.error("Start time must be before end time")
      return
    }

    try {
      setProcessing(true)
      await updateTimeSlot(editingSlot.id, formData)
      toast.success("Time slot updated successfully")
      setEditingSlot(null)
      resetForm()
      fetchSchedule()
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update time slot")
    } finally {
      setProcessing(false)
    }
  }

  const handleDeleteTimeSlot = async (slotId) => {
    if (!window.confirm("Are you sure you want to delete this time slot?")) {
      return
    }

    try {
      setProcessing(true)
      await deleteTimeSlot(slotId)
      toast.success("Time slot deleted successfully")
      fetchSchedule()
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to delete time slot")
    } finally {
      setProcessing(false)
    }
  }

  const startEditing = (slot) => {
    setEditingSlot(slot);
    setFormData({
      day: slot.day,
      startTime: slot.startTime,
      endTime: slot.endTime,
      maxAppointments: slot.maxAppointments,
      isAvailable: slot.isAvailable,
    })
    setShowAddForm(false)
  }


  const resetForm = () => {
    setFormData({
      day: "monday",
      startTime: "09:00",
      endTime: "10:00",
      maxAppointments: 1,
      isAvailable: true,
    })
  }

  const cancelEditing = () => {
    setEditingSlot(null)
    resetForm()
  }

  const formatTime = (time24) => {
    const [hours, minutes] = time24.split(":")
    const hour = Number.parseInt(hours, 10)
    const period = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${period}`
  }

  const formatDay = (day) => {
    return day.charAt(0).toUpperCase() + day.slice(1)
  }

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <CalendarDays className="w-8 h-8 text-gray-700" />
          Manage Schedule
        </h1>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingSlot(null);
            resetForm();
          }}
          className="bg-gray-500 px-5 py-2 rounded-lg cursor-pointer text-white flex items-center gap-2"
        >
          {showAddForm ? (
            <>
              <XCircle className="w-5 h-5" />
              Cancel
            </>
          ) : (
            <>
              <PlusCircle className="w-5 h-5" />
              Add Time Slot
            </>
          )}
        </button>
      </div>

      {(showAddForm || editingSlot) && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            {editingSlot ? (
              <>
                <Edit className="w-5 h-5 text-gray-700" />
                Edit Time Slot
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5 text-gray-700" />
                Add New Time Slot
              </>
            )}
          </h2>
          <form onSubmit={editingSlot ? handleEditTimeSlot : handleAddTimeSlot}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="day" className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  Day of Week
                </label>
                <select
                  id="day"
                  name="day"
                  value={formData.day}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                >
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                      {formatDay(day)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="maxAppointments" className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Users className="w-4 h-4 text-gray-500" />
                  Max Appointments
                </label>
                <input
                  type="number"
                  id="maxAppointments"
                  name="maxAppointments"
                  value={formData.maxAppointments}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label htmlFor="startTime" className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label htmlFor="endTime" className=" text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-gray-500" />
                  Available for booking
                </span>
              </label>
            </div>
            <div className="flex justify-end space-x-2">
              {editingSlot && (
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="bg-gray-500 px-5 py-2 rounded-lg text-white cursor-pointer flex items-center gap-2"
                  disabled={processing}
                >
                  <XCircle className="w-5 h-5" />
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-5 py-2 rounded-lg border-2 border-gray-500 cursor-pointer font-medium flex items-center gap-2"
                disabled={processing}
              >
                {processing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : editingSlot ? (
                  <Save className="w-4 h-4" />
                ) : (
                  <PlusCircle className="w-4 h-4" />
                )}
                {processing ? "Processing..." : editingSlot ? "Update Time Slot" : "Add Time Slot"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-gray-700" />
            Your Schedule
          </h2>

          {Object.keys(schedule).length === 0 ? (
            <div className="flex items-center flex-col py-8 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-700 mb-2 flex items-center justify-center gap-2">
                <AlertCircle className="w-5 h-5 text-gray-500" />
                No schedule set up yet
              </h3>
              <p className="text-gray-500 mb-4">Add time slots to start accepting appointments</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-gray-500 px-4 py-1.5 rounded-lg text-white cursor-pointer flex items-center gap-2"
              >
                <PlusCircle className="w-5 h-5" />
                Add Your First Time Slot
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {daysOfWeek.map((day) => (
                <div key={day} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    {formatDay(day)}
                  </h3>

                  {!schedule[day] || schedule[day].length === 0 ? (
                    <p className="text-gray-500 italic flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      No time slots for {formatDay(day)}
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {schedule[day].map((slot) => (
                        <div
                          key={slot.id}
                          className={`border rounded-lg p-4 ${slot.isAvailable ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                            }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-600" />
                              {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                            </div>
                            <span
                              className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${slot.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                }`}
                            >
                              {slot.isAvailable ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : (
                                <XCircle className="w-4 h-4" />
                              )}
                              {slot.isAvailable ? "Available" : "Unavailable"}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            Max appointments: {slot.maxAppointments}
                          </p>
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => startEditing(slot, slot.id)}
                              className="text-gray-600 cursor-pointer hover:text-gray-800 text-sm flex items-center gap-1"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteTimeSlot(slot.id)}
                              className="text-red-600 hover:text-red-700 cursor-pointer hover:font-medium text-sm flex items-center gap-1"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorSchedule

