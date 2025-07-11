'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Picture from "./Picture";

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const router = useRouter();

     const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        
        if (!query.trim()) {
            return;
        }
        router.push(`/search?q=${encodeURIComponent(query)}`);
    };

    return (
        <form onSubmit={handleSearch} className="w-full bg-white p-2 border-2 border-[#00C7B6] rounded-full shadow-sm flex items-center">
            <input
                id= "search" name= "search" type= "text" value={query} 
                onChange={(e) => setQuery(e.target.value)} placeholder= "Search DevShare"
                className="flex-grow bg-transparent px-4 py-1 text-gray-900 focus:outline-none focus:ring-0 border-none"/>
            <button
                type="submit" className="w-auto p-2 flex-shrink-0 text-gray-500 hover:text-cyan-500 transition-colors rounded-full">
                    <Picture url="/search.png" width={20} height={20} alt="search" />
            </button>
        </form>
    );
};

export default SearchBar