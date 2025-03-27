import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const getAllPayments = async (status = "", date = "") => {
  try {
    let url = "/admin/dashboard/payments";
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

export const getPaymentDetails = async (paymentId) => {
  try {
    const response = await api.get(`/admin/dashboard/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refundPayment = async (paymentId, amount = null) => {
  try {
    const data = amount ? { amount } : {};
    const response = await api.post(
      `/admin/dashboard/payments/${paymentId}/refund`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPaymentStats = async () => {
  try {
    const response = await api.get("/admin/dashboard/payment-stats");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRevenueStats = async () => {
  try {
    const response = await api.get("/admin/dashboard/revenue-stats");
    return response.data;
  } catch (error) {
    throw error;
  }
};
