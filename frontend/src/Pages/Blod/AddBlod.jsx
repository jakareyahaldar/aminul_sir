import BackAndTitle from "../../Components/BackAndTitle.jsx"
import { useState, useEffect } from "react"
import Load from "../../Components/Loading1.jsx"
import { useSelector, useDispatch } from "react-redux"
import { addBlodDonar, updateBlodDonar } from "../../feature/blod/blodSlice.js"

const empty = {
    name: "",
    address: "",
    phone: "",
    group: "A+"
  }

export default function AddBlod() {
  const API = import.meta.env.VITE_API_URL
  const dispatch = useDispatch()
  
  const admin_ls = window.localStorage.getItem("admntkn")
  const user_ls = window.localStorage.getItem("user_data")
  const adminData = admin_ls ? JSON.parse(admin_ls) : null
  const userData = user_ls ? JSON.parse(user_ls) : null
  
  const uid = adminData?._id || userData?._id
  
  const {blods} = useSelector(e=>e.blod)
  
  const [ form, setForm ] = useState(empty)
  const [loading, setLoading] = useState(false)
  
  useEffect(()=>{
    if(!blods.length) return
    const f = blods.find(b=>b.donar_id === uid)
    if(f) setForm(f)
  },[blods])
  console.log(form)
  
  function ChangeEvent(e){
    const { name, value } = e.target
    setForm({...form, [name]: value})
  }
  
  async function SubmitForm(){
    if(!window.confirm("Are You Sure!")) return
    try{
      setLoading(true)
      const payload = {
        method: form._id ? "PUT":"POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, donar_id: uid })
      }
      const req = await fetch(API+"/blod",payload)
      const res = await req.json()
      setLoading(false)
      if(req.ok){
        if(form._id){
          dispatch(updateBlodDonar(res.data))
        }else{
          dispatch(addBlodDonar(res.data))
        }
      }else{
        alert(res.message)
      }
    }catch(err){
      console.log(err)
    }
  }

  return(
    <div className="p-4 py-20">
      <Load on={loading} />
      <BackAndTitle path="/blod" title="Add Blod Donar" />
      <div className="grid md:grid-cols-3 gap-3">
        <div>
          <label>Name</label>
          <input onChange={ChangeEvent} value={form.name} className="px-2 py-1 border-[1px] border-black block w-full" type="text" name="name" />
      </div>
      <div>
        <label>Address</label>
        <input onChange={ChangeEvent} value={form.address} className="px-2 py-1 border-[1px] border-black block w-full" type="text" name="address" />
    </div>
    <div>
      <label>Phone</label>
      <input onChange={ChangeEvent} value={form.phone} className="px-2 py-1 border-[1px] border-black block w-full" type="text" name="phone" />
  </div>
  <div>
    <label>Group</label>
    <select onChange={ChangeEvent} value={form.group} className="px-2 py-1 border-[1px] border-black block w-full" name="group">
      {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(g => (
        <option key={g}>{g}</option>
      ))}
    </select>
  </div>
</div>
<button onClick={SubmitForm} className="m-4 px-5 py-2 rounded-md bg-blue-700 text-white">{form._id ? "Update":"Save"}</button>
</div>
)
}