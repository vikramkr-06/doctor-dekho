import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const getAllAppointments = async (status = "", date = "") => {
  try {
    let url = "/admin/dashboard/appointments";
    const params = new URLSearchParams();

    if (status && status !== "all") params.append("status", status);
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

export const getAppointmentById = async (appointmentId) => {
  try {
    const response = await api.get(
      `/admin/dashboard/appointments/${appointmentId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    const response = await api.put(
      `/admin/dashboard/appointments/${appointmentId}/status`,
      { status }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addAppointmentNotes = async (appointmentId, notes) => {
  try {
    const response = await api.put(
      `/admin/dashboard/appointments/${appointmentId}/notes`,
      { notes }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAppointmentStats = async () => {
  try {
    const response = await api.get("/admin/dashboard/appointment-stats");
    return response.data;
  } catch (error) {
    throw error;
  }
};
