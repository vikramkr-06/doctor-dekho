import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const registerUser = async (userData) => {
  const config = {
    headers: {
      "Content-Type":
        userData instanceof FormData
          ? "multipart/form-data"
          : "application/json",
    },
  };
  const response = await api.post("/auth/register", userData, config);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data.user;
};

export const updateUserProfile = async (profileData) => {
  const config = {
    headers: {
      "Content-Type":
        profileData instanceof FormData
          ? "multipart/form-data"
          : "application/json",
    },
  };
  const response = await api.put("/auth/profile", profileData, config);
  return response.data;
};
