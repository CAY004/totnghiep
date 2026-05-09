import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
import Logo from "../Logo";
import { motion } from "framer-motion";

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);
    const fullName = user?.firstName + " " + user?.lastName;

    const navigate = useNavigate();
    const handleClick = (route) => {
        if (route === 'logout') {
            handleLogout();
            return;
        }

        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate('/login');
    };

    return (
        <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-64 h-[calc(100vh-61px)] glass border-r border-gray-700/50 p-5 sticky top-[61px] z-20"
        >
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                <Logo className="mb-4" />
                {user?.profileImageUrl ? (
                    <img
                        src={user?.profileImageUrl || ""}
                        alt="Profile Image"
                        className="w-20 h-20 bg-slate-600 rounded-full border-2 border-primary"
                    />
                ) : (
                    <CharAvatar
                        fullName={fullName}
                        width="w-20"
                        height="h-20"
                        style="text-xl"
                    />
                )}

                <h5 className="text-gray-200 font-medium leading-6">
                    {fullName || ""}
                </h5>
            </div>

            {SIDE_MENU_DATA.map((item, index) => (
                <motion.button
                    key={`menu_${index}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full flex items-center gap-4 text-[15px] ${
                        activeMenu == item.label
                            ? "text-white bg-primary shadow-lg"
                            : "text-gray-300 hover:text-accent hover:bg-slate-800/50"
                    } py-3 px-6 rounded-lg mb-3 transition-all duration-200`}
                    onClick={() => handleClick(item.path)}
                >
                    <item.icon className="text-xl" />
                    {item.label}
                </motion.button>
            ))}
        </motion.div>
    );
};

export default SideMenu;