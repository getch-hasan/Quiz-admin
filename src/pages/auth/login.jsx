import { useForm } from "react-hook-form"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { NetworkServices } from '../../network/index'
import { PrimaryButton } from "../../components/button"
import { getToken, networkErrorHandeller, setToken } from '../../utils/helper'
import ZanIcon from "../../assets/icon/ZanIcon.jpg"


// const inputStyle = "mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"

export const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [focusedEmail, setFocusedEmail] = useState(false);
    const [focusedPassword, setFocusedPassword] = useState(false);
    const [value, setValue] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        navigate("/dashboard");
        // try {
        //     setLoading(true)
        //     const response = await NetworkServices.Authentication.login(data)
        //     if (response.status === 200) {
        //         setToken(response.data.data.token);
        //         navigate("/dashboard");
        //         setLoading(false)
        //     }
        // } catch (error) {
        //     setLoading(false)
        //     networkErrorHandeller(error)
        // }
    }

    // useEffect(() => {
    //     if (getToken()) {
    //         navigate("/dashboard");
    //     }
    // }, [navigate]);


    return (
        <section className="flex items-center justify-center h-screen bg-black ">
            <div className="bg-[#fff] shadow border border-green-100 rounded-lg w-[100%] md:w-[80%] max-w-[700px] " >

                <img height={70} width={70} className="mx-auto d-block border border-green-100 rounded-full mt-5" src={ZanIcon} alt="" />

               
                    <form className="md:px-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="max-w-[65%] mx-auto md:px-6">
                        {/* email */}
                        <div className="relative w-full mt-7" >
                            <label
                                htmlFor="floatingInput"
                                className={`absolute left-0 text-sm text-gray-500 transform transition-all duration-200 cursor-text ${focusedEmail || value
                                    ? "-translate-y-3 text-[#7c5cc4] text-xs"
                                    : "translate-y-2 text-gray-400"
                                    }`}
                            >
                                Email
                            </label>
                            <input

                                id="floatingInput"
                                className={`peer block w-full border-b-2 border-gray-300 bg-transparent py-2 text-sm text-gray-900 focus:outline-none focus:ring-0 focus:border-[#7c5cc4] cursor-text`}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onFocus={() => setFocusedEmail(true)}
                                onBlur={() => setFocusedEmail(false)}
                            />
                        </div >

                        {/* password */}

                        <div className="relative w-full mt-7">
                            <input
                                id="passwordInput"
                                type="password"
                                className="peer block w-full border-b-2 border-gray-300 bg-transparent py-2 text-sm text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-500 cursor-text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onFocus={() => setFocusedPassword(true)}
                                onBlur={() => setFocusedPassword(false)}
                            />
                            <label
                                htmlFor="passwordInput"
                                className={`absolute left-0 -top-1 text-sm text-gray-500 transform transition-all duration-200 cursor-text
                           ${focusedPassword || value ? "-translate-y-3 text-blue-500 text-xs" : "translate-y-2 text-gray-400"}
                            `}
                            >
                                Password
                            </label>
                        </div>

                        {/* submit button */}
                        <div className="my-4 flex justify-center">
                            <PrimaryButton loading={loading} name="Login"> Login</PrimaryButton>
                        </div>
                </div>

                <div className="flex justify-center items-center gap-4 flex-wrap text-white">

                    <div className="bg-[#34cea7] py-2 px-3 rounded-md">
                        <button> Login As Admin</button>
                    </div>
                    <div className="bg-[#17a2b8] py-2 px-3 rounded-md">
                        <button> Login As Staff</button>
                    </div>
                    <div className="bg-[#343a40] py-2 px-3 rounded-md">
                        <button> Login As Customer</button>
                    </div>

                </div>

            </form>

            <div className="text-center my-3 md:mb-12 mt-6">
                <p className="text-[#7c5cc4]">Forgate Password?</p>
                <p className="text-[#aaa]">Do not have an account?</p>
                <p className="text-[#7c5cc4]">Register</p>
            </div>


        </div>
        </section>
    )
}


