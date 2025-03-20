import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { path: '/home/new-transaction', label: 'Create New Transaction' },
    { path: '/home/sent-transactions', label: 'Sent & Pending Transactions' },
    { path: '/home/received-transactions', label: 'Received & Pending Transactions' },
    { path: '/home/all-transactions', label: 'All Transactions' },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `block px-4 py-2 rounded-md mb-2 ${
              isActive
                ? 'bg-blue-600'
                : 'hover:bg-gray-700'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;