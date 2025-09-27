
import { useState,useEffect } from "react";

import axios from "axios";
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
    console.log(users);
  }, []);

  return (
    <div className="p-4">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border font-bold text-left">S.No</th>
            <th className="py-2 px-4 border font-bold text-left">name</th>
            <th className="py-2 px-4 border font-bold text-left">email</th>
            <th className="py-2 px-4 border font-bold text-left">address</th>
            <th className="py-2 px-4 border font-bold text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx} className="even:bg-gray-50">
              <td className="py-2 px-4 border">{idx + 1}</td>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">{user.address}</td>
              <td className="py-2 px-4 border">Update|Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
