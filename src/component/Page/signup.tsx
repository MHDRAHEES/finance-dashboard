 import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const BASE_URL = "YOUR_MOCKAPI_URL"
function Signup() {
    const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.password) {
      return alert("All fields required")
    }

    try {
      const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      // Auto login after signup
      localStorage.setItem("user", JSON.stringify(data))

      navigate("/dashboard")

    } catch (error) {
      console.error("Signup error:", error)
    }
  }
   return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border-t-4 border-red-600">

        <h2 className="text-3xl font-bold text-red-600 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="mt-8 space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
          />

          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
          >
            Sign Up
          </button>

        </form>

      </div>
    </div>
  )
}

export default Signup