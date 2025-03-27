import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const registerDoctor = async (doctorData) => {
  const config = {
    headers: {
      "Content-Type":
        doctorData instanceof FormData
          ? "multipart/form-data"
          : "application/json",
    },
  };
  const response = await api.post("/doctor/register", doctorData, config);
  return response.data;
};

export const loginDoctor = async (doctorData) => {
  const response = await api.post("/doctor/login", doctorData);
  return response.data;
};

export const logoutDoctor = async () => {
  const response = await api.post("/doctor/logout");
  return response.data;
};

export const getCurrentDoctor = async () => {
  const response = await api.get("/doctor/me");
  return response.data.doctor;
};

export const updateDoctorProfile = async (profileData) => {
  const config = {
    headers: {
      "Content-Type":
        profileData instanceof FormData
          ? "multipart/form-data"
          : "application/json",
    },
  };
  const response = await api.put("/doctor/profile", profileData, config);
  return response.data;
};
