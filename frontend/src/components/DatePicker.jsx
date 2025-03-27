import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Hourglass } from "lucide-react";

const DatePicker = ({ onSelectDate, minDate = new Date() }) => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [calendarDates, setCalendarDates] = useState([])
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const formatDateForInput = (date) => {
    if (!date) return ""
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  useEffect(() => {
    const dates = []
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)

    const firstDayOfWeek = firstDay.getDay()

    for (let i = 0; i < firstDayOfWeek; i++) {
      dates.push(null)
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      dates.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i))
    }

    setCalendarDates(dates)
  }, [currentMonth])

  const handleDateSelect = (date) => {
    if (!date) return

    if (date < today) return

    setSelectedDate(date)
    onSelectDate(date)
  }

  const handleInputChange = (e) => {
    const inputDate = new Date(e.target.value)
    if (isNaN(inputDate.getTime())) return

    if (inputDate < today) return

    setSelectedDate(inputDate)
    setCurrentMonth(new Date(inputDate.getFullYear(), inputDate.getMonth(), 1))
    onSelectDate(inputDate)
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const formatMonthYear = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  const isToday = (date) => {
    if (!date) return false
    return date.toDateString() === today.toDateString()
  }

  const isSelected = (date) => {
    if (!date || !selectedDate) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  const isPastDate = (date) => {
    if (!date) return false
    return date < today
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-xl border border-gray-200">
      <input
        type="date"
        value={formatDateForInput(selectedDate)}
        onChange={handleInputChange}
        min={formatDateForInput(today)}
        className="sr-only"
        aria-label="Select date"
      />

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h3 className="text-lg font-semibold text-gray-800">{formatMonthYear(currentMonth)}</h3>
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-gray-500 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="uppercase">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {calendarDates.map((date, index) => (
            <div key={index} className="aspect-square relative">
              {date && (
                <button
                  onClick={() => handleDateSelect(date)}
                  disabled={isPastDate(date)}
                  className={`
                    w-full h-full flex items-center justify-center rounded-full relative
                    ${isSelected(date) ? "bg-blue-600 text-white" : "text-gray-800"}
                    ${isToday(date) && !isSelected(date) ? "border-2 border-blue-500" : ""}
                    ${isPastDate(date) ? "text-red-200 cursor-not-allowed" : "hover:bg-blue-500 cursor-pointer"}
                    transition-all
                  `}
                >
                  {date.getDate()}
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Hourglass className="h-10 w-10 text-gray-500" />
        </div>
      </div>
    </div>
  )
}

export default DatePicker
