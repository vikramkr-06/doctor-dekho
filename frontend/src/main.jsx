import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import App from "./App.jsx"
import { AuthProvider } from "./context/AuthContext.jsx"
import { DoctorAuthProvider } from "./context/DoctorAuthContext.jsx"
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DoctorAuthProvider>
          <AdminAuthProvider>
            <App />
            <ToastContainer position="top-right" autoClose={2000} />
          </AdminAuthProvider>
        </DoctorAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

