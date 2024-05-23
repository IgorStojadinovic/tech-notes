
import {useNavigate,useLocation} from 'react-router-dom';
import { FaHouseChimney } from "react-icons/fa6";
import useAuth from "../hooks/useAuth.js";

const DashFooter = () => {
    const { username , status} = useAuth()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoHomeClicked = () => navigate('/dashboard')

    let goHomeButton = null
    if (pathname !== '/dashboard') {
        goHomeButton = (
            <button
                className="dash-footer__button icon-button"
                title="Home"
                onClick={onGoHomeClicked}
            >
                <FaHouseChimney />
            </button>
        )
    }

    const content = (
        <footer className="dash-footer">
            {goHomeButton}
            <p>Current User: {username}</p>
            <p>Status: {status}</p>
        </footer>
    )
    return content
}
export default DashFooter
