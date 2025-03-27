import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const createPaymentOrder = async (appointmentId) => {
  try {
    const response = await api.post("/payments/create-order", {
      appointmentId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    const response = await api.post("/payments/verify", paymentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRazorpayKey = async () => {
  try {
    const response = await api.get("/payments/razorpay-key");
    return response.data.key;
  } catch (error) {
    throw error;
  }
};

export const getPaymentDetails = async (paymentId) => {
  try {
    const response = await api.get(`/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserPayments = async () => {
  try {
    const response = await api.get("/payments");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};
