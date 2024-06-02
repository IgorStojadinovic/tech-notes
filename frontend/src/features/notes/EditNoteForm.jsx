import { useEffect, useState } from "react";
import {
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} from "./notesApiSlice.js";
import { useNavigate, useParams } from "react-router-dom";
import { CiSaveUp1, CiTrash } from "react-icons/ci";
import useAuth from "../../hooks/useAuth.js";
import { clsx } from "clsx";

const EditNoteForm = ({ note }) => {
  const { isManager, isAdmin } = useAuth();

  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();

  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteNoteMutation();

  const navigate = useNavigate();

  const [user, setUser] = useState(note.user);
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);

  const [createdAt, setCreatedAt] = useState(note.createdAt);
  const [updatedAt, setUpdatedAt] = useState(note.updatedAt);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      navigate("/dashboard/notes");
    }
  }, [isSuccess, isDelSuccess]);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onTextChange = (e) => setText(e.target.value);
  const onCompletedChange = (e) => setCompleted((prev) => !prev);

  const onSaveNoteClicked = async (e) => {
    await updateNote({ id: note.id, title, text, completed });
  };

  const onDeleteNoteClicked = async () => {
    await deleteNote({ id: note.id, userId: note.user });
  };

  const errContent = (error?.data?.message || delerror?.data?.message) ?? "";

  let canSave = [title, text].every(Boolean) && !isLoading;

  const content = (
    <>
      <p
        className={clsx("", {
          "text-red-500 transition-all duration-300 visible text-[15px] mb-2":
            isError,
        })}
      >
        {isError || isDelError}
      </p>
      <form
        className="border rounded-lg text-slate-600 flex flex-col  w-1/2 flex-1 "
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="bg-gray-100 rounded-lg flex justify-between p-5">
          <h2>Edit Note</h2>
          <div className="flex gap-8">
            <button
              title="Save"
              onClick={onSaveNoteClicked}
              disabled={!canSave}
            >
              <CiSaveUp1
                className="transition-all duration-300  hover:text-green-500"
                size={28}
              />
            </button>

            {isManager ||
              (isAdmin && (
                <button title="Delete" onClick={onDeleteNoteClicked}>
                  <CiTrash
                    size={28}
                    className="transition-all duration-300  hover:text-red-500"
                  />
                </button>
              ))}
          </div>
        </div>
        <div className="p-5 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <label htmlFor="title">User </label>
            <input
              className="border border-slate-200 rounded w-1/2  py-3 px-3 text-slate-500 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              name="title"
              type="text"
              value={note.username}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="title">Note Title </label>
            <input
              className="border border-slate-200 rounded w-1/2 py-2 px-3 text-slate-500 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={onTitleChange}
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="note-text">Note Text </label>
            <textarea
              className="border border-slate-200 rounded w-1/2 py-2 px-3 text-slate-500 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="note-text"
              name="note-text"
              value={text}
              onChange={onTextChange}
              rows={10}
              cols={20}
            ></textarea>
          </div>
          <div className="flex flex-col gap-4">
            <label>Completed status: </label>
            <div>
              <label htmlFor="completed-status">Completed: </label>
              <input
                onChange={onCompletedChange}
                type="checkbox"
                id="completed-status"
                name="completed-status"
                value={completed}
                checked={completed}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );

  return content;
};
export default EditNoteForm;
