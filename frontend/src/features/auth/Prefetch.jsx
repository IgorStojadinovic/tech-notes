import {useEffect} from 'react'
import {notesApiSlice} from "../notes/notesApiSlice.js";
import {usersApiSlice} from "../users/usersApiSlice.js";
import {store} from '../../app/store.js';
import {Outlet} from "react-router-dom";



const Prefetch = () => {

    useEffect ( () => {
        console.log('subscribing')
        const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate()); //Manual subscription
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

        return () => {
            console.log('unsubscribe')
            notes.unsubscribe()
            users.unsubscribe()
        }
    } , [] );
    return (
        <Outlet/>
    )
}
export default Prefetch
