import {useState, useEffect} from "react";
import {useAddNewUserMutation} from "./usersApiSlice.js";
import {useNavigate} from "react-router-dom";
import {CiSaveUp1} from "react-icons/ci";
import {ROLES} from "../../config/roles.js";
import {clsx} from "clsx";

const USER_REGX = /^[A-Za-z0-9]{3,20}$/;
const PWD_REGEX = /^[A-Za-z0-9!@#$%+\-*/=]{4,12}$/;

const NewUserForm = () => {
    const [addNewUser, {isLoading, isSuccess, isError, error}] =
        useAddNewUserMutation();

    const navigate = useNavigate();
    const [validUsername, setValidUsername] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [roles, setRoles] = useState(["Employee"]);

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
            setRoles([]);
            navigate("/dashboard/users");
        }
    }, [isSuccess, navigate]);

    const onUsernameChanged = (e) => setUsername(e.target.value);
    const onPasswordChanged = (e) => setPassword(e.target.value);

    const onRolesChanged = (e) => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection
            (option) => option.value,
        );
        setRoles(values);
    };

    const canSave =
        [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

    const onSaveUserClicked = async (e) => {
        e.preventDefault();
        if (canSave) {
            await addNewUser({
                username,
                password,
                roles,
            });
        }
    };

    const options = Object.values(ROLES).map((role) => {
        return (
            <option key={role} value={role} className="">
                {role}
            </option>
        );
    });

    const content = (
        <>
            <p
                className={clsx("", {
                    "text-red-500 transition-all duration-300 visible text-[15px] mb-2":
                    isError,
                })}
            >
                {error?.data?.message}
            </p>

            <form
                className="bg-white rounded-lg text-slate-600 flex flex-col  w-1/2 flex-1"
                onSubmit={onSaveUserClicked}
            >
                <div className=" rounded-t-lg flex justify-between p-5">
                    <h2 className="text-lg font-semibold">Add new user</h2>
                </div>
                <div className="p-5 flex flex-col gap-8">
                    <div className="flex flex-col gap-4 justify-center">
                        <div className="flex flex-col gap-2 justify-between">
                            <label htmlFor="username" className="text-sm font-semibold">Username</label>

                            <input
                                className={clsx(
                                    "border border-slate-200 rounded-full w-1/2 py-2 px-3 text-slate-500 mb-3 focus:outline-none focus:shadow-outline leading-4",

                                    {
                                        "border border-slate-500 rounded-full w-1/2 py-2 px-3 text-slate-500 mb-3 leading-tight focus:outline-none focus:shadow-outline":
                                            !validUsername,
                                    },
                                )}
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="off"
                                value={username}
                                onChange={onUsernameChanged}
                            />
                        </div>
                        <p
                            className={clsx(
                                "text-red-500 transition-all duration-300 visible text-[15px]",
                                {
                                    "opacity-0": validUsername,
                                },
                            )}
                        >
                            Invalid username,must be [3-50 letters], can't contain any special
                            characters -@*+$%& etc..
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex  flex-col gap-2 justify-between">
                            <label htmlFor="password" className="text-sm font-semibold">
                                Password
                            </label>
                            <input
                                className={clsx(
                                    "border border-slate-200 rounded-full w-1/2 py-2 px-3 text-slate-500 mb-3 leading-tight focus:outline-none focus:shadow-outline",

                                    {
                                        "border border-slate-500 rounded-full w-1/2 py-2 px-3 text-slate-500 mb-3 leading-tight focus:outline-none focus:shadow-outline":
                                            !validPassword,
                                    },
                                )}
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={onPasswordChanged}
                            />
                        </div>

                        <p
                            className={clsx(
                                "text-red-500 transition-all duration-300 visible text-[15px]",
                                {
                                    "opacity-0": validPassword,
                                },
                            )}
                        >
                            Invalid password,must contain [4-12 chars incl. !@#$%]
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p
                            className={clsx("opacity-0", {
                                "text-red-500 transition-all duration-300 visible text-[15px]":
                                    !canSave,
                            })}
                        >
                            Please select the role.
                        </p>

                        <div className="flex flex-col  gap-4 justify-between">
                            <div>
                                <label htmlFor="roles" className="text-sm font-semibold">Select role</label>
                                <p className="text-sm text-gray/80">Default is Employee</p>
                            </div>

                            <select
                                id="roles"
                                name="roles"
                                className={clsx(
                                    "",
                                    {
                                        "pt-10 capitalize  focus:outline-none focus:shadow-outline overflow-hidden ":
                                        roles,
                                    },
                                    {
                                        "pt-10 capitalize focus:outline-none focus:shadow-outline overflow-hidden":
                                            !roles,
                                    },
                                )}
                                multiple={true}
                                size="3"
                                value={roles}
                                onChange={onRolesChanged}
                            >
                                {options}
                            </select>
                        </div>
                    </div>

                    <div>
                        <button
                            title="Save"
                            disabled={!canSave}
                            className={!canSave ? "flex bg-teal/40 rounded-lg w-1/2 text-white py-3   items-center justify-center text-lg transition-all duration-200 ease-in-out hover:bg-teal" : "flex bg-teal rounded-lg w-1/2 text-white py-3   items-center justify-center text-lg "}
                        >
                            <CiSaveUp1/>
                        </button>
                    </div>
                </div>


            </form>
        </>
    );

    return content;
};
export default NewUserForm;
