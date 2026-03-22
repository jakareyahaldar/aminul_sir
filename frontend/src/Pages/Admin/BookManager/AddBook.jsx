import fileTypes from "../../../utilities/fileTypeConfig.js"
import categorys from "../../../utilities/categoryConfig.js"

// import from packages  
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

// Component import 
import BackAndTitle from "../../../Components/BackAndTitle.jsx"


const initialForm = {
    title:"",
    file_url:"",
    file_type:"",
    size:"",
    level:"",
    category:""
  }


export default function AddBook(){
  const API = import.meta.env.VITE_API_URL
  const Navigate = useNavigate()
  
  const { state } = useLocation()
  
  
  const [form,setForm] = useState(initialForm)
  
  
  useEffect(()=>{
    if(state?.data){
      const data = {}
      Object.keys(form).forEach(key => data[key] = state.data[key] )
      setForm({...data,_id:state.data._id})
    }
  },[])
  
  
  function ChangeHandle(e){
    const { name, value } = e.target
    setForm({...form,[name]: value})
  }
  
  async function submitForm(e){
    e.preventDefault()
    try{
      
      // Check Value
      Object.keys(form).forEach((key)=>{
        if( !form[key] ) throw Error(key +" Not found.")
      })
      
      const payload = {
        method: form._id ? "PUT" :"POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form)
      }
      const req = await fetch(API+"/book",payload)
      const res = await req.json()
      
      if(req.ok){
        setForm(initialForm)
        Navigate("/admin/pdf-book")
      }else{
        throw Error(res.message)
      }
    }catch({message}){
      alert(message)
    }
  }
  
  
  
  
  return(
    <div className="py-20 ">
      <BackAndTitle path="/admin/pdf-book" title="Add Book" />
      <form onSubmit={submitForm} className="px-5">
        <div className="grid gap-2 md:grid-cols-3">
          <input onChange={ChangeHandle} value={form.title} className="px-2 py-1 border-[1px] border-black" type="text" name="title" placeholder="Enter title." />
          <input onChange={ChangeHandle} value={form.file_url} className="px-2 py-1 border-[1px] border-black" type="text" name="file_url" placeholder="Enter file url" />
          <input onChange={ChangeHandle} value={form.size} className="px-2 py-1 border-[1px] border-black" type="number" name="size" placeholder="Enter file Size in mb." />
        </div>
        <div className="mt-5 grid grid-cols-2 md:flex gap-2">
          <select onChange={ChangeHandle} name="file_type" className="p-3 rounded-md">
            <option selected={form.file_type===""} >File Type</option>
            {fileTypes.map( type => <option key={type} selected={form.file_type===type} value={type} >{type}</option> )}
          </select>
          <select onChange={ChangeHandle} name="level" className="p-3 rounded-md">
            <option selected={form.level===""} value="" >Level</option>
            <option selected={form.level==="1"} value="1" >Level-1</option>
            <option selected={form.level==="2"} value="2" >Level-2</option>
            <option selected={form.level==="3"} value="3" >Level-3</option>
          </select>
          <select onChange={ChangeHandle} name="category" className="p-3 rounded-md">
            <option selected={form.category===""} value="" >Category</option>
            {categorys.map( c => <option key={c} selected={c===form.category} value={c} >{c}</option> )}
          </select>
        </div>
        <button className="px-5 py-2 bg-red-800 mt-5 rounded-md text-white hover:bg-black">{form._id ? "Update":"Save"}</button>
      </form>
    </div>
    )
}