import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { addNotice, removeNotice, updateNotice } from "../../../feature/notice/noticeSlice.js"

const emptyForm = {
    title: "",
    description: "",
    category: "job",
  }

export default function NoticeManager() {
  const API = import.meta.env.VITE_API_URL
  const dispatch = useDispatch()
  
  const { notices } = useSelector(e=>e.notice)
  
  
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  // Filter + Search
  const filtered = notices.filter((n) => {
    const matchCategory = filter === "all" ? true : n.category === filter;
    const matchSearch = n.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Handle Submit (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      return setError("সব ফিল্ড পূরণ করুন");
    }

    setError("");

    const payload = {
      method: form._id ? "PUT":"POST",
      headers: {"content-type":"application/json"},
      body: JSON.stringify(form)
    }
    
    try{
      const req = await fetch(API+"/notice",payload)
      const res = await req.json()
      if(req.ok){
        if(form._id){
          dispatch(updateNotice(form))
        }else{
          dispatch(addNotice(res.notice))
        }
      }else{
        throw Error(res.message)
      }
    }catch(err){
      setError(err.message)
    }

    setForm({ title: "", description: "", category: "job" });
  };

  // Delete
  const handleDelete = async (id) => {
    if (confirm("Are you sure?")) {
      setError("")
      try{
        const payload = {
          method: "DELETE",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({_id:id})
        }
        const req = await fetch(API+"/notice",payload)
        const res = await req.json()
        if(req.ok){
          dispatch(removeNotice({id}))
        }else{
          throw Error(res.message)
        }
      }catch(err){
        setError(err.message)
      }
    }
  };

  // Edit
  const handleEdit = (notice) => {
    setForm(notice);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">⚙️ Notice Manager</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6"
      >
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          type="text"
          placeholder="Description"
          className="border p-2 rounded"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <select
          className="border p-2 rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="job">চাকরি</option>
          <option value="general">সাধারণ</option>
        </select>

        <button className="bg-blue-600 text-white p-2 rounded md:col-span-3">
          {form._id ? "Update Notice" : "Add Notice"}
        </button>
      </form>

      {/* Error */}
      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded w-full md:w-48"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="job">চাকরি</option>
          <option value="general">সাধারণ</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Time</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((n) => (
                <tr key={n.id}>
                  <td className="p-2 border">{n.title}</td>
                  <td className="p-2 border">{n.description?.slice(0,50)+"..."}</td>
                  <td className="p-2 border">
                    {n.category === "job" ? "চাকরি" : "সাধারণ"}
                  </td>
                  <td className="p-2 border">{n.time}</td>
                  <td className="p-2 border flex gap-2">
                    <button
                      onClick={() => handleEdit(n)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(n._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-4 text-gray-500"
                >
                  No notices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
