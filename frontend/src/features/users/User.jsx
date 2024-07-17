import {FaPen} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useGetUsersQuery} from "./usersApiSlice.js";
import {memo} from "react";
import useAuth from "../../hooks/useAuth.js";

const User = ({userId}) => {
    //const user = useSelector(state => selectUserById(state, userId))
    const {user} = useGetUsersQuery("usersList", {
        selectFromResult: ({data}) => ({
            user: data?.entities[userId],
        }),
    });
    const {username, isManager, isAdmin} = useAuth();

    const navigate = useNavigate();

    if (user) {
        const handleEdit = () => navigate(`/dashboard/users/${userId}`);

        const userRolesString = user.roles.toString().replaceAll(",", ", ");

        return (
            <tr className="flex justify-between text-center p-5 ">
                <td className="flex-1">{user.username}</td>
                <td className="flex-1">{userRolesString}</td>
                <td className="flex-1">
                    {user.username !== "Admin" ? (
                        <button
                            className=" text-slate-600 transition-all duration-300 hover:text-teal text-lg"
                            onClick={handleEdit}
                        >
                            <FaPen/>
                        </button>
                    ) : (
                        <button className="text-slate-400 text-lg" disabled={true}>
                            <FaPen/>
                        </button>
                    )}
                </td>
            </tr>
        );
    } else return null;
};
const memoizedUser = memo(User);
export default memoizedUser;
