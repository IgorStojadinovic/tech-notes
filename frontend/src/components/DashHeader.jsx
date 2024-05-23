import { Link,useNavigate,useLocation } from "react-router-dom";
import { IoIosLogOut,IoIosSettings  } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { useSendLogoutMutation } from "../features/auth/authApiSlice.js";
import {useEffect} from "react";
import useAuth from "../hooks/useAuth.js";


const DASH_REGEX = /^\/dashboard(\/)?$/
const NOTES_REGEX = /^\/dashboard\/notes(\/)?$/
const USERS_REGEX = /^\/dashboard\/users(\/)?$/


const DashHeader = () => {
    const { isManager, isAdmin}  = useAuth();
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess,navigate]);

    const onNewNoteClicked = () => navigate('/dashboard/notes/new')
    const onNewUserClicked = () => navigate('/dashboard/users/new')
    const onNotesClicked= () => navigate('/dashboard/notes')
    const onUsersClicked = () => navigate('/dashboard/users')

    const onLogoutClicked = () => sendLogout();


    let dashClass = null

    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    let newNoteButton = null
    if (NOTES_REGEX.test(pathname)) {
        newNoteButton = (
            <button
                className="icon-button"
                title="New Note"
                onClick={onNewNoteClicked}
            >
               <CiCirclePlus/>
            </button>
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <CiCirclePlus />
            </button>
        )
    }

    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dashboard')) {
            userButton = (
                <button
                    className="icon-button"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <IoIosSettings/>
                </button>
            )
        }
    }

    let notesButton = null
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dashboard')) {
        notesButton = (
            <button
                className="icon-button"
                title="Notes"
                onClick={onNotesClicked}
            >
                <MdEdit />
            </button>
        )
    }




    const logoutButton = (
        <button
            className='icon-button'
            title='Logout'
            onClick={onLogoutClicked}
        >
            <IoIosLogOut/>
        </button>
    )

    const errClass = isError ? 'errmsg' :' offscreen'

    let buttonContent
    if (isLoading) {
        buttonContent = <p>Logging out...</p>
    } else {
        buttonContent = (
            <>
                {newNoteButton}
                {newUserButton}
                {notesButton}
                {userButton}
                {logoutButton}
            </>
        )
    }

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>
        <header className="dash-header">
            <div className={`dash-header__container ${dashClass}`}>
                <Link to="/dashboard">
                    <h1 className="dash-header__title">techNotes</h1>
                </Link>
                <nav className="dash-header__nav">
                    {/* add nav buttons later */}
                    {buttonContent}
                </nav>
            </div>
        </header>
        </>
    )
    return content
}
export default DashHeader
