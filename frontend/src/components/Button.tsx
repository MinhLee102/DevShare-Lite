// Declare a client component
'use client'

import React from "react"

interface CustomButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button = ({children, className, ...props}: CustomButton) => {
    return (
         <button
      {...props}
      className={`
        w-full py-3 px-4 bg-blue-400 text-white font-bold rounded-full 
        hover:bg-blue-500 focus:outline-none focus:ring-2 
        focus:ring-offset-2 focus:ring-blue-500 transition-colors
        ${className} 
      `}
    >
      {children}
    </button>
    );
};

export default Button;