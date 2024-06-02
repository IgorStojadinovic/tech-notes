import { FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetNotesQuery } from "./notesApiSlice.js";
import { memo } from "react";

const Note = ({ noteId }) => {
  //const note = useSelector(state => selectNoteById(state, noteId));
  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  });

  const navigate = useNavigate();

  if (note) {
    const created = new Date(note.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "numeric",
    });

    const updated = new Date(note.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "numeric",
    });

    const handleEdit = () => navigate(`/dashboard/notes/${noteId}`);
    const truncatedTitle =
      note.title.length > 10 ? note.title.substring(0, 20) + "..." : note.title;

    return (
      <tr className="flex justify-between text-center p-5">
        <td className="flex-1 ">
          {note.completed ? (
            <span className="text-green-500">Completed</span>
          ) : (
            <span>Open</span>
          )}
        </td>
        <td className="flex-1">{created}</td>
        <td className="flex-1">{updated}</td>
        <td className="flex-1">{truncatedTitle}</td>
        <td className="flex-1">{note.username}</td>

        <td className="flex-1">
          <button className="" onClick={handleEdit}>
            <FaPen className=" text-slate-600 transition-all duration-300 hover:text-slate-400" />
          </button>
        </td>
      </tr>
    );
  } else return null;
};

//Render if there are changes in the data
const memoizedNote = memo(Note);
export default memoizedNote;
