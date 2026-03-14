import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuOption = ({ label, icon, path }) => (
  <NavLink 
    to={path} 
    className={({ isActive }) => `
      flex items-center gap-4 px-6 py-3 transition-colors
      ${isActive ? 'bg-teal-50 text-teal-600' : 'text-slate-700 hover:bg-gray-50'}
    `}
  >
    <span className="text-slate-400 w-6 h-6 flex items-center justify-center">
      {icon}
    </span>
    <span className="text-base font-medium">{label}</span>
  </NavLink>
);

export default MenuOption;