const AppointmentStatusBadge = ({ status }) => {
  let bgColor = ""
  let textColor = ""
  let statusText = status

  switch (status) {
    case "pending":
      bgColor = "bg-yellow-100"
      textColor = "text-yellow-800"
      statusText = "Pending"
      break
    case "confirmed":
      bgColor = "bg-green-100"
      textColor = "text-green-800"
      statusText = "Confirmed"
      break
    case "completed":
      bgColor = "bg-blue-100"
      textColor = "text-blue-800"
      statusText = "Completed"
      break
    case "cancelled":
      bgColor = "bg-red-100"
      textColor = "text-red-800"
      statusText = "Cancelled"
      break
    default:
      bgColor = "bg-gray-100"
      textColor = "text-gray-800"
  }

  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>{statusText}</span>
}

export default AppointmentStatusBadge
