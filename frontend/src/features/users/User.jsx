import { FaPen } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { useGetUsersQuery} from "./usersApiSlice.js";
import { memo } from "react";

// eslint-disable-next-line react/prop-types
const User = ({ userId }) => {
    //const user = useSelector(state => selectUserById(state, userId))
    const { user }= useGetUsersQuery('usersList',{
        selectFromResult: ({data}) => ({
            user: data?.entities[userId]
        })
    })


    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dashboard/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{user.username}</td>
                <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
                <td className={`table__cell ${cellStatus}`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FaPen />

                    </button>
                </td>
            </tr>
        )

    } else return null
}
const memoizedUser = memo(User)
export default User