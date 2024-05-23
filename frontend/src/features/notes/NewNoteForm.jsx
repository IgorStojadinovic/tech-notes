import {useAddNewNoteMutation} from "./notesApiSlice.js";
import {useGetUsersQuery,selectUserById} from "../users/usersApiSlice.js"
import {useNavigate} from "react-router-dom";
import {useEffect, useState,} from "react";
import {CiSaveUp1} from "react-icons/ci";
import NewNoteUsersOptions from "./NewNoteUsersOptions.jsx";
import User from "../users/User.jsx";
import useAuth from "../../hooks/useAuth.js";
import Note from "./Note.jsx";
import {useSelector} from "react-redux";

const NewNoteForm = ({users}) => {

    const {username,isManager,isAdmin} = useAuth();
    const [createNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    const currentuser = users.filter(currentUser => currentUser.username === username )



    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [completed, setCompleted] = useState(false)
    const [userid,setUserId] = useState(currentuser[0].id)


    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dashboard/notes')
        }
    }, [isSuccess,navigate])




    const onTitleChange = e => setTitle(e.target.value)
    const onTextChange = e => setText(e.target.value)
    const onCompletedChange = e => setCompleted(prev => (!prev))

    const canSave = [title, text, userid].every(Boolean) && !isLoading

    const onUserOptionChange = e => setUserId(e.target.value)

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()


        if(canSave){

            await createNote({userid,title, text, completed })
        }

    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })


   // const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? 'form__input--incomplete' : ''
    const validTextClass = !text ? 'form__input--incomplete' : ''


   // const errContent = (error?.data?.message || delerror?.data?.message) ?? ''



       //const tableOptions = ids?.length ? ids.map ( userId => <NewNoteUsersOptions key={ userId } userId={ userId }  /> ) : null
    const content = (
        <>
            <form className="form" >
                <div className="form__title-row">
                    <h2>Edit Note</h2>
                    <div className='form__action-buttons'>
                    </div>
                    <div className="form__action-buttons">
                        <button

                            title="Save"
                            onClick={onSaveNoteClicked}
                            disabled={!canSave}
                        >
                            <CiSaveUp1/>
                        </button>

                    </div>
                </div>


                <div className="form__title-row">
                    <label className="form__label" htmlFor="title">
                        Note Title : </label>
                    <input
                        className={`form__input ${title}`}
                        id="title"
                        name="title"
                        type="text"
                        value={title}
                        onChange={onTitleChange}
                    />
                </div>


                <div className="form__title-row">
                    <label className="form__label" htmlFor="note-text">
                        Note Text : </label>
                    <textarea
                        className={`form__input ${text}`}
                        id="note-text"
                        name="note-text"
                        value={text}
                        onChange={onTextChange}
                    >

                    </textarea>

                </div>
                <div className="form__title-row">
                    <label className="form__label">
                        Completed status : </label>
                    <div>
                        <label className="form__label" htmlFor="completed-status">
                            Completed : </label>
                        <input onChange={onCompletedChange} type='checkbox' id='completed-status'
                               name='completed-status' value={completed}/>
                    </div>

                </div>
                {
                    isManager || isAdmin && <div className='form__title-row'>
                        <label className="form__label">
                            User : </label>
                        <div>
                            <select onChange={onUserOptionChange}>
                                {options}
                            </select>
                        </div>

                    </div>

                }
                <div className='form__title-row'>
                    <label className="form__label">
                        User : </label>
                    <div>
                        <select onChange={onUserOptionChange}>
                                <option>{username}</option>
                        </select>
                    </div>

                </div>
            </form>
        </>
    )

    return content

}
export default NewNoteForm
