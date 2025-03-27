import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const getDoctorAppointments = async (status = "", date = "") => {
  try {
    let url = "/doctor/appointments";
    const params = new URLSearchParams();

    if (status) params.append("status", status);
    if (date) params.append("date", date);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await api.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTodayAppointments = async () => {
  try {
    const response = await api.get("/doctor/appointments/today");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUpcomingAppointments = async () => {
  try {
    const response = await api.get("/doctor/appointments/upcoming");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDoctorAppointmentStats = async () => {
  try {
    const response = await api.get("/doctor/appointments/stats");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDoctorAppointmentById = async (appointmentId) => {
  try {
    const response = await api.get(`/doctor/appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    const response = await api.put(
      `/doctor/appointments/${appointmentId}/${status}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addAppointmentNotes = async (appointmentId, notes) => {
  try {
    const response = await api.put(`/doctor/appointments/${appointmentId}`, {
      notes,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
