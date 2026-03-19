import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackAndTitle from "../../Components/BackAndTitle.jsx"
import { useSelector } from "react-redux"

const option_config = [
  {
    title: "Book Manage",
    path:"/admin/pdf-book",
  },
  {
    title: "Assessment Manager",
    path:"/admin/exams",
  },
  {
    title: "Video Manager",
    path:"/video-manager",
  },
  {
    title: "Users",
    path:"/users",
  },
  {
    title: "Slider Manager",
    path:"/admin/slider-manage",
  },
]


export default function AdminDashboard() {
  const API = import.meta.env.VITE_API_URL

  const account = useSelector( e=> e.auth.account )


  async function ChangeAdminImage(e){
    if(e.target.files.length===0) return
    const formData = new FormData()
    formData.append("file",e.target.files[0])
    try{
      const payload = {
        method: "POST",
        body: formData
      }
      await fetch(API+"/admin/avatar",payload)
    }catch(err){
      console.log(err)
    }
  }
  

  return (
    <div className="pt-16 pb-24 px-4">
      <BackAndTitle path="/" title="Admin Panel" />
      <div className="flex flex-col text-center md:flex-row md:text-start items-center gap-8 p-5 rounded-2xl shadow-xl">
           <div className="h-[200px] w-[200px] rounded-full overflow-hidden relative">
            <img className="w-full h-full object-cover" src={account?.avatar} alt="loading.." />
            <label htmlFor="admin-img"><i className="absolute bottom-2 right-1/2 translate-x-1/2 fa-solid fa-pen-to-square"></i></label>
            <input onChange={ChangeAdminImage} className="absolute h-0 w-0 opacity-0" id="admin-img" type="file" />
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