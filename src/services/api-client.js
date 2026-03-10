import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://redheart-ten.vercel.app/api/v1/",
});

export const forgotPassword = (data) => apiClient.post("/auth/users/reset_password/", data);


export const resetPasswordConfirm = (data) => apiClient.post("auth/users/reset_password_confirm/", data);


export const resendActivation = (data) => apiClient.post("auth/users/resend_activation/", data);

export default apiClient;