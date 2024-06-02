import { useNavigate, useLocation } from "react-router-dom";
import { FaHouseChimney } from "react-icons/fa6";
import useAuth from "../hooks/useAuth.js";

const DashFooter = () => {
  const { username, status } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate("/dashboard");

  let goHomeButton = null;
  if (pathname !== "/dashboard") {
    goHomeButton = (
      <button
        className="dash-footer__button icon-button"
        title="Home"
        onClick={onGoHomeClicked}
      >
        <FaHouseChimney />
      </button>
    );
  }

  const content = (
    <footer className="bg-gray-200 flex border-t-2 p-5 justify-between border text-slate-500 font-medium">
      {goHomeButton}
      <div className="flex gap-6">
        <p>Current User: {username}</p>
        <p>Status: {status}</p>
      </div>
    </footer>
  );
  return content;
};
export default DashFooter;
