import {useEffect, useState} from "react";
import {
    useDeleteNoteMutation,
    useUpdateNoteMutation,
} from "./notesApiSlice.js";
import {useNavigate, useParams} from "react-router-dom";
import {CiSaveUp1, CiTrash} from "react-icons/ci";
import useAuth from "../../hooks/useAuth.js";
import {clsx} from "clsx";

const EditNoteForm = ({note}) => {
    const {isManager, isAdmin} = useAuth();

    const [updateNote, {isLoading, isSuccess, isError, error}] =
        useUpdateNoteMutation();

    const [
        deleteNote,
        {isSuccess: isDelSuccess, isError: isDelError, error: delerror},
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
        await updateNote({id: note.id, title, text, completed});
    };

    const onDeleteNoteClicked = async () => {
        await deleteNote({id: note.id, userId: note.user});
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
                className=" bg-white rounded-lg text-slate-600 flex flex-col w-1/2 overflow-y-auto "
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="p-5 flex flex-col gap-8">

                    <h2 className="text-lg font-semibold">Edit task</h2>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="title"><p className="text-sm font-semibold">User</p></label>
                        <input
                            className="border border-slate-200  w-1/2  py-2 px-4 text-sm text-slate-500 rounded-full leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            name="title"
                            type="text"
                            value={note.username}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="title">
                            <p className="text-sm font-semibold">Title</p></label>
                        <input
                            className="border border-slate-200 rounded-full w-1/2 py-2 px-4 text-sm  text-slate-500  leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            name="title"
                            type="text"
                            value={title}
                            onChange={onTitleChange}
                        />
                    </div>

                    <div className="flex  flex-col gap-2 w-full">
                        <label htmlFor="note-text ">
                            <p className="text-sm font-semibold">Text</p>
                        </label>
                        <textarea
                            className="border border-slate-200 rounded w-1/2 py-2 px-4 text-sm text-slate-500 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="note-text"
                            name="note-text"
                            value={text}
                            onChange={onTextChange}
                            rows={10}
                            cols={20}
                        ></textarea>
                    </div>
                    <div className="flex flex-col gap-4">
                        <label>
                            <p className="text-sm font-semibold">
                                Status : {completed ? "Completed" : "Open"}
                            </p>
                        </label>
                        <div className="flex gap-2">
                            <label htmlFor="completed-status"><p className="text-sm font-semibold">
                                Completed :
                            </p></label>
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
                <div className="bg-gray-100 rounded-lg flex justify-between p-5">

                    <div className="flex gap-8 w-full">
                        <button
                            title="Save"
                            onClick={onSaveNoteClicked}
                            disabled={!canSave}
                            className="flex bg-teal rounded-lg w-1/2 text-white py-3  items-center justify-center text-lg transition-all duration-200 ease-in-out hover:bg-teal/80"
                        >
                            Save

                        </button>

                        {isManager ||
                            (isAdmin && (
                                <button title="Delete" onClick={onDeleteNoteClicked}
                                        className="flex bg-teal rounded-lg w-1/2 text-white py-3   items-center justify-center text-lg transition-all duration-200 ease-in-out hover:bg-red-400">
                                    Delete
                                </button>
                            ))}
                    </div>
                </div>

            </form>
        </>
    );

    return content;
};
export default EditNoteForm;
