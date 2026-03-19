import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { addExam, removeExam, updateExam } from "../../../feature/exams/examSlice.js"
import BackAndTitle from "../../../Components/BackAndTitle.jsx"

const emptyForm = { title: "", path: "" }

const ExamManager = () => {
  const API = import.meta.env.VITE_API_URL
  const dispatch = useDispatch()
  
  const { exams } = useSelector( e => e.exams )

  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  // handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // add or update exam
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.path) {
      alert("All fields required!");
      return;
    }

    const payload = {
      method: editId ? "PUT":"POST",
      headers: {"content-type":"application/json"},
      body: JSON.stringify(editId ? {...form, _id: editId} : form)
    }
    
    try{
      const req = await fetch(API+"/exam",payload)
      const res = await req.json()
      if(req.ok){
        if(!editId){
          dispatch(addExam(res.exam))
        }else{
          dispatch(updateExam(res.exam))
        }
      }else{
        alert(res.message)
      }
    }catch(err){
      console.log(err)
    }
    setForm(emptyForm)
  };

  // delete exam
  const handleDelete = async (id) => {
    try{
      const payload = {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({_id:id})
      }
      const req = await fetch(API+"/exam",payload)
      const res = await req.json()
      if(req.ok){
        dispatch(removeExam({id}))
      }else{
        throw Error(res.message)
      }
    }catch(err){
      alert(err.message)
    }
  };

  // edit exam
  const handleEdit = (exam) => {
    setForm({ title: exam.title, path: exam.path });
    setEditId(exam._id);
  };

  return (
    <div className="py-20 p-6 max-w-4xl mx-auto">
      
      <BackAndTitle path="/admin" title="Assessment Manager" />
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-4 mb-6 space-y-4"
      >
        <h2 className="text-xl font-semibold">
          {editId ? "Edit Exam" : "Add Exam"}
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Exam Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="path"
          placeholder="Exam Path (url)"
          value={form.path}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Path</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id} className="border-t">
                <td className="p-3">{exam.title}</td>
                <td className="p-3">{exam.path}</td>
                <td className="p-3 space-x-2 grid md:grid-cols-2 gap-2">
                  <button
                    onClick={() => handleEdit(exam)}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(exam._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {exams.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center p-4">
                  No exams found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamManager;