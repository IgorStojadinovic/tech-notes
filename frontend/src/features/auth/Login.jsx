import React, {useRef, useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCredentials} from "./authSlice.js";
import {useLoginMutation} from "./authApiSlice.js";
import usePersist from "../../hooks/usePersist.js";
import PulseLoader from "react-spinners/PulseLoader";

import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState("Admin");
    const [password, setPassword] = useState("Admin");
    const [errMsg, setErrMsg] = useState("");
    const [persist, setPersist] = usePersist();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, {isLoading}] = useLoginMutation();

    const notify = () => {
        if (!username) {
            toast.error(" Invalid username!", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        if (!password) {
            toast.error(" Invalid password!", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    const errorNotify = () => {
        toast.error(" !", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {accessToken} = await login({username, password}).unwrap();
            dispatch(setCredentials({accessToken}));
            setUsername("");
            setPassword("");
            navigate("/dashboard");
        } catch (err) {
            if (!err.status) {
                setErrMsg("No Server Response");
            } else if (err.status === 400) {
                setErrMsg("Missing username or password");
            } else if (err.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    };

    const handleUserInput = (e) => setUsername(e.target.value);
    const handlePwdInput = (e) => setPassword(e.target.value);
    const handleToggle = () => setPersist((prev) => !prev);

    const content = (
        <div className="flex flex-col items-center justify-center h-screen">
            <div>
                <ToastContainer/>
            </div>
            {errMsg && <p>{errMsg}</p>}
            <section className="flex flex-col shadow-xl bg-white rounded-lg ">
                <main className="min-w-[400px] min-h-[600px] p-8">
                    <h1 className="mb-8 font-semibold text-2xl"> Login</h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                        <div className="flex flex-col gap-2">
                            <label className="text-dark-blue text-sm">
                                Username
                            </label>
                            <input
                                // className="bg-transparent border-b-[1px] border-b-greyish-blue px-4 pb-4 outline-0 font-light focus:border-b-red-main"
                                className="border border-slate-200 text-sm rounded-full py-4 px-3 text-slate-500  focus:outline-none focus:shadow-outline leading-4"
                                type="text"
                                id="username"
                                ref={userRef}
                                value={username}
                                onChange={handleUserInput}
                                autoComplete="off"
                                required
                                placeholder="Username"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-dark-blue text-sm">
                                Password
                            </label>
                            <input
                                className="border border-slate-200 text-sm rounded-full py-4 px-3 text-slate-500  focus:outline-none focus:shadow-outline leading-4"
                                type="password"
                                id="password"
                                onChange={handlePwdInput}
                                value={password}
                                required
                                placeholder="Password"
                            />
                        </div>
                        <label htmlFor="persist" className="text-sm flex gap-1.5 ">
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input id="perist" type="checkbox" className="peer sr-only" onChange={handleToggle}
                                       checked={persist}/>
                                <label htmlFor="perist" className="hidden"></label>
                                <div
                                    className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-teal peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                            </label>
                            {/*  <input
                            type="checkbox"
                            id="perist"
                            onChange={handleToggle}
                            checked={persist}
                        /> */}

                            <span className="text-grey-blue/40 text-sm font-semibold"> Trust This Device </span>
                        </label>
                        <button
                            className=" bg-teal  py-3 rounded-xl font-light hover:bg-dark-blue/80 transition-color duration-300  hover:bg-light-peach  z-20 drop-shadow-lg"
                            onClick={notify}
                        >
                            Login
                        </button>


                    </form>

                    <span
                        className="mt-6 flex items-center justify-center font-ligh text-base text-dark-blue">
            Don't have an account?
            <Link
                to={"/"}
                className="ml-2 text-teal hover:text-greyish-blue transition-color duration-300 "
            >
              Sign Up
            </Link>
          </span>
                </main>
            </section>
        </div>
    );

    return content;
};
export default Login;
