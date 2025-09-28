import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:7000/api/getUsers");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // update user
  const getClickDetails = (e) => {
    console.log("Update user clicked", e.target.value);
  };
  // delete user
  const getDeleteDteails = () => {
    console.log("Delete user clicked");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">Users</h1>
        <Link to={"/addUser"}>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
            + Add User
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-3 border text-left text-gray-600 font-semibold text-sm">
                S.No
              </th>
              <th className="px-5 py-3 border text-left text-gray-600 font-semibold text-sm">
                Name
              </th>
              <th className="px-5 py-3 border text-left text-gray-600 font-semibold text-sm">
                Email
              </th>
              <th className="px-5 py-3 border text-left text-gray-600 font-semibold text-sm">
                Address
              </th>
              <th className="px-5 py-3 border text-left text-gray-600 font-semibold text-sm">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-400 italic"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr
                  key={user._id || idx}
                  className="even:bg-gray-50 hover:bg-blue-50 transition"
                >
                  <td className="px-5 py-3 border text-sm text-gray-700">
                    {idx + 1}
                  </td>
                  <td className="px-5 py-3 border text-sm text-gray-700">
                    {user.name}
                  </td>
                  <td className="px-5 py-3 border text-sm text-gray-700">
                    {user.email}
                  </td>
                  <td className="px-5 py-3 border text-sm text-gray-700">
                    {user.address}
                  </td>
                  <td className="px-5 py-3 border text-sm text-blue-600 font-semibold cursor-pointer">
                    <Link to={`/updateUser/${user._id}`}>
                      <button onClick={getClickDetails} value={user._id}>
                        Update
                      </button>
                    </Link>{" "}
                    |
                    <Link to={`/deleteUser/${user._id}`}>
                      <button onClick={getDeleteDteails} value={user._id}>
                        Delete
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
