import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NetworkServices } from "../../network/index";
import { PrimaryButton } from "../../components/button";
import adminIcon from "../../assets/icon/ZanIcon.jpg";
import { getToken, networkErrorHandeller, setToken } from "../../utils/helper";
import { Toastify } from "../../components/toastify";

const inputStyle =
  "mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300  focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1";

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location=useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("data", data);

    try {
      setLoading(true);
      const response = await NetworkServices.Authentication.login(data);
      console.log("response",response)
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

  useEffect(() => {
    if (getToken()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="border rounded-lg" style={{ width: "350px" }}>
        <img
          height={60}
          width={60}
          className="mx-auto d-block border border-green-100 rounded-full mt-3"
          src={adminIcon}
          alt=""
        />
        <form className="px-4" onSubmit={handleSubmit(onSubmit)}>
          {/* email */}
          <div className="my-4">
            <label className="block">
              <label htmlFor="" className="uppercase text-[11px] font-bold">
                Email <span className=" text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className={inputStyle}
                placeholder="you@example.com"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </label>
          </div>
          {/* password */}
          <div className="my-4">
            <label className="block">
              <label htmlFor="" className="uppercase text-[11px] font-bold">
                Password <span className=" text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                className={inputStyle}
                placeholder="11111111"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </label>
          </div>
          {/* submit button */}
          <div className="my-4 flex justify-center">
            <PrimaryButton loading={loading} name="submit"></PrimaryButton>
          </div>
        </form>
      </div>
    </section>
  );
};
