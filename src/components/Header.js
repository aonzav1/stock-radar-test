import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gray-800 text-white py-4 px-8">
            <div className="flex justify-between items-center">
                <Link to="/"><h1 className="text-xl font-bold">Stock Radars's Test</h1></Link>
                <div className="flex">
                    <Link to="/companies">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 mr-4 rounded">
                            Display Data
                        </button>
                    </Link>
                    <Link to="/form">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded">
                        Form
                    </button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
