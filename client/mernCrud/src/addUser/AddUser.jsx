import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email is invalid";
    if (!form.address.trim()) e.address = "Address is required";
    return e;
  };

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const validation = validate();
    if (Object.keys(validation).length) {
      setErrors(validation);
      return;
    }

    setStatus("sending");
    try {
      await axios.post("http://127.0.0.1:7000/api/addUsers", form);
      setStatus("success");
      setForm({ name: "", email: "", address: "" });
       setTimeout(() => {
         navigate("/");
       }, 1000);
    } catch (err) {
      setStatus("error");
      setServerError(
        err.response?.data?.message || err.message || "Server error"
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <Link to={"/"}>
          <button className="mb-4 text-blue-600 hover:underline font-semibold">
            &larr; Back
          </button>
        </Link>
        <h3 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Add New User
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full name"
              className={`w-full px-4 py-3 border rounded-lg  placeholder:text-gray-400 placeholder:text-xl placeholder:font-semibold
              text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                errors.name
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
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
              className={`w-full px-4 py-3 border rounded-lg  placeholder:text-gray-400 placeholder:text-xl placeholder:font-semibold 
              text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Street, city, state, postal code"
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg placeholder:text-gray-400 placeholder:text-xl placeholder:font-semibold text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                errors.address
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">{errors.address}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            >
              {status === "sending" ? "Saving..." : "Add User"}
            </button>

            <button
              type="button"
              onClick={() => {
                setForm({ name: "", email: "", address: "" });
                setErrors({});
                setServerError("");
                setStatus(null);
              }}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Reset
            </button>
          </div>

          {/* Messages */}
          {status === "success" && (
            <p className="text-green-600 font-medium text-center">
              ✅ User added successfully!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 font-medium text-center">
              ❌ {serverError}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
