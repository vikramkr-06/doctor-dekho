import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const loginAdmin = async (adminData) => {
  const response = await api.post("/admin/auth/login", adminData);
  return response.data;
};

export const logoutAdmin = async () => {
  const response = await api.post("/admin/auth/logout");
  return response.data;
};

export const getCurrentAdmin = async () => {
  try {
    const response = await api.get("/admin/auth/me");
    return response.data.admin;
  } catch (error) {
    throw error;
  }
};

export const updateAdminProfile = async (profileData) => {
  const response = await api.put("/admin/auth/profile", profileData);
  return response.data;
};

export const createAdmin = async (adminData) => {
  const response = await api.post("/admin/auth/create", adminData);
  return response.data;
};

export const getAllAdmins = async () => {
  const response = await api.get("/admin/auth/all");
  return response.data;
};

export const deleteAdmin = async (adminId) => {
  const response = await api.delete(`/admin/auth/${adminId}`);
  return response.data;
};
