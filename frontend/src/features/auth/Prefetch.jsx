import {useEffect} from 'react'
import {notesApiSlice} from "../notes/notesApiSlice.js";
import {usersApiSlice} from "../users/usersApiSlice.js";
import {store} from '../../app/store.js';
import {Outlet} from "react-router-dom";



const Prefetch = () => {

    useEffect ( () => {

        //Built in prefetch
        store.dispatch(notesApiSlice.util.prefetch('getNotes','notesList',{ force:true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers','usersList',{ force: true }))


    } , [] );
    return (
        <Outlet/>
    )
}
export default Prefetch
