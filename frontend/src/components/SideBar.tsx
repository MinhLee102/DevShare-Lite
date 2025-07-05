import Link from "next/link";
import Picture from "./Picture";

const SideBar = () => {
    return (
        <aside className="w-64 h-screen fixed top-22 left-0 bg-white rounded-2xl shadow-lg px-4 py-6 z-50">
                <nav>
                    <ul>
                        <li>
                            <Link href= "/" className= "flex items-center space-x-3 text-lg font-semibold text-black hover:bg-gray-100 p-3 rounded-lg transition-colors">
                                <Picture url= "/home.png" width={24} height={24} alt="Home"/>
                                <span> Home </span>
                            </Link>
                        </li>
                    </ul>
                </nav>
        </aside>
    );
};

export default SideBar;
