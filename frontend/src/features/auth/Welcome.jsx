import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";

const Welcome = () => {
    const {username, isManager, isAdmin} = useAuth();

    const date = new Date();
    const today = new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
        timeStyle: "long",
    }).format(date);

    const content = (
        <section className="h-full  bg-main-bg flex flex-col items-center  justify-center  text-slate-600 flex-1 gap-4">
            <div className="text-center bg-white p-20 rounded-lg shadow-lg">
                <p>{today}</p>
                <h1>Welcome {username}!</h1>
            </div>


        </section>
    );

    return content;
};
export default Welcome;
