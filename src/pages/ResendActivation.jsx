import { useState } from "react";
import { resendActivation } from "../services/api-client";

const ResendActivation = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await resendActivation({ email });
            setMessage("Activation link has been resent to your email!");
        } catch (err) {
            setMessage("Error: Something went wrong.");
            console.log(err)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                <h2 className="text-3xl font-black text-gray-800 mb-2">Resend Activation</h2>
                <p className="text-gray-500 mb-8 text-sm">Didn't get the email? We can send it again.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="email" placeholder="Enter Registered Email" required
                        className="w-full p-4 border rounded-2xl outline-none focus:ring-2 focus:ring-red-500"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition shadow-lg">
                        Resend Email
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-blue-600 font-medium">{message}</p>}
            </div>
        </div>
    );
};

export default ResendActivation;