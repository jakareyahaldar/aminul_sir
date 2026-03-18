import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackAndTitle from "../../Components/BackAndTitle.jsx"


const option_config = [
  {
    title: "Book Manage",
    path:"/admin/pdf-book",
  },
  {
    title: "Practice Question",
    path:"/pdf-manager",
  },
  {
    title: "Users",
    path:"/users",
  },
]


export default function AdminDashboard() {

  return (
    <div className="pt-16 pb-24 px-4">
      <BackAndTitle path="/" title="Admin Panel" />
      <div className="flex flex-col text-center md:flex-row md:text-start items-center gap-8 p-5 rounded-2xl shadow-xl">
           <div className="h-[200px] w-[200px] rounded-full overflow-hidden relative">
            <img className="w-full h-full object-cover" src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="...." />
            <i className="absolute bottom-2 right-1/2 translate-x-1/2 fa-solid fa-pen-to-square"></i>
           </div>
           <div className="text-2xl grid gap-2">
            <p>Aminul Sarder <i className="fa-solid fa-pen-to-square"></i></p>
            <p>admin@admin.com <i className="fa-solid fa-pen-to-square"></i></p>
            <p>pass: ********** <i className="fa-solid fa-pen-to-square"></i></p>
          </div>
      </div>

      <div className="p-5 rounded-2xl shadow-xl grid md:grid-cols-3 gap-5">
          {
            option_config.map((option)=>{
              return <OptionCard title={option.title} path={option.path}  />
            })
          }
      </div>
      
    </div>
  );
}


function OptionCard({path,title}){
  const Navigate = useNavigate()
  return(
    <div onClick={()=>Navigate(path)} className="px-10 py-5 bg-gradient-to-r from-amber-300 to-indigo-600 shadow-2xl rounded-2xl">
      <p className="text-xl font-bold text-center">{title}</p>
    </div>
  )
}