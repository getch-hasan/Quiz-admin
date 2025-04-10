import { Link, useLocation, useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/helper";
import { IoIosNotifications } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { useCallback, useEffect, useState } from "react";
import { NetworkServices } from "../../network";
import userIcon from "../../assets/icon/user.png";

export const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location=useLocation()

  const logout = () => {
    navigate(`/login?redirectFrom=${window.location.pathname}`);
    removeToken();
  
    // navigate(`/login?redirectFrom=${location.pathname}`);
    console.log(location.pathname)
  };


  const fetchUser = useCallback(async () => {
    setLoading(true); // Start loading
    try {
      const response = await NetworkServices.Authentication.myProfile();
           if (response && response.status === 200) {
        setProfile(response?.data.data);
      }
    } catch (error) {
      console.error("Fetch User Error:", error);
    }
    setLoading(false); // End loading (handled in both success and error)
  }, []);

  // category api fetch
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

 

  const gradientStyle = {
    // background: "#E5E7E9",
    // Adjust the gradient colors and image URL as needed
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "repeat",
    width: "100%",
  };

  return (
    <>
      <div className="bg-blue-50 sticky top-0 z-50   ">
        <div className="bg-blue-50" style={gradientStyle}>
          <div className="navbar rounded-lg  px-10">
            {/* responsive navbar start */}
            <div className="navbar-start ">
              <button
                aria-controls="sidebar"
                onClick={(e) => {
                  e.stopPropagation();
                  setSidebarOpen(!sidebarOpen);
                }}
                className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
              >
                <GiHamburgerMenu />
              </button>
              {/* <Link className="" to="/">
                  <img
                    height={16}
                    width={60}
                    className="d-block border  rounded-md"
                    // src= {logo}
                    alt=""
                  />
                </Link> */}
            </div>
            {/* responsive navbar end */}

            <div className="navbar-end mt-1 ">
              <div className="flex">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle"
                  >
                    <div className="indicator">
                      {/* <IoIosNotifications className="text-xl" />
                      <span className="badge badge-sm indicator-item ">8</span> */}
                      <div className="relative flex items-center justify-center    ">
                        <div className="relative w-10 h-10 rounded-full   text-white flex items-center justify-center  ">
                          <div className="absolute top-0 right-0 flex items-center justify-center"></div>
                          {/* <div className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full z-10">
                            <span className="animate-wave absolute inline-flex w-5 h-5 rounded-full bg-blue-500 opacity-75"></span>
                            <span className="animate-wave absolute inline-flex w-5 h-5 rounded-full bg-blue-500 opacity-50"></span>
                            <span className="absolute inline-flex w-5 h-5 rounded-full bg-blue-500"></span>
                            <span className="absolute text-white font-bold text-[11px]">
                              9
                            </span>
                          </div> */}

                          {/* <span className="text-lg font-bold">🔔</span> */}
                          <IoIosNotifications className="text-xl text-gray-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    tabIndex={0}
                    className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                  >
                    <div className="card-body">
                      <div className="card-actions">
                        <button className="btn btn-primary btn-block">
                          View Notification
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        className="w-10 h-10 rounded-full border"
                        src={
                          profile?.profile_pic
                            ? `${process.env.REACT_APP_API_SERVER}${profile?.profile_pic}`
                            : userIcon
                        }
                        alt="i"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a className="justify-between">Name :{profile?.name}</a>
                    </li>
                    <li>
                      <a>Email : {profile?.email}</a>
                    </li>
                    <li>
                      <a>Role : {profile?.role}</a>
                    </li>
                    <li onClick={() => logout()}>
                      <a>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
