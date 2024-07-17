import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import motion from "framer-motion"
const Welcome = () => {
    const {username, isManager, isAdmin} = useAuth();

    const date = new Date();
    const today = new Intl.DateTimeFormat("en-US", {
        dateStyle: "full",
        timeStyle: "long",
    }).format(date);

    const content = (
        <motion.section 
        initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}
        className="h-full  bg-main-bg flex flex-col items-center  justify-center  text-slate-600 flex-1 gap-4">
            <div className="text-center bg-white p-20 rounded-lg shadow-lg">
                <p>{today}</p>
                <h1>Welcome {username}!</h1>
            </div>


        </motion.section>
    );

    return content;
};
export default Welcome;
