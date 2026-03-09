import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import Alert from "../components/Alert";

const RequestBlood = () => {
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [newRequest, setNewRequest] = useState({
    patient_name: "", 
    blood_group: "",
    hospital_name: "",
    address: "", 
    is_active: true, 
  });

  const fetchRequests = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await apiClient.get("/requests/", {
        headers: { Authorization: `JWT ${token}` }, 
      });
      setRequests(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      if (err.response?.status === 401) {
        setAlert({
          message: "Please login again to see requests.",
          type: "error",
        });
      }
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handlePostRequest = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    
    const postData = {
      patient_name: newRequest.patient_name,
      blood_group: newRequest.blood_group,
      hospital_name: newRequest.hospital_name,
      address: newRequest.address,
      is_active: true,
    };

    try {
      await apiClient.post("/requests/", postData, {
        headers: { Authorization: `JWT ${token}` },
      });
      setShowModal(false);
      fetchRequests(); 
      setAlert({
        message: "Blood request posted successfully!",
        type: "success",
      });
    } catch (err) {
      console.error("Post Error:", err.response?.data);
      
      const errorMsg = err.response?.data
        ? Object.values(err.response.data).flat()[0]
        : "Failed to post request.";
      setAlert({ message: errorMsg, type: "error" });
    }
  };

  const handleAcceptRequest = async (id) => {
    const token = localStorage.getItem("token");
    try {
      
      await apiClient.post(
        `/requests/${id}/accept/`,
        {},
        {
          headers: { Authorization: `JWT ${token}` },
        },
      );
      setAlert({ message: "You have accepted the request!", type: "success" });
      fetchRequests();
    } catch (err) {
        console.log(err)
      setAlert({
        message: "Could not accept request. It might be already accepted.",
        type: "error",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Urgent Blood Requests
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-red-700 transition transform hover:scale-105"
        >
          + Post a Request
        </button>
      </div>

      <Alert message={alert.message} type={alert.type} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.length > 0 ? (
          requests.map((req) => (
            <div
              key={req.id}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex flex-col justify-between hover:shadow-xl transition"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-red-100 text-red-600 font-black px-4 py-1 rounded-full text-lg">
                    {req.blood_group}
                  </span>
                  <span className="text-xs text-gray-400">ID: #{req.id}</span>
                </div>
                <h4 className="font-bold text-xl text-gray-800 mb-2">
                  🏥 {req.hospital_name}
                </h4>
                <p className="text-sm text-gray-600">
                  📞 Contact: {req.contact_no}
                </p>
                <p className="text-gray-700 mt-4 text-sm bg-gray-50 p-3 rounded-lg italic">
                  `{req.details || "No additional details provided."}`
                </p>
              </div>

              <button
                onClick={() => handleAcceptRequest(req.id)}
                className="mt-6 w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-md"
              >
                Accept Request
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-400 italic">
            No active blood requests found.
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Request for Blood
            </h3>
            <form onSubmit={handlePostRequest} className="space-y-4">
              <input
                type="text"
                placeholder="Patient Name"
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-red-500"
                onChange={(e) =>
                  setNewRequest({ ...newRequest, patient_name: e.target.value })
                }
                required
              />

              <select
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-red-500"
                onChange={(e) =>
                  setNewRequest({ ...newRequest, blood_group: e.target.value })
                }
                required
              >
                <option value="">Select Blood Group</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Hospital Name"
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-red-500"
                onChange={(e) =>
                  setNewRequest({
                    ...newRequest,
                    hospital_name: e.target.value,
                  })
                }
                required
              />

              <input
                type="text"
                placeholder="Full Address / Location"
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-red-500"
                onChange={(e) =>
                  setNewRequest({ ...newRequest, address: e.target.value })
                }
                required
              />

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 text-gray-500 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 shadow-lg transition"
                >
                  Post Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestBlood;
