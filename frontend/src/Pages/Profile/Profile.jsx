import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate, Navigate } from "react-router-dom"

export default function UserProfileEdit() {
  const navigate = useNavigate()
  const lcl = window.localStorage.getItem("user_data")
  const {_id} = lcl ? JSON.parse(lcl) : {}
  
  
  if(!_id) return <Navigate to="/admin" />
  
  
  const { account } = useSelector(e=>e.auth)
  
  const API = import.meta.env.VITE_API_URL
  const fileRef = useRef(null);
  const [preview, setPreview] = useState("https://via.placeholder.com/100");
  const [user,setUser] = useState({
    name: "",
    phone: "",
    username: "",
    password: "",
    avatar: ""
  })
  
  useEffect(()=>{
    setUser(account)
  },[account])

  const handleImageClick = () => {
    fileRef.current.click();
  };
  
  function OnChangeEvent(e){
    const { name, value } = e.target
    setUser({...user, [name]:value})
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try{
        const formData = new FormData()
        formData.append("file",file)
        formData.append("_id",_id)
        const payload = {
          method: "POST",
          body: formData
        }
        const req = await fetch(API+"/users/avatar",payload)
        const res = await req.json()
        if(req.ok){
          setUser({...user,avatar:res.data})
        }else{
          alert("Faild.")
        }
      }catch(err){
        console.log(err)
      }
    }
  };
  
  async function SaveChanges(){
    if(!window.confirm("Are You Sure ?")) return
    try{
      const payload = {
        method: "PUT",
        headers: { "content-type":"application/json" },
        body: JSON.stringify(user)
      }
      const req = await fetch(API+"/users",payload)
      const res = await req.json()
      if(req.ok){
        alert("ok")
        // update
      }else{
        alert("Faild")
      }
    }catch({message}){
      console.log(message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-4">
      
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        
        {/* Back Button */}
        <button onClick={()=>navigate("/")} className="flex items-center gap-2 text-gray-600 hover:text-black mb-6">
          <span className="text-lg">←</span>
          Back
        </button>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={user.avatar}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border cursor-pointer"
            onClick={handleImageClick}
          />

          <button
            onClick={handleImageClick}
            className="mt-3 text-sm text-blue-500 hover:underline"
          >
            Change Photo
          </button>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </div>

        {/* Form */}
        <div className="space-y-4">
          
          <div>
            <label className="block text-sm mb-1 text-gray-600">
              Full Name
            </label>
            <input
              value={user.name}
              onChange={OnChangeEvent}
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">
              Username
            </label>
            <input
              value={user.username}
              onChange={OnChangeEvent}
              type="text"
              name="username"
              placeholder="Enter username"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">
              Phone Number
            </label>
            <input
              value={user.phone}
              onChange={OnChangeEvent}
              type="text"
              name="phone"
              placeholder="Enter phone number"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600">
              Password
            </label>
            <input
              value={user.password}
              onChange={OnChangeEvent}
              type="password"
              name="password"
              placeholder="Enter new password"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button onClick={SaveChanges} className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
}