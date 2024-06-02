import { useLocation, useNavigate } from "react-router-dom";
import { IoIosLogOut, IoIosSettings } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";

import { CiCirclePlus } from "react-icons/ci";
import { useSendLogoutMutation } from "../features/auth/authApiSlice.js";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth.js";

const DASH_REGEX = /^\/dashboard(\/)?$/;
const NOTES_REGEX = /^\/dashboard\/notes(\/)?$/;
const USERS_REGEX = /^\/dashboard\/users(\/)?$/;

const DashHeader = () => {
  const { isManager, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const onNewNoteClicked = () => navigate("/dashboard/notes/new");
  const onNewUserClicked = () => navigate("/dashboard/users/new");
  const onNotesClicked = () => navigate("/dashboard/notes");
  const onUsersClicked = () => navigate("/dashboard/users");

  const onLogoutClicked = () => sendLogout();

  let newNoteButton = null;
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button title="New Note" onClick={onNewNoteClicked}>
        <CiCirclePlus
          className="text-slate-800 transition-all duration-300 hover:text-slate-500"
          size={24}
        />
      </button>
    );
  }

  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button title="New User" onClick={onNewUserClicked}>
        <CiCirclePlus
          className="text-slate-800 transition-all duration-300 hover:text-slate-500"
          size={24}
        />
      </button>
    );
  }

  let userButton = null;
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dashboard")) {
      userButton = (
        <button title="Users" onClick={onUsersClicked}>
          <IoSettingsOutline
            className="text-slate-800 transition-all duration-300 hover:text-slate-500"
            size={24}
          />
        </button>
      );
    }
  }

  let notesButton = null;
  if (!NOTES_REGEX.test(pathname) && pathname.includes("/dashboard")) {
    notesButton = (
      <button title="Notes" onClick={onNotesClicked}>
        <CiEdit
          className="text-slate-800 transition-all duration-300 hover:text-slate-500"
          size={24}
        />
      </button>
    );
  }

  const logoutButton = (
    <button title="Logout" onClick={onLogoutClicked}>
      <IoIosLogOut
        className="text-slate-800 transition-all duration-300 hover:text-slate-500"
        size={24}
      />
    </button>
  );

  const errClass = isError ? "errmsg" : " offscreen";

  let buttonContent;
  if (isLoading) {
    buttonContent = <p>Logging out...</p>;
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {newUserButton}
        {notesButton}
        {userButton}
        {logoutButton}
      </>
    );
  }

  const content = (
    <>
      <header className="bg-gray-200 border-b-2 text-semi-dark-blue p-5">
        <div className=" ">
          <p className={errClass}>{error?.data?.message}</p>
          <nav className="flex gap-6 justify-end items-end ">
            {/* add nav buttons later */}
            {buttonContent}
          </nav>
        </div>
      </header>
    </>
  );
  return content;
};
export default DashHeader;
