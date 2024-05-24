import { FaPen } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { useGetNotesQuery } from "./notesApiSlice.js"
import { memo } from 'react'

const Note = ({ noteId }) => {

    //const note = useSelector(state => selectNoteById(state, noteId));
    const  { note } = useGetNotesQuery('notesList' , {
        selectFromResult: ({data}) => ({
                note: data?.entities[noteId]
        })
    })

    const navigate = useNavigate()

    if (note ) {
        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', hour:'2-digit', minute:'numeric' })

        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' ,hour:'2-digit', minute:'numeric'})

        const handleEdit = () => navigate(`/dashboard/notes/${noteId}`)

        return (
            <tr className="table__row">
                <td className="table__cell note__status">
                    {note.completed
                        ? <span className="note__status--completed">Completed</span>
                        : <span className="note__status--open">Open</span>
                    }
                </td>
                <td className="table__cell note__created">{created}</td>
                <td className="table__cell note__updated">{updated}</td>
                <td className="table__cell note__title">{note.title}</td>
                <td className="table__cell note__username">{note.username}</td>

                <td className="table__cell">
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

//Rerended if there are changes in the data
const memoizedNote = memo(Note)
export default memoizedNote