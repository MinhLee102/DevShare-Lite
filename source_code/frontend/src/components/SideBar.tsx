'use client';

import Link from "next/link";
import Picture from "./Picture";
import { useAuth } from "@/context/AuthContext";

const SideBar = () => {
    const { user } = useAuth();

    return (
        <aside className="w-64 h-205 fixed top-22 left-0 bg-white rounded-2xl shadow-lg px-4 py-6 z-50">
                <nav>
                    <ul>
                        <li>
                            <Link href= "/" className= "flex items-center space-x-3 text-lg font-semibold text-black hover:bg-gray-100 p-3 rounded-lg transition-colors">
                                <Picture url= "/home.png" width={24} height={24} alt="Home"/>
                                <span> Home </span>
                            </Link>
                        </li>

                        {/* Conditionally render these links only if a user is logged in. */}
                        {user && (
                         <li>
                            <Link href="/posts/create"className="flex items-center space-x-4 text-lg font-semibold text-black hover:bg-gray-100 p-3 rounded-lg transition-colors">
                                    <Picture url= "/add.png" width={24} height={24} alt= "Create Post" />
                                        <span>Create Post</span>
                            </Link>
                        </li>
                        )}

                        <li>
                            <Link href="/profile" className="flex items-center space-x-4 text-lg font-semibold text-black hover:bg-gray-100 p-3 rounded-lg transition-colors">
                                <Picture url="/profile-user.png" width={24} height={24} alt="My Profile" />
                                <span>My Profile</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
        </aside>
    );
};

export default SideBar;
