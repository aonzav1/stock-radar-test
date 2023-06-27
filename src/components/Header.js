import React from 'react';
import { Link } from 'react-router-dom';
import { FaList, FaUser } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="bg-slate-700 text-white py-4 px-8">
            <div className="flex justify-between items-center">
                <Link to="/"><h1 className="text-xl font-bold">Stock Radars's Test</h1></Link>
                <div className="flex">
                    <Link to="/companies">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium  mr-4 rounded">
                            <div className="hidden sm:block py-2 px-4">Display Data</div>
                            <div className="block sm:hidden p-4"><FaList/></div>
                        </button>
                    </Link>
                    <Link to="/form">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-medium  rounded">
                        <div className="hidden sm:block py-2 px-4">Register</div>
                        <div className="block sm:hidden p-4"><FaUser/></div>
                    </button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
