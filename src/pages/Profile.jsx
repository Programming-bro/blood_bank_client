import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import apiClient from "../services/api-client";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [history, setHistory] = useState([]);
  const [formData, setFormData] = useState({
    address: "",
    blood_group: "",
    age: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        address: user.address || "",
        blood_group: user.blood_group || "",
        age: user.age || "",
      });
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await apiClient.patch("/donors/me/", formData, {
        headers: { Authorization: `JWT ${token}` },
      });
      setUser(res.data);
      alert("Profile Updated Successfully!");
      setActiveTab("profile");
    } catch (err) {
      alert("Update failed!");
      console.log(err)
    }
  };

  const fetchHistory = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await apiClient.get("/donors/me/", {
        headers: { Authorization: `JWT ${token}` },
      });
      
      setHistory(res.data.donation_history || []);
      setActiveTab("history");
    } catch (err) {
      console.error("Error fetching history", err);
      setHistory([]);
      setActiveTab("history");
    }
  };

  if (!user)
    return (
      <div className="text-center mt-20 font-bold text-red-600">
        Loading profile data...
      </div>
    );

  const username = user.user?.username || "User";
  const email = user.user?.email || "";

  return (
    <div className="container mx-auto p-4 md:p-10 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        {/* --- Sidebar --- */}
        <div className="w-full md:w-1/4 bg-white shadow-xl rounded-2xl p-6 h-fit border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-red-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
              {username[0]?.toUpperCase()}
            </div>
            <h2 className="text-xl font-bold text-gray-800">{username}</h2>
            <p className="text-gray-500 text-sm">{email}</p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full text-left p-3 rounded-xl font-medium transition-all ${activeTab === "profile" ? "bg-red-600 text-white shadow-md" : "hover:bg-gray-50 text-gray-700"}`}
            >
              👤 My Profile
            </button>

            
            <button
              onClick={fetchHistory}
              className={`w-full text-left p-3 rounded-xl font-medium transition-all ${activeTab === "history" ? "bg-red-600 text-white shadow-md" : "hover:bg-gray-50 text-gray-700"}`}
            >
              📜 Donation History
            </button>

            <button
              onClick={() => setActiveTab("edit")}
              className={`w-full text-left p-3 rounded-xl font-medium transition-all ${activeTab === "edit" ? "bg-red-600 text-white shadow-md" : "hover:bg-gray-50 text-gray-700"}`}
            >
              ✏️ Edit Profile
            </button>
          </div>
        </div>

        {/* --- Main Content --- */}
        <div className="w-full md:w-3/4 bg-white shadow-xl rounded-2xl p-8 border border-gray-100 min-h-[400px]">
          {/* 1. Profile Information */}
          {activeTab === "profile" && (
            <div className="animate-fadeIn">
              <h3 className="text-2xl font-bold mb-6 border-b pb-4 text-gray-800">
                Profile Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                  <p className="text-red-500 text-xs font-bold uppercase mb-1">
                    Blood Group
                  </p>
                  <p className="text-2xl font-black text-red-600">
                    {user.blood_group || "N/A"}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-gray-500 text-xs font-bold uppercase mb-1">
                    Age
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    {user.age || "N/A"}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 md:col-span-2">
                  <p className="text-gray-500 text-xs font-bold uppercase mb-1">
                    Address
                  </p>
                  <p className="text-lg text-gray-700 font-medium">
                    {user.address || "No address set"}
                  </p>
                </div>
              </div>
            </div>
          )}

          
          {activeTab === "edit" && (
            <form onSubmit={handleUpdate} className="space-y-4 animate-fadeIn">
              <h3 className="text-2xl font-bold mb-6 border-b pb-4 text-gray-800">
                Update Profile
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Blood Group
                  </label>
                  <select
                    className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.blood_group}
                    onChange={(e) =>
                      setFormData({ ...formData, blood_group: e.target.value })
                    }
                  >
                    <option value="">Select Group</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                      (g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ),
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-red-500"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-red-500"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                className="w-full md:w-fit bg-green-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg"
              >
                Save Changes
              </button>
            </form>
          )}

          {/* Donation History Tab */}
          {activeTab === "history" && (
            <div className="animate-fadeIn">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">
                🩸 My Donation History
              </h3>

              {history.length > 0 ? (
                <div className="space-y-4">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className={`bg-white p-6 rounded-2xl border-l-8 ${item.status === "completed" ? "border-green-500" : "border-yellow-500"} shadow-md flex justify-between items-center hover:shadow-lg transition`}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${item.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                          >
                            {item.status}
                          </span>
                          <span className="text-gray-400 text-xs">
                            #{item.id}
                          </span>
                        </div>

                       
                        <h4 className="text-lg font-bold text-gray-800">
                          Patient: {item.request?.patient_name}
                        </h4>
                        <p className="text-sm text-gray-600 italic">
                          🏥 {item.request?.hospital_name}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          📍 {item.request?.address}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          Requested on:{" "}
                          {new Date(
                            item.request?.created_at,
                          ).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-3xl font-black text-red-600 block leading-none">
                          {item.request?.blood_group}
                        </span>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                          Blood Group
                        </p>

                        
                        {item.status === "pending" && (
                          <button className="mt-4 text-xs bg-gray-800 text-white px-3 py-1 rounded hover:bg-black transition">
                            Mark as Done
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                  <div className="text-6xl mb-4">🎁</div>
                  <p className="text-gray-600 font-bold text-lg">
                    No history found!
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Your accepted blood requests will appear here.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
