import { useAddNewNoteMutation } from "./notesApiSlice.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CiSaveUp1 } from "react-icons/ci";
import useAuth from "../../hooks/useAuth.js";

const NewNoteForm = ({ users }) => {
  const { username, isManager, isAdmin } = useAuth();
  const [createNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();

  const currentuser = users.filter(
    (currentUser) => currentUser.username === username,
  );

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [completed, setCompleted] = useState(false);
  const [userid, setUserId] = useState(currentuser[0].id);

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dashboard/notes");
    }
  }, [isSuccess, navigate]);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onTextChange = (e) => setText(e.target.value);
  const onCompletedChange = (e) => setCompleted((prev) => !prev);

  const canSave = [title, text, userid].every(Boolean) && !isLoading;

  const onUserOptionChange = (e) => setUserId(e.target.value);

  const onSaveNoteClicked = async (e) => {
    e.preventDefault();

    if (canSave) {
      await createNote({ userid, title, text, completed });
    }
  };

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {" "}
        {user.username}
      </option>
    );
  });

  //const tableOptions = ids?.length ? ids.map ( userId => <NewNoteUsersOptions key={ userId } userId={ userId }  /> ) : null
  const content = (
    <>
      <form className="border rounded-lg text-slate-600 flex flex-col  gap-8  w-1/2 flex-1">
        <div className="bg-gray-200 rounded-t-lg flex justify-between p-5">
          <h2>New Note</h2>
          <div className=""></div>
          <button
            title="Save"
            onClick={onSaveNoteClicked}
            disabled={!canSave}
            className={
              canSave
                ? "transition-all duration-300 text-green-500 "
                : "transition-all duration-300 text-red-500"
            }
          >
            <CiSaveUp1 size={30} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-8">
          <div className="flex flex-col gap-2 ">
            <label htmlFor="title">Task Title </label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={onTitleChange}
              className="border border-slate-200 rounded w-1/2 py-2 px-3 text-slate-500 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex flex-col gap-2 ">
            <label className="form__label" htmlFor="note-text">
              Note Text{" "}
            </label>
            <textarea
              id="note-text"
              name="note-text"
              value={text}
              onChange={onTextChange}
              className="border w-1/2 h-40 rounded-sm focus:outline-none focus:shadow-outline p-3"
            ></textarea>
          </div>
          <div className="flex flex-col gap-2">
            <label>Completed status </label>
            <div>
              <label htmlFor="completed-status">Completed : </label>
              <input
                onChange={onCompletedChange}
                type="checkbox"
                id="completed-status"
                name="completed-status"
                value={completed}
                rows={10}
                cols={20}
              />
            </div>
          </div>
          {isManager ||
            (isAdmin && (
              <div>
                <label>This note goes to which user ? </label>
                <div>
                  <select onChange={onUserOptionChange}>{options}</select>
                </div>
              </div>
            ))}
          <div>
            <label>Current user: </label>
            <div>
              <select onChange={onUserOptionChange}>
                <option>{username}</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </>
  );

  return content;
};
export default NewNoteForm;
