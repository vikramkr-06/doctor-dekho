import { Link } from "react-router-dom"
import { FaUserMd, FaCalendarCheck, FaUserClock, FaCreditCard, FaChartLine, FaShieldAlt } from "react-icons/fa"
import { FaStar } from "react-icons/fa"
import Footer from "../components/Footer"
import doctorImage from "../assets/home-page-doc-2.png"
const Home = () => {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 pt-20 text-white py-20">
        <div className="container mx-auto pl-32">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Health, Our Priority</h1>
              <p className="text-xl mb-8">Book appointments with top doctors online, anytime, anywhere.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="bg-white text-blue-700 hover:bg-blue-100 font-semibold py-3 px-6 rounded-lg transition duration-300 text-center"
                >
                  Find Doctors
                </Link>
                <Link
                  to="/register"
                  className="bg-transparent hover:bg-blue-700 border-2 border-white font-semibold py-3 px-6 rounded-lg transition duration-300 text-center"
                >
                  Register Now
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src={doctorImage}
                alt="Doctor and Patient"
                className="h-96 max-w-md mx-auto"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src =
                    "https://avatar.iran.liara.run/public/10"
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">500+</h3>
              <p className="text-gray-700">Verified Doctors</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-3xl md:text-4xl font-bold text-green-600 mb-2">10,000+</h3>
              <p className="text-gray-700">Happy Patients</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">30+</h3>
              <p className="text-gray-700">Specializations</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">24/7</h3>
              <p className="text-gray-700">Online Support</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform makes it easy to connect with healthcare professionals in just a few simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUserMd className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Find a Doctor</h3>
              <p className="text-gray-600">
                Search for specialists based on specialty, experience, ratings, and availability.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCalendarCheck className="text-2xl text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Book Appointment</h3>
              <p className="text-gray-600">Select a convenient time slot from the doctor's available schedule.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCreditCard className="text-2xl text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pay Online</h3>
              <p className="text-gray-600">Secure payment gateway for hassle-free consultation fee payment.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide a comprehensive healthcare platform with features designed to make your experience seamless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start p-6 bg-gray-50 rounded-lg">
              <div className="mr-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaUserClock className="text-xl text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Instant Appointments</h3>
                <p className="text-gray-600">
                  Book appointments instantly with available doctors without waiting in queues.
                </p>
              </div>
            </div>

            <div className="flex items-start p-6 bg-gray-50 rounded-lg">
              <div className="mr-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FaShieldAlt className="text-xl text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Verified Doctors</h3>
                <p className="text-gray-600">
                  All doctors on our platform are verified professionals with valid credentials.
                </p>
              </div>
            </div>

            <div className="flex items-start p-6 bg-gray-50 rounded-lg">
              <div className="mr-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <FaChartLine className="text-xl text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Health Tracking</h3>
                <p className="text-gray-600">
                  Track your appointments, medical history, and health progress all in one place.
                </p>
              </div>
            </div>

            <div className="flex items-start p-6 bg-gray-50 rounded-lg">
              <div className="mr-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <FaCreditCard className="text-xl text-orange-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
                <p className="text-gray-600">Our payment gateway ensures your financial information remains secure.</p>
              </div>
            </div>

            <div className="flex items-start p-6 bg-gray-50 rounded-lg">
              <div className="mr-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <FaCalendarCheck className="text-xl text-red-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Appointment Reminders</h3>
                <p className="text-gray-600">Get timely reminders for upcoming appointments via email and SMS.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Specialties</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We cover a wide range of medical specialties to address all your healthcare needs.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              "Cardiology",
              "Dermatology",
              "Neurology",
              "Orthopedics",
              "Pediatrics",
              "Gynecology",
              "Ophthalmology",
              "Dentistry",
            ].map((specialty, index) => (
              <Link
                to="/login"
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
              >
                <h3 className="text-lg font-semibold text-gray-800">{specialty}</h3>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/login"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              View All Specialties
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Patients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our patients have to say about their experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">RS</span>
                </div>
                <div>
                  <h4 className="font-semibold">Rahul Sharma</h4>
                  <div className="flex text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The appointment booking process was incredibly smooth. I found a great cardiologist and got an
                appointment the same day. Highly recommended!"
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">AP</span>
                </div>
                <div>
                  <h4 className="font-semibold">Anjali Patel</h4>
                  <div className="flex text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I've been using this platform for all my family's medical appointments. The doctors are professional
                and the online payment system is very convenient."
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-bold">MK</span>
                </div>
                <div>
                  <h4 className="font-semibold">Mohit Kumar</h4>
                  <div className="flex text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The reminder system is fantastic! I never miss an appointment now. The doctors are knowledgeable and
                take time to address all concerns."
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Control of Your Health?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied patients who have made their healthcare journey simpler and more efficient with
            our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-blue-700 hover:bg-blue-100 font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Sign Up Now
            </Link>
            <Link
              to="/login"
              className="bg-transparent hover:bg-blue-700 border-2 border-white font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Find a Doctor
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Home

