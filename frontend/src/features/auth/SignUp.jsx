import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSignupMutation } from "./authApiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import usePersist from "../../hooks/usePersist.js";

const USER_REGX = /^[A-Za-z0-9]{3,20}$/;
const PWD_REGEX = /^[A-Za-z0-9!@#$%+\-*/=]{4,12}$/;

const SignUp = () => {
  const [signup, { isLoading: isLoginLoading, isSuccess }] =
    useSignupMutation();

  const [validUsername, setValidUsername] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [persist, setPersist] = usePersist();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setValidUsername(USER_REGX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      notifySuccess();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [isSuccess, navigate]);

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const canSave =
    [validUsername, validPassword].every(Boolean) && !isLoginLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        const { accessToken } = await signup({ username, password }).unwrap();

        setUsername("");
        setPassword("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const notifySuccess = () => {
    if (isSuccess) {
      toast.success("Success! User created.", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: false,
        theme: "light",
      });
    }
  };

  const notify = () => {
    if (!username || !validUsername) {
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

    if (!password || !validPassword) {
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
  const content = (
    <div className="flex flex-col items-center justify-center h-screen">
      <section className="flex flex-col bg-semi-dark-blue rounded-lg ">
        <main className="p-10">
          <h1 className="mb-8 font-semibold text-2xl"> Signup</h1>
          <div>
            <ToastContainer />
          </div>
          <form className="flex flex-col gap-10 " onSubmit={onSaveUserClicked}>
            <input
              className="bg-transparent border-b-[1px] border-b-greyish-blue px-4 pb-4 outline-0 font-light focus:border-b-red-main"
              type="text"
              id="username"
              value={username}
              onChange={handleUserInput}
              autoComplete="off"
              required
              placeholder="Username"
            />

            <input
              className="bg-transparent border-b-[1px] border-b-greyish-blue px-4 pb-4   outline-0 font-light focus:border-b-red-main"
              type="password"
              id="password"
              onChange={handlePwdInput}
              value={password}
              required
              placeholder="Password"
            />

            <button
              className=" bg-red-main py-3 w-full rounded-lg font-light hover:bg-red-main/80 transition-color duration-300  hover:bg-light-peach  z-20 drop-shadow-lg"
              onClick={notify}
            >
              Signup
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
            Already have account?
            <Link
              to={"/"}
              className="ml-2 text-red-main hover:text-greyish-blue transition-color duration-300 "
            >
              Login
            </Link>
          </span>
        </main>
      </section>
    </div>
  );

  return content;
};
export default SignUp;
