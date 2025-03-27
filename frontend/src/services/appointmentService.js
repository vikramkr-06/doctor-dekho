import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const getAllDoctors = async () => {
  try {
    const response = await api.get("/user/appointments/doctors");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAvailableDoctors = async (specialization = "") => {
  try {
    const response = await api.get(
      `/user/appointments/doctors${
        specialization ? `?specialization=${specialization}` : ""
      }`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDoctorById = async (doctorId) => {
  try {
    const response = await api.get(`/user/appointments/doctors/${doctorId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDoctorDetails = async (doctorId) => {
  try {
    const response = await api.get(`/user/appointments/doctors/${doctorId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDoctorTimeSlots = async (doctorId, date = "") => {
  try {
    const response = await api.get(
      `/timeslots/doctor/${doctorId}${date ? `?date=${date}` : ""}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createAppointment = async (appointmentData) => {
  try {
    const response = await api.post("/appointments", appointmentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserAppointments = async (status = "") => {
  try {
    const response = await api.get(
      `/appointments${status ? `?status=${status}` : ""}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUpcomingAppointments = async () => {
  try {
    const response = await api.get("/user/appointments/upcoming");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAppointmentHistory = async () => {
  try {
    const response = await api.get("/user/appointments/history");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAppointmentById = async (appointmentId) => {
  try {
    const response = await api.get(`/appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelAppointment = async (appointmentId) => {
  try {
    const response = await api.put(`/appointments/${appointmentId}/cancel`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
