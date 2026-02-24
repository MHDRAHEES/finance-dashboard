import { useState } from "react"
import { useNavigate } from "react-router-dom"

const BASE_URL = "https://699c21cf110b5b738cc1c9f1.mockapi.io" 

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch(`${BASE_URL}/user`);
    const users = await res.json();

    const user = users.find(
      (u: any) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      alert("User not found");
      return;
    }

    if (user.password !== password) {
      alert("Invalid password");
      return;
    }

    // Remove password before storing
    const { password: pwd, ...userSafe } = user;
    localStorage.setItem("user", JSON.stringify(userSafe));

    alert("Login successful 🎉");
    navigate("/dashboard");
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};
  return (
    <div className="min-h-screen flex">

      {/* Left Side - Image Section */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-10 text-center">
          <h1 className="text-4xl font-bold">Finance Manager</h1>
          <p className="mt-4 text-lg">
            Manage your money smarter and faster.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

          <h2 className="text-3xl font-bold text-red-600 text-center">
            Welcome Back
          </h2>

          <p className="text-gray-500 text-center mt-2">
            Login to your account
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300"
            >
              Sign In
            </button>

          </form>

          <p className="mt-6 text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-red-600 font-semibold cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>

        </div>
      </div>

    </div>
  )
}