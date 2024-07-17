import {useAddNewNoteMutation} from "./notesApiSlice.js";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {CiSaveUp1} from "react-icons/ci";
import useAuth from "../../hooks/useAuth.js";

const NewNoteForm = ({users}) => {
    const {username, isManager, isAdmin} = useAuth();
    const [createNote, {isLoading, isSuccess, isError, error}] =
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
            await createNote({userid, title, text, completed});
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
            <form className=" bg-white rounded-lg text-slate-600 flex flex-col w-1/2 overflow-y-auto "
            >


                <div className="p-5 flex flex-col gap-4">
                    <h2 className="text-lg font-semibold">New Task</h2>
                    <div className="flex flex-col gap-8 ">
                        <label htmlFor="title"><p className="text-sm font-semibold">Title</p></label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={title}
                            onChange={onTitleChange}
                            className="border border-slate-200 rounded-full w-1/2 py-2 px-4 text-sm  text-slate-500  leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="note-text">
                            <p className="text-sm font-semibold">Text</p>
                        </label>
                        <textarea
                            id="note-text"
                            name="note-text"
                            value={text}
                            onChange={onTextChange}
                            className="border border-slate-200 rounded w-1/2 py-2 px-4 text-sm text-slate-500 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            rows={10}
                            cols={20}></textarea>
                    </div>
                    <div className="flex  gap-2">


                        <label htmlFor="completed-status">
                            <p className="text-sm font-semibold">Completed :</p></label>
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
                    {isManager ||
                        (isAdmin && (
                            <div className="my-5">
                                <p className="text-sm font-semibold">This note goes to which user ? </p>
                                <div className="text-lg">
                                    <select onChange={onUserOptionChange}>{options}</select>
                                </div>
                            </div>
                        ))}
                    <div>
                        <p className="text-sm font-semibold">Current user: {username} </p>

                    </div>
                </div>

                <div className="bg-gray-200 rounded-t-lg flex justify-between p-5">


                    <button
                        title="Save"
                        onClick={onSaveNoteClicked}
                        disabled={!canSave}
                        className={
                            canSave ? "flex bg-teal rounded-lg w-1/2 text-white py-3  items-center justify-center text-lg  ease-in-out hover:bg-teal/80 transition-all duration-300 "
                                : "flex bg-teal/20 rounded-lg w-1/2 text-white py-3  items-center justify-center text-lg  ease-in-out  "
                        }
                    >
                        Create
                    </button>
                </div>
            </form>
        </>
    );

    return content;
};
export default NewNoteForm;
