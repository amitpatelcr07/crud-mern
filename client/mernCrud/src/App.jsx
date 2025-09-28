import { useState } from "react";
import User from "./getUser/User";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddUser from "./addUser/AddUser";
import UpdateUser from "./updateUser/updateUser";
import DeleteUser from "./deleteUser/DeleteUser";

function App() {
  const [count, setCount] = useState(0);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/addUser",
      element: <AddUser />,
    },
    {
      path: "/updateUser/:id",
      element: <UpdateUser />,
    },
    {
      path: "/deleteUser/:id",
      element: <DeleteUser />,
    }
  ]);

  return (
    <>
      <div className="text-3xl font-bold underline">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </>
  );
}

export default App;
