import {Route, Routes} from "react-router-dom"
import Layout from "./components/Layout.jsx"
import Public from "./components/Public.jsx"
import Login from "./features/auth/Login.jsx"
import DashLayout from "./components/DashLayout.jsx"
import Welcome from "./features/auth/Welcome.jsx"
import NotesList from "./features/notes/NotesList.jsx"
import EditNote from "./features/notes/EditNote.jsx"
import NewNote from "./features/notes/NewNote.jsx"
import UsersList from "./features/users/UsersList.jsx"
import EditUser from "./features/users/EditUser.jsx"
import NewUserForm from "./features/users/NewUserForm.jsx"
import Prefetch from "./features/auth/Prefetch.jsx"
import PersistLogin from "./features/auth/PersistLogin.jsx"
import RequireAuth from "./features/auth/RequireAuth.jsx"
import { ROLES } from './config/roles.js'


const App = () => {
    return (
        <Routes>
            <Route path="/" component={<Layout/>}>
                {/* Public Routes */}
                <Route index element={<Public/>}/>
                <Route path="login" element={<Login/>}/>

                {/* Protected Routes */}
                <Route element={<PersistLogin/>}>
                    <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />} >
                        <Route element={<Prefetch/>}>
                        <Route path='dashboard' element={<DashLayout/>}>
                            <Route index element={<Welcome/>}/>

                            <Route element={<RequireAuth allowedRoles={[ROLES.Admin,ROLES.Manager]} />} >
                                <Route path='users'>
                                    <Route index element={<UsersList/>}/>
                                    <Route path=":id" element={<EditUser/>}/>
                                    <Route path="new" element={<NewUserForm/>}/>
                                </Route>
                            </Route>
                            <Route path='notes'>
                                <Route index element={<NotesList/>}/>
                                <Route path=":id" element={<EditNote/>}/>
                                <Route path="new" element={<NewNote/>}/>
                            </Route>
                        </Route>
                    </Route>
                    </Route>
                </Route>
                {/* End Of Protected Routes */}
            </Route>
        </Routes>
    )
}
export default App
