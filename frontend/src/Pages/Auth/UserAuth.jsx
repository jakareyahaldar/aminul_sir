import { useState } from "react";

export default function AuthForm() {
  const [mode, setMode] = useState("login");

  const [form, setForm] = useState({
    username: "",
    email: "",
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
        if (!form.username || !form.email || !form.password) {
          alert("All fields are required");
          return;
        }
      } else {
        if (!form.username || !form.password) {
          alert("Username and Password required");
          return;
        }
      }

      console.log(mode, form);

      // example API call
      // await fetch(`/api/${mode}`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form)
      // });

      alert(mode === "login" ? "Login Success" : "Signup Success");

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

        {mode === "signup" && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
        )}

        {mode === "signup" && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
        )}

        {mode === "login" && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full mb-3 p-2 border rounded"
          />
        )}

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