import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import apiClient from "../services/api-client";

const Activate = () => {
    const { uid, token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("activating"); 

    useEffect(() => {
        const activateAccount = async () => {
            try {
                
                await apiClient.post("/auth/users/activation/", { uid, token });
                setStatus("success");
                
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } catch (err) {
                console.error("Activation error", err.response?.data);
                setStatus("error");
            }
        };

        if (uid && token) {
            activateAccount();
        }
    }, [uid, token, navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center border-t-8 border-red-600">
                {status === "activating" && (
                    <>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
                        <h2 className="text-2xl font-bold text-gray-800">Verifying Account...</h2>
                        <p className="text-gray-500 mt-2">Please wait while we activate your account.</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <div className="text-green-500 text-6xl mb-4">✔</div>
                        <h2 className="text-2xl font-bold text-gray-800">Activation Successful!</h2>
                        <p className="text-gray-500 mt-2">Your account is now active. Redirecting to login...</p>
                        <Link to="/login" className="mt-6 inline-block text-red-600 font-bold underline">Go to Login Now</Link>
                    </>
                )}

                {status === "error" && (
                    <>
                        <div className="text-red-500 text-6xl mb-4">✖</div>
                        <h2 className="text-2xl font-bold text-gray-800">Activation Failed</h2>
                        <p className="text-gray-500 mt-2">The link might be expired or already used.</p>
                        <Link to="/register" className="mt-6 inline-block bg-red-600 text-white px-6 py-2 rounded-lg font-bold">Try Registering Again</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Activate;