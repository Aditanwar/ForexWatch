import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout, user } = useContext(AuthContext);

    const onLogout = () => {
        logout();
    };

    const authLinks = (
        <div className="flex items-center space-x-4">
            <span className="text-gray-300">Hello, {user && user.username}</span>
            <button onClick={onLogout} className="text-gray-300 hover:text-white transition">
                Logout
            </button>
        </div>
    );

    const guestLinks = (
        <div className="flex items-center space-x-4">
            <Link to="/about" className="text-gray-300 hover:text-white transition">About</Link>
            <Link to="/login" className="text-gray-300 hover:text-white transition">Login</Link>
            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">Register</Link>
        </div>
    );

    return (
        <nav className="bg-gray-800 p-4 shadow-md mb-8">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
                    ForexWatch
                </Link>
                {isAuthenticated ? authLinks : guestLinks}
            </div>
        </nav>
    );
};

export default Navbar;
