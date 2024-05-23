import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth.js";
const Welcome = () => {
    const { username, isManager, isAdmin} = useAuth()

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US',{dateStyle:'full',timeStyle:'long'}).format(date)

    const content = (
        <section className="welcome">
            <p>{today}</p>
            <h1>Welcome {username}!</h1>
            <p><Link to='/dashboard/notes'>View techNotes</Link></p>
            <p><Link to='/dashboard/notes/new'>Add new techNote</Link></p>
            {
                (isManager || isAdmin) && <p><Link to='/dashboard/users'>View user settings</Link></p>

            }
            {
                (isManager || isAdmin) && <p><Link to='/dashboard/users/new'>Add new user</Link></p>
            }


        </section>
    )

    return (
        content
    )
}
export default Welcome
