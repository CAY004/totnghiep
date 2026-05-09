import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';
import Logo from '../Logo';
import { motion } from 'framer-motion';

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    return (
        <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex gap-5 glass border-b border-gray-700/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30"
        >
            <button
                className="block lg:hidden text-gray-200"
                onClick={() => {
                    setOpenSideMenu(!openSideMenu);
                }}
            >
                {openSideMenu ? (
                    <HiOutlineX className="text-2xl" />
                ) : (
                    <HiOutlineMenu className="text-2xl" />
                )}
            </button>

            <Logo className="hidden lg:flex" />

            <h2 className="text-lg font-medium text-gray-200 lg:hidden">Finova AI</h2>

            {openSideMenu && (
                <div className="fixed top-[61px] -ml-4 glass">
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </motion.div>
    )
}

export default Navbar