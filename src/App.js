
import { permittedRoutes } from "./routes";
import { Login } from "./pages/auth/login";
import { ToastContainer } from "react-toastify";
import { Navigate, useNavigate, useRoutes } from "react-router-dom";
import { useEffect } from "react";
import { getToken } from "./utils/helper";
 

export const App = () => {

  const mainRoutes = { 
    path: "/",
    element: "",
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      { path: "/", element: <Login /> },
      { path: "/login", element: <Login /> },
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
    <>
      {routing}
      <ToastContainer />
    </>
  );
}


