import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bloodFilter, setBloodFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await apiClient.get("/donors/");
        setDonors(res.data);
      } catch (err) {
        console.error("Error fetching donors", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDonors();
  }, []);

  const filteredDonors = donors.filter((donor) => {
    const name = donor.name?.toLowerCase() || "";
    const address = donor.address?.toLowerCase() || "";

    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) ||
      address.includes(searchTerm.toLowerCase());

    const matchesBlood =
      bloodFilter === "" || donor.blood_group === bloodFilter;
    return matchesSearch && matchesBlood;
  });

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">
        Find Blood Donors
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 bg-white p-6 rounded-xl shadow-sm border">
        <input
          type="text"
          placeholder="Search by name or location..."
          className="flex-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-red-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-red-500 w-full md:w-48"
          onChange={(e) => setBloodFilter(e.target.value)}
        >
          <option value="">All Blood Groups</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      {/* Donor Grid */}
      {loading ? (
        <p className="text-center py-10">Loading Donors...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDonors.map((donor) => (
            <div
              key={donor.id}
              className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-red-600 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-black text-red-600">
                  {donor.blood_group}
                </span>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold uppercase">
                  Available
                </span>
              </div>

              
              <h3 className="text-xl font-bold text-gray-800">
                {donor.name || "Unknown Donor"}
              </h3>

              <div className="space-y-1 mt-3 text-sm text-gray-600">
                <p>
                  📍 <strong>Location:</strong> {donor.address || "Rajshahi"}
                </p>
                <p>
                  📅 <strong>Last Donation:</strong>{" "}
                  {donor.last_donation_date || "N/A"}
                </p>
              </div>

              <button className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition shadow-sm">
                Contact Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonorList;
