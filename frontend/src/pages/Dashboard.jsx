import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import { getUpcomingAppointments } from "../services/appointmentService.js";
import AppointmentCard from "../components/AppointmentCard.jsx";
import { Mail, Map, User } from "lucide-react";
import Loading from "../components/Loading.jsx";

const Dashboard = () => {
  const { user } = useAuth();
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingAppointments();
  }, []);

  const fetchUpcomingAppointments = async () => {
    try {
      setLoading(true);
      const response = await getUpcomingAppointments();
      setUpcomingAppointments(response.data.slice(0, 3));
    } catch (error) {
      console.error("Error fetching upcoming appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-18 pb-5 min-h-screen flex items-center justify-center bg-gradient-to-r from-zinc-100 via-gray-200 to-stone-100">
      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold mb-4 text-zinc-700 text-center underline">
          Dashboard
        </h2>
        <div className="bg-white shadow p-6 rounded-2xl mb-4 border border-zinc-200 hover:shadow-md transition-all duration-300">
          <h3 className="text-2xl font-semibold text-stone-800 mb-5 text-center">User Information</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex-shrink-0">
              <img
                src={user.profileImage || "https://avatar.iran.liara.run/public/16"}
                alt={user.name}
                className="h-20 w-20 rounded-full border-2 border-blue-300 shadow-md"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <div className="flex flex-col items-center md:items-start">
                <p className="text-gray-600 mb-1 flex gap-2 items-center text-lg">
                  <User className="text-gray-500" /> <span className="font-medium">Name</span>
                </p>
                <p className="font-semibold text-gray-900 text-lg">{user.name}</p>
              </div>

              <div className="flex flex-col items-center md:items-start">
                <p className="text-gray-600 mb-1 flex gap-2 items-center text-lg">
                  <Mail className="text-gray-500" /> <span className="font-medium">Email</span>
                </p>
                <p className="font-semibold text-gray-900 text-lg">{user.email}</p>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <p className="text-gray-600 mb-1 flex gap-2 items-center text-lg">
                  <Map className="text-gray-500" /> <span className="font-medium">Address</span>
                </p>
                <p className="font-semibold text-gray-900 text-lg">{user.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-zinc-800">Upcoming Appointments</h3>
            <Link to="/appointments" className="text-stone-600 hover:text-zinc-800 font-semibold transition-all duration-300">
              View All
            </Link>
          </div>

          {loading ? (
            <Loading />
          ) : upcomingAppointments.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all duration-300">
              <p className="text-gray-700 mb-4">You don't have any upcoming appointments.</p>
              <Link
                to="/find-doctors"
                className="bg-gradient-to-r from-zinc-500 to-gray-500 text-white px-6 py-2 rounded-lg hover:from-stone-600 hover:to-gray-600 transition-all duration-300 transform hover:scale-105"
              >
                Book an Appointment
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <AppointmentCard key={appointment._id} appointment={appointment} />
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-zinc-50 to-stone-100 p-6 rounded-lg border border-zinc-300 hover:border-stone-400 transition-all duration-300 transform hover:-translate-y-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Find a Doctor</h3>
            <p className="text-gray-700 mb-6">
              Search for doctors by specialization and book appointments online.
            </p>
            <Link
              to="/find-doctors"
              className="bg-gradient-to-r from-gray-500 to-stone-500 text-white px-6 py-2 rounded-lg hover:from-gray-600 hover:to-stone-600 transition-all duration-300 transform hover:scale-105 block text-center"
            >
              Find Doctors
            </Link>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-300 hover:border-gray-400 transition-all duration-300 transform hover:-translate-y-2">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Manage Appointments</h3>
            <p className="text-gray-700 mb-6">
              View, reschedule, or cancel your upcoming appointments.
            </p>
            <Link
              to="/appointments"
              className="bg-gradient-to-r from-gray-500 to-gray-500 text-white px-6 py-2 rounded-lg hover:from-gray-600 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 block text-center"
            >
              View Appointments
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;