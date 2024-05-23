import NewNoteForm from './NewNoteForm'
import { useGetUsersQuery } from '../users/usersApiSlice'
//import PulseLoader from 'react-spinners/PulseLoader'


const NewNote = () => {


    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!users?.length) return <p>Loading....</p>

    const content = <NewNoteForm users={users} />
    console.log(users);
    return content
}
export default NewNote