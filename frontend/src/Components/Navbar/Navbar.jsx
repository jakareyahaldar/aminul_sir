import { useState } from 'react';
import Sidebar from "./Sidebar.jsx"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  
  const Navigate = useNavigate()
  const [sidebar,setSidebar] = useState(false)
  
  function onMenuClick(){
    setSidebar(!sidebar)
  }
  
  return (
    <>
      {sidebar && <Sidebar close={onMenuClick} />}
      <header className="fixed top-0 left-0 w-full z-20 bg-gradient-to-r from-[#14b8a6] to-[#0d9488] px-4 py-3 flex items-center justify-between shadow-md">
      {/* Left: Menu & Brand */}
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="text-white focus:outline-none">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="3" y1="7" x2="21" y2="7"></line>
            <line x1="3" y1="12" x2="16" y2="12"></line>
            <line x1="3" y1="17" x2="10" y2="17"></line>
          </svg>
        </button>
        
        <div className="flex flex-col">
          <h1 className="text-white text-2xl font-black leading-none tracking-tight">BTSC</h1>
          <p className="text-white text-[9px] font-bold uppercase tracking-widest opacity-90">
            Technical Training Center
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button className="text-white p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
          </svg>
        </button>
        
        <button onClick={()=>Navigate("/admin")} className="bg-white/20 p-2 rounded-xl border border-white/10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>
      </div>
    </header>
    </>
  );
};

export default Navbar;