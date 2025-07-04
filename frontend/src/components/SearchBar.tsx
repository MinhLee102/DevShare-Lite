'use client';

import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import Picture from "./Picture";

const SearchBar = () => {
    const [query, setQuery] = useState('');

    return (
        <form className="w-full bg-white p-2 border-2 border-[#00C7B6] rounded-full shadow-sm flex items-center">
            <InputField 
                id= "search" name= "search" type= "text" required= {false} value={query} 
                onChange={(e) => setQuery(e.target.value)} placeholder= "Search DevShare"
                className="w-full bg-transparent px-4 py-2 text-gray-900 focus:outline-none"/>
            <Button 
                type="submit"
                className="w-auto p-2 flex items-center justify-center"
                bgColor="bg-transparent"
                textColor="text-gray-500"
                hoverBgColor="hover:text-cyan-500" >
                    <Picture url="/search.png" width={24} height={24} alt="search" />
            </Button>
        </form>
    );
};

export default SearchBar