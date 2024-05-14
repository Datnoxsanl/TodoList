import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Page/Home";
import BaseLayout from "../Component/Layout/BaseLayout";
import ErrorPage from "@/Page/ErrorPage.jsx";
import Register from "@/Page/Register/index.jsx";
import Login from "@/Page/Login/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout></BaseLayout>,
    children:[{
        path:'/',
        element:<Home></Home>,
    },{
        path:'/register',
        element: <Register/>
    },{
      path:'/login',
      element: <Login/>
  }],
    errorElement:<ErrorPage/>
  },
]);

export default router;
