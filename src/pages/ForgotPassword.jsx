import { useState } from "react";
import { forgotPassword } from "../services/api-client";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword({ email });
            setMessage("Password reset link sent to your email!");
        } catch (err) {
            setMessage("Error: Email not found.");
            console.log("Error details:", err.response?.data);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <h2 className="text-3xl font-black text-gray-800 mb-2">Forgot Password?</h2>
                <p className="text-gray-500 mb-8 text-sm">Enter your email to receive a reset link.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="email" placeholder="Email Address" required
                        className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="w-full bg-red-600 text-white py-4 rounded-2xl font-bold hover:bg-red-700 transition shadow-lg">
                        Send Reset Link
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-red-600 font-medium">{message}</p>}
                <div className="mt-4 text-center">
    <p className="text-gray-500 text-sm">Already have an account? <Link to="/login" className="text-red-600 font-bold">Login</Link></p>
    <Link to="/resend-activation" className="mt-2 block text-gray-400 hover:text-gray-600 text-xs italic transition">
        Didn't receive activation email? Resend here
    </Link>
</div>
            </div>
            
        </div>
        
    );
};

export default ForgotPassword;