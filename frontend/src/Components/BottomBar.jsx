import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav = () => {
  // Navigation data with custom SVG paths
  const navItems = [
    { 
      name: 'হোম', 
      path: '/', 
      icon: <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> 
    },
    { 
      name: 'PDF বই', 
      path: '/pdf-books', 
      icon: <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /> 
    },
    { 
      name: 'নিউজ পোর্টাল', 
      path: '/news', 
      isCenter: true,
      icon: <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /> 
    },
    { 
      name: 'ভিডিও', 
      path: '/videos', 
      icon: <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /> 
    },
    { 
      name: 'অ্যাসেসমেন্ট', 
      path: '/assessment', 
      icon: <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /> 
    },
  ];

  return (
    <nav className="z-10 fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-1 pb-2 pt-1 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <ul className="flex justify-around items-end max-w-lg mx-auto">
        {navItems.map((item) => (
          <li key={item.path} className="flex-1 text-center">
            <NavLink
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center justify-center transition-all duration-300
                ${item.isCenter ? '-translate-y-6' : ''}
                ${isActive ? 'text-teal-600' : 'text-slate-500'}
              `}
            >
              {item.isCenter ? (
                // Center "News" Floating Button
                <div className="flex flex-col items-center">
                  <div className="bg-slate-700 text-white p-3.5 rounded-full shadow-lg border-[6px] border-white">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
                      {item.icon}
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold mt-1 text-slate-700 uppercase tracking-tight">
                    {item.name}
                  </span>
                </div>
              ) : (
                // Standard Icons
                <>
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 mb-1">
                    {item.icon}
                  </svg>
                  <span className="text-[10px] font-medium leading-tight">
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;