import Picture from "./Picture";

const Header = () => {
    return (
         <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex items-center space-x-3">
                {/* Đường dẫn đến logo trong thư mục /public */}
                <Picture url="/devshare-logo.png" width={40} height={40} alt="DevShare Lite Logo" />
                <span className="text-2xl font-bold text-gray-800">DevShare Lite</span>
            </div>
        </header>
    );
};

export default Header