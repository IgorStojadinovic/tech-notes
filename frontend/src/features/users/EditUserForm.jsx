import {useState, useEffect} from "react";
import {useUpdateUserMutation, useDeleteUserMutation} from "./usersApiSlice";
import {useNavigate} from "react-router-dom";
import {CiSaveUp1, CiTrash} from "react-icons/ci";
import {clsx} from "clsx";
import {ROLES} from "../../config/roles";

const USER_REGEX = /^[A-Za-z0-9]{3,50}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({user}) => {
    const [updateUser, {isLoading, isSuccess, isError, error}] =
        useUpdateUserMutation();

    const [
        deleteUser,
        {isSuccess: isDelSuccess, isError: isDelError, error: delerror},
    ] = useDeleteUserMutation();

    const navigate = useNavigate();

    const [username, setUsername] = useState(user.username);
    const [validUsername, setValidUsername] = useState(false);
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [roles, setRoles] = useState(user.roles);
    const [active, setActive] = useState(user.active);

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password]);

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setUsername("");
            setPassword("");
            setRoles([]);
            navigate("/dashboard/users");
        }
    }, [isSuccess, isDelSuccess, navigate]);

    const onUsernameChanged = (e) => setUsername(e.target.value);
    const onPasswordChanged = (e) => setPassword(e.target.value);

    const onRolesChanged = (e) => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value,
        );
        setRoles(values);
    };

    const onActiveChanged = () => setActive((prev) => !prev);

    const onSaveUserClicked = async (e) => {
        if (password) {
            await updateUser({id: user.id, username, password, roles, active});
        } else {
            await updateUser({id: user.id, username, roles, active});
        }
    };

    const onDeleteUserClicked = async () => {
        await deleteUser({id: user.id});
    };

    const options = Object.values(ROLES).map((role) => {
        return (
            <option key={role} value={role} className="capitalize pb-2">
                {" "}
                {role}
            </option>
        );
    });

    let canSave;
    if (password) {
        canSave =
            [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
    } else {
        canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
    }

    const errClass = isError || isDelError ? "errmsg" : "offscreen";

    const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

    const content = (
        <>
            <p
                className={clsx("", {
                    "text-red-500 transition-all duration-300 visible text-[15px]":
                        isError || isDelError,
                })}
            >
                {errContent}
            </p>

            <form
                className="bg-white rounded-lg text-slate-600 flex flex-col  w-1/2 flex-1"
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="bg-gray-200 rounded-t-lg flex justify-between p-5">
                    <h2 className="text-lg font-semibold">Edit User</h2>

                </div>

                <div className="p-5 flex flex-col ">
                    <div className="flex flex-col gap-4 justify-center">
                        <div className="flex flex-col gap-2 ">
                            <label htmlFor="username" className="self-start"><span
                                className="text-sm font-semibold">Username</span></label>

                            <input
                                className={clsx(
                                    "",
                                    {
                                        "border border-red-500 rounded-full w-1/2 py-2 px-3 text-slate-500 mb-3 leading-tight focus:outline-none focus:shadow-outline":
                                            !validUsername,
                                    },
                                    {
                                        "border border-slate-200 rounded-full w-1/2 py-2 px-4 text-slate-500 mb-3 leading-tight focus:outline-none focus:shadow-outline":
                                        validUsername,
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
                                "text-red-500 transition-all duration-300 visible text-[15px] ",
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
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">
                                <span className="text-sm font-semibold"> Password:  [empty = no change]</span>{" "}
                            </label>
                            <input
                                className={clsx(
                                    "",
                                    {
                                        "border border-red-500 rounded w-1/2 py-2 px-3 text-slate-500 mb-3 leading-tight focus:outline-none focus:shadow-outline":
                                        validPassword,
                                    },
                                    {
                                        "border border-slate-200 rounded w-1/2 py-2 px-3 text-slate-500 mb-3 leading-tight focus:outline-none focus:shadow-outline":
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
                                    "opacity-0": !validPassword,
                                },
                            )}
                        >
                            Invalid password,must contain [4-12 chars incl. !@#$%]
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <label
                            htmlFor="user-active"
                            className="text-sm font-semibold"
                        >
                            Active:
                        </label>

                        <input
                            className="accent-teal	"
                            id="user-active"
                            name="user-active"
                            type="checkbox"
                            checked={active}
                            onChange={onActiveChanged}
                        />
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
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold" htmlFor="roles">
                                Assigned roles
                            </label>
                            <select
                                id="roles"
                                name="roles"
                                className={clsx(
                                    "",
                                    {
                                        "pt-4 focus:outline-none focus:shadow-outline overflow-hidden bg-white":
                                        roles,
                                    },
                                    {
                                        "pt-4 border-none focus:outline-none focus:shadow-outline overflow-hidden bg-red-600":
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
                    <div className="flex gap-8 mt-12">
                        <button
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                            className="flex bg-teal rounded-lg w-1/2 text-white py-3  items-center justify-center text-lg transition-all duration-200 ease-in-out hover:bg-teal/80 "

                        >
                            Save
                        </button>
                        <button title="Delete" onClick={onDeleteUserClicked}
                                className="flex bg-teal rounded-lg w-1/2 text-white py-3   items-center justify-center text-lg transition-all duration-200 ease-in-out hover:bg-red-400">
                            Delete
                        </button>
                    </div>
                </div>

            </form>
        </>
    );

    return content;
};
export default EditUserForm;
