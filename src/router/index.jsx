import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Page/Home";
import BaseLayout from "../Component/Layout/BaseLayout";
import ErrorPage from "@/Page/ErrorPage.jsx";
import Register from "@/Page/Register/index.jsx";
import Login from "@/Page/Login/index.jsx";
import PrivateRouter from "./privateRouter";
const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout></BaseLayout>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRouter role="AuthenticatedCheck"><Home/></PrivateRouter>
        ),
      },
      {
        path: '/profile',
        element: <h1>Profile User</h1>
    },
      {
        path: "/quanly",
        element: (
          <PrivateRouter role="ManagerCheck"><h1>Trang Quan Ly</h1></PrivateRouter>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
