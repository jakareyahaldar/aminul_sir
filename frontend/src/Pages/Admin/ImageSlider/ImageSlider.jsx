import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import BackAndTitle from "../../../Components/BackAndTitle.jsx"
import { addSlide, removeSlide } from "../../../feature/slider/sliderSlice.js"

export default function SliderManager() {
  const API = import.meta.env.VITE_API_URL
  const dispatch = useDispatch()
  
  const { sliders } = useSelector( e=> e.slider )
  
  const [loading,setLoading] = useState(false)
  const [loading2,setLoading2] = useState(false)

  const [form, setForm] = useState({
    image: "",
    text: "",
  });

  const [editId, setEditId] = useState(null);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    try{
      setLoading(true)
      const payload = {
        method: "POST",
        body: formData
      }
      
      const req = await fetch(API+"/slider",payload)
      const res = await req.json()
      setLoading(false)
      if(req.ok){
        dispatch(addSlide(res.data))
      }else{
        throw Error("Add Faild")
      }
      
    }catch(err){
      alert(err.message)
    }
    
    
  };

  // Delete
  const handleDelete = async (id) => {
    try{
      setLoading2(true)
      const payload ={
        method:"delete",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({_id:id})
      }
      const req = await fetch(API+"/slider",payload)
      const res = await req.json()
      setLoading2(false)
      if(req.ok){
        dispatch(removeSlide({id}))
      }else{
        alert("faild")
      }
    }catch({message}){
      alert(message)
    }
  };

  return (
    <div className="py-20 p-4 max-w-5xl mx-auto">
      <BackAndTitle path="/admin" title="Slider Manager"  />
      {loading2 && <p>Deleting a slider.</p>}
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-3 md:grid-cols-3 mb-6"
      >
        <input
          type="file"
          name="file"
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="text"
          placeholder="Text"
          value={form.text}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2"
        >
          {loading ? "loading" : "Add"}
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Text</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sliders.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="p-2 border">
                  <img
                    src={item.image}
                    alt=""
                    className="w-16 h-16 object-cover mx-auto rounded"
                  />
                </td>

                <td className="p-2 border">{item.text}</td>

                <td className="p-2 border space-x-2">

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}