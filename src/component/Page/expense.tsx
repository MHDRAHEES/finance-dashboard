import { use, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Withdraw() {
  const [amount, setAmount] = useState("")
  const [incomeData, setIncomeData] = useState([])
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const BASE_URL = "https://699c21cf110b5b738cc1c9f1.mockapi.io/transactions"

  useEffect(() => {
    fetch(`${BASE_URL}/transaction`)
      .then((res) => res.json())
      .then((data) => {
        setIncomeData(data);
      })
      .catch((err) => console.error(err));
  }, []);
  const paymentTypes = ["Cash","Banking"];
  const expenseCategories = ["Food & Drink", "Transportation", "Entertainment", "Shopping", "Rent", "Utilities", "Other Expense"];
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-0">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
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
      <form>
        <div className="p-12 grid grid-cols-2 gap-10 bg-gray-50">
          <div className="space-y-6">
            <div>
              <label className="block text-sm mb-2 font-medium">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg"
              />
            </div>
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border-2 border-gray-400 p-3 rounded-lg"
              >
                <option value="">Select Category</option>
                {expenseCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2 font-medium">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm mb-2 font-medium">
                Description
              </label>
              <input className="w-full bg-gray-200 p-3 rounded-lg" />
            </div>
            <div>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className="w-full border-b-2 border-gray-400 p-3 outline-none bg-transparent"
              >
                <option value="">Select Payment Type</option>
                {paymentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
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
         <button className="mt-6 w-full py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition duration-300">
           Cancel
          </button>
          <button className="mt-6 w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300">
            Add Expense
          </button>
        </div>
        </form>
      </div>
    </div>
  )
}