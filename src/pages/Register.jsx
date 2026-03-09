import { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../services/api-client";
import Alert from "../components/Alert";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
    blood_group: "",
    address: "",
    age: "",
  });
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [isSent, setIsSent] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ message: "", type: "" });

    try {
      await apiClient.post("/auth/users/", formData);
      setIsSent(true);
      setAlert({
        message:
          "A confirmation mail has been sent to your email. Please check your inbox (or spam folder) to activate your account.",
        type: "success",
      });
    } catch (err) {
      const errorMsg = err.response?.data
        ? Object.values(err.response.data).flat()[0]
        : "Registration failed. Please try again.";
      setAlert({ message: errorMsg, type: "error" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-8 border-red-600">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
          Join RedHeart
        </h2>

        
        <Alert message={alert.message} type={alert.type} />

        {!isSent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <select
                className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                onChange={(e) =>
                  setFormData({ ...formData, blood_group: e.target.value })
                }
                required
              >
                <option value="">Blood Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Age"
                className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                required
              />
            </div>

            <input
              type="text"
              placeholder="Address"
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              onChange={(e) =>
                setFormData({ ...formData, re_password: e.target.value })
              }
              required
            />

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition duration-300"
            >
              Sign Up
            </button>
          </form>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-600 mb-6 font-medium text-lg italic">
              Waiting for your activation...
            </p>
            <Link
              to="/login"
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold"
            >
              Go to Login
            </Link>
          </div>
        )}

        {!isSent && (
          <div>
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-red-600 font-bold">
                Login
              </Link>
            </p>
            <Link
              to="/resend-activation"
              className="mt-2 text-center block text-gray-400 hover:text-gray-600 text-xs italic transition"
            >
              Didn't receive activation email? Resend here
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
