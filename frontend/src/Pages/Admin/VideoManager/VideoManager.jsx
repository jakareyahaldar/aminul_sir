import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { addVideo, removeVideo, updateVideo } from "../../../feature/videos/videoSlice.js"


const emptyForm = {
    title: "",
    url: "",
    type: "ALL",
    category: "Computer Operation",
  }


export default function VideoManager() {
  const API = import.meta.env.VITE_API_URL
  const dispatch = useDispatch()
  
  const { videos } = useSelector(e=>e.videos)
  const [loading,setLoading] = useState(false)
  
  const [form, setForm] = useState(emptyForm);

  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.url) {
      alert("Title & URL required");
      return;
    }

    const payload = {
      method: form._id ? "PUT":"POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(form)
    }
    
    try{
      setLoading(true)
      const req = await fetch(API+"/video",payload)
      const res = await req.json()
      setLoading(false)
      if(req.ok){
        if(form._id){
          dispatch(updateVideo(res.data))
        }else{
          dispatch(addVideo(res.data))
        }
      }else{
        alert(res.message)
      }
    }catch({message}){
      console.log(message)
    }
    
    
    setEditId(null);
    setShowModal(false);
    setForm(emptyForm)
  };

  const handleEdit = (video) => {
    setForm(video);
    setEditId(video._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this video?")) {
      try{
        const payload = {
          method: "delete",
          headers: {"content-type":"application/json"},
          body: JSON.stringify({_id:id})
        }
        const req = await fetch(API+"/video",payload)
        const res = await req.json()
        if(req.ok){
          // remove from redux
          dispatch(removeVideo({id}))
        }
      }catch(err){
        console.log(err)
      }
    }
  };

  // 🔥 autoplay OFF preview (controls hide + pointer disable)
  const getPreviewUrl = (url) => {
    return `${url}?controls=0&modestbranding=1&rel=0`;
  };

  return (
    <div className="py-20 p-4">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Video Manager</h2>
        <button
          onClick={() => {
            setShowModal(true);
            setEditId(null);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Video
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Preview</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {videos.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No Videos Found
                </td>
              </tr>
            ) : (
              videos.map((v, i) => (
                <tr key={Date.now()+Date.now()} className="text-center">
                  <td className="border p-2">{i + 1}</td>

                  {/* iframe preview (non-clickable) */}
                  <td className="border p-2">
                    <div className="w-32 h-20 mx-auto pointer-events-none">
                      <iframe
                        src={getPreviewUrl(v.url)}
                        className="w-full h-full rounded"
                        title="preview"
                      />
                    </div>
                  </td>

                  <td className="border p-2">{v.title}</td>
                  <td className="border p-2">{v.type}</td>
                  <td className="border p-2">{v.category}</td>

                  <td className="border p-2 space-x-1">
                    <button
                      onClick={() => handleEdit(v)}
                      className="bg-yellow-400 px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(v._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-4 rounded w-96">
            <h3 className="text-lg font-bold mb-3">
              {editId ? "Edit Video" : "Add Video"}
            </h3>

            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            />

            <input
              name="url"
              placeholder="Embed URL"
              value={form.url}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            />

            {/* Type Select */}
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            >
              <option>ALL</option>
              <option>MS WORD</option>
              <option>MS EXCEL</option>
              <option>MS POWERPOINT</option>
              <option>ONLINE RESORCES</option>
            </select>

            {/* Category Select */}
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-2 mb-2"
            >
              <option>Computer Operation</option>
              <option>IT Support</option>
            </select>

            <div className="flex justify-between mt-3">
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}