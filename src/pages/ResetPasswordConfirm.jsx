import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../services/api-client";

const ResetPasswordConfirm = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const [passwords, setPasswords] = useState({ new_password: "", re_new_password: "" });
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post("auth/users/reset_password_confirm/", {
                uid,
                token,
                ...passwords
            });
            alert("Password reset successful! Please login.");
            navigate("/login");
        } catch (err) {
            setMessage("Link expired or invalid data.");
            console.log(err)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl">
                <h2 className="text-2xl font-black mb-6">Set New Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="password" placeholder="New Password" required
                        className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                        onChange={(e) => setPasswords({...passwords, new_password: e.target.value})}
                    />
                    <input 
                        type="password" placeholder="Confirm New Password" required
                        className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                        onChange={(e) => setPasswords({...passwords, re_new_password: e.target.value})}
                    />
                    <button className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold hover:bg-red-700 transition shadow-lg">
                        Reset Password
                    </button>
                </form>
                {message && <p className="mt-4 text-red-600 text-center">{message}</p>}
            </div>
        </div>
    );
};

export default ResetPasswordConfirm;