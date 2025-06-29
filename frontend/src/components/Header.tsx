import Picture from "./Picture";

const Header = () => {
    return (
         <header className="bg-[#d9d9d9] border-b border-[#000000] shadow-sm">
            <div className="container mx-auto px-4 py-3 flex items-center space-x-3">
                <Picture url="/logo.png" width={40} height={40} alt="DevShare Lite Logo" />
                <span className="text-2xl font-bold text-[#000000]">DevShare Lite</span>
            </div>
        </header>
    );
};

export default Header;