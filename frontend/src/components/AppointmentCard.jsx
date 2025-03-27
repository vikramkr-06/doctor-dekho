import { Link } from "react-router-dom"
import AppointmentStatusBadge from "./AppointmentStatusBadge"

const AppointmentCard = ({ appointment }) => {
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">Dr. {appointment.doctor?.name}</h3>
            <p className="text-gray-600">{appointment.doctor?.specialization}</p>
          </div>
          <AppointmentStatusBadge status={appointment.status} />
        </div>

        <div className="mb-4">
          <p className="text-gray-700">
            <span className="font-medium">Date & Time:</span> {formatDate(appointment.date)}
          </p>
        </div>

        <div className="flex justify-end">
          <Link to={`/appointments/${appointment._id}`} className="text-primary-600 hover:text-primary-800 font-medium">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AppointmentCard

