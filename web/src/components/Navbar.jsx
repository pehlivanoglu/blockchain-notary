import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { nid, fullName, phoneNumber , logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/home" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
              <span className="font-bold text-xl">Blockchain Notary</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <span className="text-gray-700 mr-2">{fullName}</span>
              <span className="text-gray-500">({nid})</span>
            </div>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;