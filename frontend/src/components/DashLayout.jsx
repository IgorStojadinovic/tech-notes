import { Link, Outlet, useLocation } from "react-router-dom";
import DashFooter from "./DashFooter.jsx";
import useAuth from "../hooks/useAuth.js";
import DashHeader from "./DashHeader.jsx";
import { FaChartPie } from "react-icons/fa6";

const DashLayout = () => {
  const { username, isManager, isAdmin } = useAuth();

  const { pathname } = useLocation();

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);
  return (
    <>
      <div className="flex h-screen ">
        <div className="max-w-sm bg-semi-dark-blue px-16 py-5 flex flex-col ">
          <Link
            to="/dashboard"
            className="font-semibold flex text-base items-center gap-2 uppercase tracking-widest fo"
          >
            <FaChartPie size={32} />
            Task Manager
          </Link>
          <div className="flex flex-col gap-2 mt-10 justify-end  text-lg text-slate-100">
            <Link to="/dashboard/notes" className="group">
              View current tasks
              <div className="w-0 group-hover:w-1/2 transition-all duration-300 h-[2px] bg-white rounded-full mt-1"></div>
            </Link>

            <Link to="/dashboard/notes/new" className="group">
              Add new task{" "}
              <div className="w-0 group-hover:w-1/2 transition-all duration-300 h-[2px] bg-white rounded-full mt-1"></div>
            </Link>

            {(isManager || isAdmin) && (
              <Link to="/dashboard/users">View user settings</Link>
            )}
            {(isManager || isAdmin) && (
              <Link to="/dashboard/users/new">Add new user</Link>
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
          <DashHeader />
          <div className="flex flex-col justify-between p-5 flex-1 overflow-auto">
            <Outlet />
          </div>
          <DashFooter />
        </div>
      </div>
    </>
  );
};
export default DashLayout;
