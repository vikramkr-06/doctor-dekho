import { useState } from "react"

const TimeSlotPicker = ({ availableSlots, onSelectTimeSlot }) => {
  const [selectedSlotId, setSelectedSlotId] = useState(null)

  const handleSelectSlot = (slotId) => {
    setSelectedSlotId(slotId)
    onSelectTimeSlot(slotId)
  }
  const formatTime = (time24) => {
    const [hours, minutes] = time24.split(":")
    const hour = Number.parseInt(hours, 10)
    const period = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${period}`
  }

  if (!availableSlots || availableSlots.length === 0) {
    return <div className="text-center py-4 text-gray-500">No available time slots for the selected date.</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
      {availableSlots.map((slot) => (
        <button
          key={slot._id}
          onClick={() => handleSelectSlot(slot._id)}
          disabled={slot.availableSpots <= 0}
          className={`
        py-3 px-4 rounded-lg text-center transition-all duration-300 ease-in-out 
        transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
        ${selectedSlotId === slot._id
              ? "bg-gray-600 text-white shadow-lg"
              : slot.availableSpots > 0
                ? "bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 shadow-md hover:shadow-lg"
                : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
            }
      `}
        >
          <div className="text-sm font-semibold">
            {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
          </div>
          {slot.availableSpots > 0 ? (
            <div className="text-sm mt-1 text-stone-400">
              {slot.availableSpots} {slot.availableSpots === 1 ? "spot" : "spots"} left
            </div>
          ) : (
            <div className="text-xs mt-1 text-gray-500">Fully booked</div>
          )}
        </button>
      ))}
    </div>
  )
}

export default TimeSlotPicker

