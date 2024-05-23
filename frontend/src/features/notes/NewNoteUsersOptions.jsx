import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersApiSlice.js'
const NewNoteUsersOptions = ({userId}) => {
    const user = useSelector(state => selectUserById(state, userId))

    if(user) {

        return (
            <option value={user.id}>

                {user.username}
            </option>
        )
    } else  return null
}
export default NewNoteUsersOptions
