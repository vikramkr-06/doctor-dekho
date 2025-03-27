import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const getDoctorSchedule = async () => {
  const response = await api.get("/doctor/appointments/schedule");
  return response.data;
};

export const createTimeSlot = async (timeSlotData) => {
  const response = await api.post("/timeslots", timeSlotData);
  return response.data;
};

export const updateTimeSlot = async (timeSlotId, timeSlotData) => {
  const response = await api.put(`/timeslots/${timeSlotId}`, timeSlotData);
  return response.data;
};

export const deleteTimeSlot = async (timeSlotId) => {
  const response = await api.delete(`/timeslots/${timeSlotId}`);
  return response.data;
};

export const getTimeSlots = async (day = "") => {
  let url = "/timeslots";
  if (day) {
    url += `?day=${day}`;
  }
  const response = await api.get(url);
  return response.data;
};
