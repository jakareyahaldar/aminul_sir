import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { GetAccount } from "../../feature/auth/authSlice.js"

export default function AdminLogin() {
  const dispatch = useDispatch()
  const API = import.meta.env.VITE_API_URL
  const Navigate = useNavigate()
  
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        method: "POST",
        headers:{ "content-type": "application/json" },
        body: JSON.stringify(form)
      }
      const req = await fetch(API+"/admin-login",payload)
      const res = await req.json()
      
      if(req.ok){
        window.localStorage.setItem("admntkn",JSON.stringify(res.admin))
        dispatch(GetAccount())
        Navigate("/admin")
      }
      if(!req.ok){
        throw Error(res.message)
      }

    } catch (error) {
      console.error("Login Error:", error);
      alert(error.message);
    }
  };

  return (
    <>
    <div className="py-20 flex items-center justify-center  min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <Link className="mt-5 inline-block text-blue-300 underline" to="/">Go to Dashboard</Link>
      </form>
    </div>
    </>
  );
}