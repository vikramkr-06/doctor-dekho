import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const getDashboardStats = async () => {
  try {
    const response = await api.get("/admin/dashboard/stats");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get("/admin/dashboard/users");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/admin/dashboard/users/${userId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(
      `/admin/dashboard/users/${userId}`,
      userData
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/admin/dashboard/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllDoctors = async () => {
  try {
    const response = await api.get("/admin/dashboard/doctors");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDoctorById = async (doctorId) => {
  try {
    const response = await api.get(`/admin/dashboard/doctors/${doctorId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const verifyDoctor = async (doctorId) => {
  try {
    const response = await api.put(
      `/admin/dashboard/doctors/${doctorId}/verify`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const rejectDoctor = async (doctorId) => {
  try {
    const response = await api.put(
      `/admin/dashboard/doctors/${doctorId}/reject`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDoctor = async (doctorId) => {
  try {
    const response = await api.delete(`/admin/dashboard/doctors/${doctorId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
