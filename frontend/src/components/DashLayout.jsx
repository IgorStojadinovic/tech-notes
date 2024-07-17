import {Link, Outlet, useLocation} from "react-router-dom";
import DashFooter from "./DashFooter.jsx";
import useAuth from "../hooks/useAuth.js";
import DashHeader from "./DashHeader.jsx";
import Logo from "../assets/logo-creative-tim-black.svg";
import Chart from "../assets/chart.svg";
import NewTask from "../assets/new.svg"
import SettingsIcon from "../assets/settings.svg"
import {IoPersonAddSharp} from "react-icons/io5";
import {FaHouseChimney} from "react-icons/fa6";
import {clsx} from "clsx";

const DashLayout = () => {
    const {username, isManager, isAdmin} = useAuth();

    const {pathname} = useLocation();

    const date = new Date();
    const today = new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
        timeStyle: "long",
    }).format(date);
    return (
        <>
            <div className="flex h-screen  bg-main-bg ">
                <div className="max-w-sm bg-main-bg w-1/4 px-8 py-12  flex flex-col  ">

                    <Link
                        to="/dashboard"
                        className="font-semibold flex  items-center gap-2 uppercase tracking-widest text-grey-blue text-sm"
                    >
                        <img src={Logo} alt={'site logo'} className="bg-gray-blue"/>
                        Task Manager
                    </Link>
                    <div className="flex flex-col gap-4 mt-10 justify-end  text-sm text-grey-blue font-semibold">

                        <Link to="/dashboard/"
                              className={clsx(" ", {
                                      "flex items-center rounded-2xl gap-4   transition-all duration-200 ease-in-out bg-white py-2": pathname === "/dashboard/"
                                  },
                                  {
                                      "flex items-center rounded-2xl gap-4   transition-all duration-200 ease-in-out hover:bg-white py-2": pathname !== "/dashboard/"
                                  })}
                        >

                            <div
                                className="flex items-center justify-center w-[42px] h-[42px] bg-white  rounded-full  p-3">
                                <FaHouseChimney fill={"#4FD1C5"}/>
                            </div>
                            <p> Dashboard </p>

                        </Link>
                        <Link to="/dashboard/notes"
                              className={clsx(" ", {
                                      "flex items-center rounded-2xl gap-4   transition-all duration-200 ease-in-out bg-white py-2": pathname === "/dashboard/notes"
                                  },
                                  {
                                      "flex items-center rounded-2xl gap-4   transition-all duration-200 ease-in-out hover:bg-white py-2": pathname !== "/dashboard/notes"
                                  })}
                        >

                            <div
                                className="flex items-center justify-between w-[42px] h-[42px] bg-white  rounded-full  p-3">
                                <img src={Chart} alt={"chart-icon"} className=" w-full "/>
                            </div>
                            <p> Tasks </p>

                        </Link>

                        <Link to="/dashboard/notes/new"
                              className={clsx(" ", {
                                      "flex items-center rounded-2xl gap-4   transition-all duration-200 ease-in-out bg-white py-2": pathname === "/dashboard/notes/new"
                                  },
                                  {
                                      "flex items-center rounded-2xl gap-4   transition-all duration-200 ease-in-out hover:bg-white py-2": pathname !== "/dashboard/notes/new"
                                  })}

                        >
                            <div
                                className="flex items-center justify-between w-[42px] h-[42px] bg-white  rounded-full  p-3">
                                <img src={NewTask} alt={"chart-icon"} className=" w-full "/>
                            </div>
                            <p> Add task </p>
                        </Link>


                        {(isManager || isAdmin) && (
                            <div className="flex flex-col gap-4">
                                <p className="text-grey-blue  uppercase font-medium ">Admin panel</p>
                                <Link to="/dashboard/users"


                                      className={clsx(" ", {
                                              "flex items-center rounded-2xl gap-4   transition-all duration-200 ease-in-out bg-white py-2": pathname === "/dashboard/users"
                                          },
                                          {
                                              "flex items-center rounded-2xl gap-4   transition-all duration-200 ease-in-out hover:bg-white py-2": pathname !== "/dashboard/users"
                                          })}

                                >

                                    <div
                                        className="flex items-center justify-between w-[42px] h-[42px] bg-white  rounded-full  p-3">
                                        <img src={SettingsIcon} alt={"chart-icon"} className=" w-full "/>
                                    </div>

                                    User settings
                                </Link>
                                <Link to="/dashboard/users/new"

                                      className={clsx(" ", {
                                              "flex items-center rounded-2xl gap-4 transition-all duration-200 ease-in-out bg-white py-2": pathname === "/dashboard/users/new"
                                          },
                                          {
                                              "flex items-center rounded-2xl gap-4 py-2  transition-all duration-200 ease-in-out hover:bg-white ": pathname !== "/dashboard/users/new"
                                          })}>


                                    <div
                                        className="flex items-center justify-center w-[42px] h-[42px] bg-white  rounded-full  p-3">
                                        <IoPersonAddSharp fill={"#4FD1C5"}/>
                                    </div>
                                    Add new user

                                </Link>
                            </div>

                        )}

                    </div>
                </div>

                <div
                    className={
                        pathname !== "/dashboard/notes"
                            ? "bg-gray-50  w-full flex flex-col justify-between"
                            : "bg-gray-50  w-full flex flex-col justify-start"
                    }
                >
                    <DashHeader/>
                    <div className="h-screen px-8">
                        <Outlet/>
                    </div>
                    <DashFooter/>
                </div>
            </div>
        </>
    );
};
export default DashLayout;
