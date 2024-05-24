import { useParams } from 'react-router-dom'
import EditUserForm from './EditUserForm.jsx'
import {useGetUsersQuery} from './usersApiSlice';
import {PulseLoader} from 'react-spinners';

const EditUser = () => {
    const { id } = useParams()

   // const user = useSelector(state => selectUserById(state, id))
    const { user } = useGetUsersQuery('usersList',{
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        })
    })

   if (!user ) return <PulseLoader color={'#FFF'}/>

   const content = <EditUserForm user={user}/>

   return content
}
export default EditUser