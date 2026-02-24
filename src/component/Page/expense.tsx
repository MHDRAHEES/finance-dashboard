import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Withdraw() {
  const [amount, setAmount] = useState("")
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount) return alert("Enter amount")

    await fetch("YOUR_MOCKAPI_URL/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        type: "withdraw",
        amount: Number(amount),
        date: new Date(),
      }),
    })

    navigate("/dashboard")
  }

  return (
     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-0">
      
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-red-700 p-12 text-white">
          <div className="flex justify-between items-start">
            
            <div>
           <button onClick={() => navigate("/dashboard")} className="mb-4 px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
              Back to Dashboard
            </button>

              <h1 className="text-5xl font-bold mt-6">
              Expense
              </h1>
            </div>

            {/* <ul className="space-y-3 text-lg text-right">
              <li>• 6 Type</li>
              <li>• 6 State Variant</li>
              <li>• Auto Layout</li>
            </ul> */}

          </div>
        </div>

        {/* Body Section */}
        <div className="p-12 grid grid-cols-2 gap-10 bg-gray-50">
          
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm mb-2 font-medium">
                Date
              </label>
              <input className="w-full border border-gray-300 p-3 rounded-lg" />
            </div>

            <div>
              <label className="block text-sm mb-2 font-medium">
               Category
              </label>
              <input className="w-full border-2 border-gray-400 p-3 rounded-lg" />
            </div>

            <div>
              <label className="block text-sm mb-2 font-medium">
                Amount
              </label>
              <input className="w-full border border-gray-300 p-3 rounded-lg" />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm mb-2 font-medium">
                Description
              </label>
              <input className="w-full bg-gray-200 p-3 rounded-lg" />
            </div>

            <div>
              <label className="block text-sm mb-2 font-medium">
               Paid Through Account
              </label>
              <input className="w-full border-b-2 border-gray-400 p-3 outline-none bg-transparent" />
            </div>

            <div>
              <label className="block text-sm mb-2 font-medium">
               
              </label>
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold">Total</span>
                <input className="flex-1 border border-gray-300 p-3 rounded-lg" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}