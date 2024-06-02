import { useGetUsersQuery } from "./usersApiSlice.js";
import User from "./User.jsx";
import PulseLoader from "react-spinners/PulseLoader";
import useAuth from "../../hooks/useAuth.js";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  let content;
  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) {
    content = <p className="errmsg">{error.error}</p>;
  }

  if (isSuccess) {
    const { ids } = users;

    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;

    content = (
      <table className="grid grid-cols-1 border font-medium  text-slate-400   text-left rounded-lg ">
        <thead>
          <tr className="flex justify-between w-full p-5 bg-gray-200 rounded-lg text-center ">
            <th className="flex-1">Username</th>
            <th className="flex-1">Roles</th>
            <th className="flex-1">Edit</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default UsersList;
