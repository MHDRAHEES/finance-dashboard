import { useNavigate } from "react-router-dom"
export default function Landing() {
    const navigate = useNavigate()
  return (
 <div className="min-h-screen relative">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6">

        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Smart Finance Management
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl">
          Track expenses, manage budgets, and grow your wealth with powerful
          financial insights.
        </p>

        <div className="mt-8 flex gap-4">
          <button 
          onClick={()=>navigate("/login")}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition">
            Get Started
          </button>

          <button className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold backdrop-blur transition">
            Learn More
          </button>
        </div>

      </div>
    </div>
  )
}