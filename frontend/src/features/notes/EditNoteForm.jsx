import {useEffect, useState} from "react";
import {useDeleteNoteMutation, useUpdateNoteMutation} from "./notesApiSlice.js"
import {useNavigate,useParams} from "react-router-dom"
import {CiSaveUp1, CiTrash} from "react-icons/ci";
import useAuth from "../../hooks/useAuth.js";


const EditNoteForm = ({note}) => {

    const {isManager,isAdmin} = useAuth()

    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

    const [deleteNote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteNoteMutation()




    const navigate = useNavigate()

    const [user, setUser] = useState(note.user)
    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)
    const [completed, setCompleted] = useState(note.completed);

    const [createdAt, setCreatedAt] = useState(note.createdAt)
    const [updatedAt, setUpdatedAt] = useState(note.updatedAt)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            navigate('/dashboard/notes')
        }

    }, [isSuccess, isDelSuccess])




    const onTitleChange = e => setTitle(e.target.value)
    const onTextChange = e => setText(e.target.value)
    const onCompletedChange = e => setCompleted(prev => (!prev))

    const onSaveNoteClicked = async (e) => {
        await updateNote({id:note.id, title, text, completed })
    }

    const onDeleteNoteClicked = async () => {
        await deleteNote({id: note.id ,userId:note.user})

    }



    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? 'form__input--incomplete' : ''
    const validTextClass = !text ? 'form__input--incomplete' : ''


    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    let canSave = [title, text].every(Boolean) && !isLoading

    const content = (
        <>
            <p className={errClass}>{errContent}</p>
            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Note</h2>
                    <div className='form__action-buttons'>
                    </div>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveNoteClicked}
                            disabled={!canSave}
                        >
                            <CiSaveUp1/>
                        </button>

                        {isManager || isAdmin &&
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteNoteClicked}
                        >
                            <CiTrash/>
                        </button>
                        }
                    </div>
                </div>
                <h2>Username: {note.username}</h2>

                <div className="form__title-row">
                    <label className="form__label" htmlFor="title">
                        Note Title: </label>
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
                        Note Text: </label>
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
                        Completed status: </label>
                    <div>
                        <label className="form__label" htmlFor="completed-status">
                            Completed: </label>
                        <input onChange={onCompletedChange} type='checkbox' id='completed-status'
                               name='completed-status' value={completed} checked={completed}/>
                    </div>

                </div>
            </form>
        </>
    )

    return (
        content
    )
}
export default EditNoteForm
