import { Route, Routes, useLocation, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import DoctorNavbar from "./components/DoctorNavbar.jsx"
import AdminNavbar from "./components/AdminNavbar.jsx"
import PrivateRoute from "./components/PrivateRoute.jsx"
import DoctorPrivateRoute from "./components/DoctorPrivateRoute.jsx"
import AdminPrivateRoute from "./components/AdminPrivateRoute.jsx"
import { useAuth } from "./hooks/useAuth.jsx"
import { useDoctorAuth } from "./hooks/useDoctorAuth.jsx"
import { useAdminAuth } from "./hooks/useAdminAuth.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import DoctorLogin from "./pages/doctor/DoctorLogin.jsx"
import DoctorRegister from "./pages/doctor/DoctorRegister.jsx"
import DoctorDashboard from "./pages/doctor/DoctorDashboard.jsx"
import DoctorPending from "./pages/doctor/DoctorPending.jsx"
import DoctorAppointments from "./pages/doctor/DoctorAppointments.jsx"
import DoctorAppointmentDetails from "./pages/doctor/DoctorAppointmentDetails.jsx"
import DoctorSchedule from "./pages/doctor/DoctorSchedule.jsx"
import DoctorProfileUpdate from "./pages/doctor/DoctorProfileUpdate.jsx"
import AdminLogin from "./pages/admin/AdminLogin.jsx"
import AdminDashboard from "./pages/admin/AdminDashboard.jsx"
import ManageDoctors from "./pages/admin/ManageDoctors.jsx"
import ManageUsers from "./pages/admin/ManageUsers.jsx"
import ManageAdmins from "./pages/admin/ManageAdmins.jsx"
import ManageAppointments from "./pages/admin/ManageAppointments.jsx"
import AppointmentDetails from "./pages/admin/AppointmentDetails.jsx"
import ManagePayments from "./pages/admin/ManagePayments.jsx"
import PaymentDetails from "./pages/admin/PaymentDetails.jsx"
import AdminProfile from "./pages/admin/AdminProfile.jsx"
import FindDoctors from "./pages/FindDoctors.jsx"
import DoctorDetails from "./pages/DoctorDetails.jsx"
import BookAppointment from "./pages/BookAppointment.jsx"
import AppointmentList from "./pages/AppointmentList.jsx"
import UserAppointmentDetails from "./pages/UserAppointmentDetails.jsx"
import PaymentPage from "./pages/PaymentPage.jsx"
import PaymentSuccess from "./pages/PaymentSuccess.jsx"
import PaymentFailed from "./pages/PaymentFailed.jsx"
import PaymentHistory from "./pages/PaymentHistory.jsx"
import UserProfile from "./pages/UserProfile.jsx"
import Loading from "./components/Loading.jsx"

import AboutUs from "./pages/AboutUs"
import ContactUs from "./pages/ContactUs"
import TermsForDoctor from "./pages/TermsForDoctor"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import TermsOfService from "./pages/TermsOfService"
import FAQ from "./pages/FAQ"

function App() {
  const { user, loading: userLoading, isAuthenticated: isUserAuthenticated } = useAuth()
  const { doctor, loading: doctorLoading, isAuthenticated: isDoctorAuthenticated, isVerified } = useDoctorAuth()
  const { admin, loading: adminLoading, isAuthenticated: isAdminAuthenticated } = useAdminAuth()
  const location = useLocation()

  const isDoctorRoute = location.pathname.startsWith("/doctor/")
  const isAdminRoute = location.pathname.startsWith("/admin/")

  if (userLoading || doctorLoading || adminLoading) {
    return (
      <Loading />
    )
  }

  const isAnyAuthenticated = isUserAuthenticated || isDoctorAuthenticated || isAdminAuthenticated

  return (
    <div className="min-h-screen bg-gray-50">
      {isAdminRoute ? <AdminNavbar /> : isDoctorRoute ? <DoctorNavbar /> : <Navbar />}

      <main className={`${isAdminRoute ? "bg-gray-100" : ""}`}>
        <Routes>
          <Route
            path="/"
            element={
              isAnyAuthenticated ? (
                isUserAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : isDoctorAuthenticated ? (
                  <Navigate to="/doctor/dashboard" replace />
                ) : (
                  <Navigate to="/admin/dashboard" replace />
                )
              ) : (
                <Home />
              )
            }
          />

          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/terms-for-doctor" element={<TermsForDoctor />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/faq" element={<FAQ />} />

          <Route path="/login" element={isUserAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />

          <Route path="/register" element={isUserAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} />

          <Route
            path="/doctor/login"
            element={
              isDoctorAuthenticated ? (
                doctor?.isVerified ? (
                  <Navigate to="/doctor/dashboard" replace />
                ) : (
                  <Navigate to="/doctor/pending" replace />
                )
              ) : (
                <DoctorLogin />
              )
            }
          />

          <Route
            path="/doctor/register"
            element={
              isDoctorAuthenticated ? (
                doctor?.isVerified ? (
                  <Navigate to="/doctor/dashboard" replace />
                ) : (
                  <Navigate to="/doctor/pending" replace />
                )
              ) : (
                <DoctorRegister />
              )
            }
          />

          <Route
            path="/admin/login"
            element={isAdminAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />}
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/find-doctors"
            element={
              <PrivateRoute>
                <FindDoctors />
              </PrivateRoute>
            }
          />
          <Route
            path="doctor-details/:doctorId"
            element={
              <PrivateRoute>
                <DoctorDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/book-appointment/:doctorId"
            element={
              <PrivateRoute>
                <BookAppointment />
              </PrivateRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <PrivateRoute>
                <AppointmentList />
              </PrivateRoute>
            }
          />
          <Route
            path="/appointments/:appointmentId"
            element={
              <PrivateRoute>
                <UserAppointmentDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment/:appointmentId"
            element={
              <PrivateRoute>
                <PaymentPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment-success/:appointmentId"
            element={
              <PrivateRoute>
                <PaymentSuccess />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment-failed/:appointmentId"
            element={
              <PrivateRoute>
                <PaymentFailed />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment-history"
            element={
              <PrivateRoute>
                <PaymentHistory />
              </PrivateRoute>
            }
          />

          <Route
            path="/doctor/dashboard"
            element={
              <DoctorPrivateRoute requireVerification={true}>
                <DoctorDashboard />
              </DoctorPrivateRoute>
            }
          />
          <Route
            path="/doctor/pending"
            element={
              isDoctorAuthenticated && doctor?.isVerified ? (
                <Navigate to="/doctor/dashboard" replace />
              ) : (
                <DoctorPrivateRoute requireVerification={false}>
                  <DoctorPending />
                </DoctorPrivateRoute>
              )
            }
          />
          <Route
            path="/doctor/appointments"
            element={
              <DoctorPrivateRoute requireVerification={true}>
                <DoctorAppointments />
              </DoctorPrivateRoute>
            }
          />
          <Route
            path="/doctor/appointments/:appointmentId"
            element={
              <DoctorPrivateRoute requireVerification={true}>
                <DoctorAppointmentDetails />
              </DoctorPrivateRoute>
            }
          />
          <Route
            path="/doctor/schedule"
            element={
              <DoctorPrivateRoute requireVerification={true}>
                <DoctorSchedule />
              </DoctorPrivateRoute>
            }
          />
          <Route
            path="/doctor/profile-update"
            element={
              <DoctorPrivateRoute requireVerification={true}>
                <DoctorProfileUpdate />
              </DoctorPrivateRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <AdminPrivateRoute>
                <AdminDashboard />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/doctors"
            element={
              <AdminPrivateRoute>
                <ManageDoctors />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminPrivateRoute>
                <ManageUsers />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/admins"
            element={
              <AdminPrivateRoute superAdminOnly={true}>
                <ManageAdmins />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/appointments"
            element={
              <AdminPrivateRoute>
                <ManageAppointments />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/payments"
            element={
              <AdminPrivateRoute>
                <ManagePayments />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/payments/:paymentId"
            element={
              <AdminPrivateRoute>
                <PaymentDetails />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/appointments/:appointmentId"
            element={
              <AdminPrivateRoute>
                <AppointmentDetails />
              </AdminPrivateRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <AdminPrivateRoute>
                <AdminProfile />
              </AdminPrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

