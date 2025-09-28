import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DeleteUser = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);

  const handleDelete = async () => {
    setStatus("deleting");
    try {
      await axios.delete(`http://127.0.0.1:7000/api/deleteUser/${userId}`);
      navigate("/", { replace: true }); // go back to home
    } catch (err) {
      setStatus("error");
    }
  };

  const handleCancel = () => navigate(-1);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
          Confirm Delete
        </h2>
        <p className="text-gray-700 mb-6 text-center">
          Are you sure you want to delete this user?
        </p>

        {status === "error" && (
          <p className="text-red-500 mb-4 text-center">
            ❌ Failed to delete. Please try again.
          </p>
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            disabled={status === "deleting"}
            className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-red-700 transition disabled:opacity-60"
          >
            {status === "deleting" ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
