import { permittedRoutes } from "./routes";
import { Navigate, useNavigate, useRoutes } from "react-router-dom";
import "./App.css";  
import { DashboardLayout } from "./layouts/dashboard.layout";
import { ToastContainer } from "react-toastify";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { useEffect } from "react";
import { getToken } from "./utils/helpers";

function App() {
  const mainRoutes = {
    path: "/",
    element:  "",
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      { path: "/", element: <Login/> },
      // { path: "/otp", element: <OTP /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  };

  const routing = useRoutes([mainRoutes, ...permittedRoutes()]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!getToken()) {
      navigate("/login");   
    }
  }, [navigate]);

  return (
    <div className=" ">
      {routing} 
      <ToastContainer />
    </div>
  );
}

export default App;
