import {useGetNotesQuery} from "./notesApiSlice";
import Note from "./Note";
import useAuth from "../../hooks/useAuth";
import {IoIosSearch} from "react-icons/io";
import {useEffect, useState} from "react";

const NotesList = () => {
    const {username, isManager, isAdmin} = useAuth();
    const [searchUser, setSearchUser] = useState("");
    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetNotesQuery("notesList", {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    let content;

    if (isLoading) content = <>Loading....</>;

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>;
    }

    if (isSuccess) {
        const onSearchChange = (e) => setSearchUser(e.target.value);
        const {ids, entities} = notes;

        let filteredIds;
        if (isManager || isAdmin) {
            filteredIds = [...ids];
        } else {
            filteredIds = ids.filter(
                (noteId) => entities[noteId].username === username,
            );
        }

        const tableContent =
            ids?.length &&
            filteredIds.map((noteId) => <Note key={noteId} noteId={noteId}/>);

        const filteredUser =
            ids.length &&
            searchUser &&
            ids
                .filter((noteId) =>
                    entities[noteId].username
                        .toUpperCase()
                        .includes(searchUser.toUpperCase()),
                )
                .map((noteId) => <Note key={noteId} noteId={noteId}/>);

        content = (
            <>
                <div className="flex relative items-center text-center">
                    <IoIosSearch
                        className="text-grey-blue h-full ml-3 absolute"
                        size={20}
                    />

                    <input
                        className=" rounded w-2/6 pl-14 py-2 text-grey-blue text-sm leading-4 font-normal focus:outline-none focus:shadow-outline"
                        type="text"
                        name="search"
                        placeholder={"search by user"}
                        onChange={onSearchChange}
                        value={searchUser}
                    />
                </div>

                <table
                    className="flex-1 bg-white font-medium  text-slate-400  text-left rounded-lg mt-8 w-full  ">
                    <thead className="">
                    <tr className="flex justify-between w-full p-5 bg-teal text-white rounded-t-lg text-center ">
                        <th className="flex-1">Status</th>
                        <th className="flex-1"> Created</th>
                        <th className="flex-1">Updated</th>
                        <th className="flex-1">Title</th>
                        <th className="flex-1">Owner</th>
                        <th className="flex-1">Edit</th>
                    </tr>
                    </thead>
                    <tbody>{searchUser ? filteredUser : tableContent}</tbody>
                </table>
            </>
        );
    }

    return content;
};
export default NotesList;
