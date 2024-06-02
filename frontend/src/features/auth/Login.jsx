import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice.js";
import { useLoginMutation } from "./authApiSlice.js";
import usePersist from "../../hooks/usePersist.js";
import PulseLoader from "react-spinners/PulseLoader";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

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
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
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
        <ToastContainer />
      </div>
      {errMsg && <p>{errMsg}</p>}
      <section className="flex flex-col bg-semi-dark-blue rounded-lg ">
        <main className="p-10">
          <h1 className="mb-8 font-semibold text-2xl"> Login</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            <input
              className="bg-transparent border-b-[1px] border-b-greyish-blue px-4 pb-4 outline-0 font-light focus:border-b-red-main"
              type="text"
              id="username"
              ref={userRef}
              value={username}
              onChange={handleUserInput}
              autoComplete="off"
              required
              placeholder="Username"
            />

            <input
              className="bg-transparent border-b-[1px] border-b-greyish-blue px-4 pb-4 outline-0 font-light focus:border-b-red-main"
              type="password"
              id="password"
              onChange={handlePwdInput}
              value={password}
              required
              placeholder="Password"
            />
            <button
              className=" bg-red-main py-3 rounded-lg font-light hover:bg-red-main/80 transition-color duration-300  hover:bg-light-peach  z-20 drop-shadow-lg"
              onClick={notify}
            >
              Login
            </button>

            <label htmlFor="persist" className="text-sm flex gap-1.5">
              <input
                type="checkbox"
                id="perist"
                onChange={handleToggle}
                checked={persist}
              />
              Trust This Device
            </label>
          </form>
          <span className="mt-6 text-center font-ligh text-base">
            Don't have an account?
            <Link
              to={"/signup"}
              className="ml-2 text-red-main hover:text-greyish-blue transition-color duration-300 "
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
