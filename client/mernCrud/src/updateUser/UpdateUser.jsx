import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import User from "../getUser/User";

const UpdateUser = () => {
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");
  const { id: userId } = useParams();
  const[pageShow,setPageShow]=useState(false);
 const navigate = useNavigate();

  console.log("Updating userId:", userId);

  // Fetch existing user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:7000/api/getUsers/${userId}`
        );
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          address: res.data.address || "",
        });
      } catch (err) {
        setError("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await axios.put(
        `http://127.0.0.1:7000/api/updateUser/${userId}`,
        form
      );
      setStatus("success");
      setPageShow(pageShow=>!pageShow);
       setTimeout(() => {
         navigate("/");
       }, 1000);
    } catch (err) {
      setStatus("error");
      setError(err.response?.data?.message || err.message || "Update failed");
    }
  };

  if (loading)
    return (
      <p className="text-center py-6 text-gray-600 text-lg animate-pulse">
        Loading user...
      </p>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
            <Link to={"/"}>
                     <button className="mb-4 text-green-600 hover:underline font-semibold">
                       &larr; Back
                     </button>
                   </Link>
            <h3 className="text-3xl font-extrabold text-center text-green-600 mb-8">
              Update User
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full px-4 py-2.5 
             border rounded-lg border-gray-300 
             text-sm text-gray-700 font-medium
             focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400
             placeholder-gray-400"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@mail.com"
                  className="w-full px-4 py-2 border rounded-lg border-gray-300 text-sm text-gray-700 font-medium
                         focus:outline-none focus:ring-2 focus:ring-green-400
                         placeholder-gray-400"
                />
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Street, city, state, postal code"
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg border-gray-300 text-sm text-gray-700 font-medium
                         focus:outline-none focus:ring-2 focus:ring-green-400
                         placeholder-gray-400"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-4 pt-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-semibold
                         shadow-md hover:bg-green-700 transition duration-200 
                         disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? "Updating..." : "Update User"}
                </button>

                <button
                  type="button"
                  onClick={() => setForm({ name: "", email: "", address: "" })}
                  className="flex-1 bg-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold 
                         shadow-sm hover:bg-gray-300 transition duration-200"
                >
                  Reset
                </button>
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <p className="text-green-600 font-medium mt-4 text-center">
                  ✅ User updated successfully!
                </p>
              )}
              {status === "error" && (
                <p className="text-red-600 font-medium mt-4 text-center">
                  ❌ {error}
                </p>
              )}
            </form>
         
      </div>
    </div>
  );
};

export default UpdateUser;
