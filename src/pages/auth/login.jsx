import React, { useState, useRef } from "react";
import { FaEye, FaEyeSlash, FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { NetworkServices } from "../../network";
import {  networkErrorHandeller, setToken } from "../../utils/helpers";
import { Toastify } from "../../components/toastify";

const Login = () => {
  const [focusField, setFocusField] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  console.log("inputValues",inputValues)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    passwordRef.current.focus();
  };

  const validateFields = () => {
    const newErrors = { email: "", password: "" };
    if (!inputValues.email) {
      newErrors.email = "email is required.";
    }
    if (!inputValues.password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e) => {
 
    e.preventDefault();
    if (!validateFields()) return;

    try {
      setLoading(true);
      const response = await NetworkServices.Authentication.login(inputValues);
      const queryParams = new URLSearchParams(location.search);
      const redirectFrom = queryParams.get("redirectFrom") || "/dashboard";

      if (response.status === 200) {
        
        if (response?.data?.data?.user?.role == "admin") {
          setToken(response?.data?.data?.token);
          navigate(redirectFrom);
          Toastify.Success("Login successfully done");
        }else{
          Toastify.Error("Invalid user role");
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      networkErrorHandeller(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-200 to-gray-900">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/image/bg/starry-night.webp')" }}
      ></div>
      <div className="relative w-96 p-8 bg-white/30 rounded-lg shadow-lg text-white border border-white">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        <div className="space-y-6">
          {/* email Input */}
          <div className="relative">
            <label
              htmlFor="email"
              className={`absolute left-3 text-sm transition-all cursor-pointer ${
                focusField === "email" || inputValues.email
                  ? "-top-3 left-3  text-white"
                  : "top-6 text-white"
              }`}
            >
              email
            </label>
            <input
              id="email"
              type="text"
              value={inputValues.email}
              className="w-full p-3 pr-10 text-white outline-none border-b-2 bg-transparent"
              onFocus={() => setFocusField("email")}
              onBlur={() => setFocusField("")}
              onChange={(e) => {
                setInputValues({ ...inputValues, email: e.target.value });
                if (errors.email) {
                  setErrors({ ...errors, email: "" });
                }
              }}
            />
            <span className="absolute right-3 top-6 text-white">
              <FaRegUser />
            </span>
            {errors.email && (
              <label className="text-red-500 text-xs mt-1">
                {errors.email}
              </label>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <label
              htmlFor="pass"
              className={`absolute left-3 text-sm transition-all cursor-pointer ${
                focusField === "password" || inputValues.password
                  ? "-top-3 left-3  text-white"
                  : "top-6 text-white"
              }`}
            >
              Password
            </label>
            <input
              id="pass"
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              value={inputValues.password}
              className="w-full p-3 pr-10 text-white outline-none border-b-2 bg-transparent"
              onFocus={() => setFocusField("password")}
              onBlur={() => setFocusField("")}
              onChange={(e) => {
                setInputValues({ ...inputValues, password: e.target.value });
                if (errors.password) {
                  setErrors({ ...errors, password: "" });
                }
              }}
            />
            <button
              type="button"
              className="absolute right-3 top-6 text-white focus:outline-none cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <label className="text-red-500 text-xs mt-1">
                {errors.password}
              </label>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            className="w-full bg-white text-gray-600 py-2 rounded-lg font-bold transition cursor-pointer"
            onClick={handleSubmit}
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <Link to="register" className="font-bold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
