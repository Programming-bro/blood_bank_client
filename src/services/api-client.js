import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://redheart-ten.vercel.app/api/v1",
});

// Password Reset (Email পাঠানো)
export const forgotPassword = (data) => apiClient.post("/auth/users/reset_password/", data);

// Password Reset Confirm (নতুন পাসওয়ার্ড সেট করা)
export const resetPasswordConfirm = (data) => apiClient.post("auth/users/reset_password_confirm/", data);

// Resend Activation Email
export const resendActivation = (data) => apiClient.post("auth/users/resend_activation/", data);

export default apiClient;