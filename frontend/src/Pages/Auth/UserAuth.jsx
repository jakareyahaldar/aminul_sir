import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { GetAccount } from "../../feature/auth/authSlice.js"

export default function AuthForm() {
  const dispatch = useDispatch()
  const API = import.meta.env.VITE_API_URL
  const Navigate = useNavigate()
  
  const [mode, setMode] = useState("login");

  const [form, setForm] = useState({
    name:"",
    username: "",
    phone: "",
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
      if (mode === "signup") {
        if (!form.name || !form.username || !form.phone || !form.password) {
          alert("All fields are required");
          return;
        }
      } else {
        if (!form.phone || !form.password) {
          alert("Username and Password required");
          return;
        }
      }

      // build payload 
      const payload = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form)
      }
      const req_path = mode === "login" ? "/login" : "/signup"
      
      // request send 
      const req = await fetch(API+req_path,payload)
      const res = await req.json()
      
      if(req.ok){
        window.localStorage.setItem("user_data",JSON.stringify(res.user))
        alert(mode === "login" ? "Login Success" : "Signup Success");
        dispatch(GetAccount())
        Navigate("/")
      }else{
        alert(res.message)
      }
      

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-xl font-bold text-center mb-4">
          {mode === "login" ? "User Login" : "User Signup"}
        </h2>

        {/*false && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
        ) */}

        {mode === "signup" && (
          <input
            type="name"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
        )}
          <input
            type="number"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />

        
         { mode === "signup" && <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />}
      

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
          {mode === "login" ? "Login" : "Signup"}
        </button>

        <p className="text-center mt-4 text-sm">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            type="button"
            onClick={() =>
              setMode(mode === "login" ? "signup" : "login")
            }
            className="text-blue-500 ml-1"
          >
            {mode === "login" ? "Signup" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
}