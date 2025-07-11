'use client'

import Picture from "./Picture";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Button from "./Button";

const Header = () => {
    const {user, logout,loading} = useAuth();

    return (
    <header className="sticky top-0 z-50 bg-[#d9d9d9] border-b border-[#000000] shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        
        <Link href="/" className="flex items-center space-x-3 cursor-pointer">
            <Picture url="/logo.png" width={40} height={40} alt="DevShare Lite Logo" />
            <span className="text-2xl font-bold text-[#000000]">DevShare Lite</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="h-8 w-32 bg-gray-400 rounded animate-pulse"></div>
          ) : user ? (
            <>
              <span className="font-semibold text-black">Welcome, {user.username}!</span>
              <Button 
                onClick={logout} 
                className="w-auto px-4 py-2 text-sm"
                bgColor="bg-red-600" 
                hoverBgColor="hover:bg-red-700"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="font-semibold text-black hover:text-gray-700">
                Log In
              </Link>
              <Link href="/signup" >
                    <Button 
                        className="w-auto px-4 py-2 text-sm"
                        bgColor="bg-blue-600"
                        hoverBgColor="hover:bg-blue-700"
                    > Sign Up </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;