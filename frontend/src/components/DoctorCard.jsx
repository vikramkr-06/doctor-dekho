import { Link } from "react-router-dom"
import { FaUserMd, FaCalendarAlt, FaMoneyBillWave, FaStar } from "react-icons/fa"

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="w-20 h-20 mr-4 rounded-full overflow-hidden border-2 border-blue-500">
            {doctor.profileImage ? (
              <img
                src={doctor.profileImage || "/placeholder.svg"}
                alt={doctor.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src =
                    "https://avatar.iran.liara.run/public/5"
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <FaUserMd className="text-3xl text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
            <p className="text-blue-600 font-medium">{doctor.specialization}</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center mb-2">
            <FaUserMd className="text-blue-500 mr-2" />
            <span className="text-gray-700">{doctor.experience} years experience</span>
          </div>
          <div className="flex items-center mb-2">
            <FaMoneyBillWave className="text-green-500 mr-2" />
            <span className="text-gray-700">₹{doctor.fees} consultation fee</span>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="text-orange-500 mr-2" />
            <span className="text-gray-700">
              {doctor.availability && doctor.availability.length > 0
                ? `Available on ${doctor.availability.map((a) => a.day).join(", ")}`
                : "Schedule not available"}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-gray-300" />
          </div>
          <Link
            to={`/doctors/${doctor._id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DoctorCard

