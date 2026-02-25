import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
type TransactionType = {
  id: string;
  type: "deposit" | "withdrawal";
  amount: number | string;
  createdAt?: string;
};

function Transaction() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const BASE_URL = "https://699c21cf110b5b738cc1c9f1.mockapi.io";

  useEffect(() => {
    fetch(`${BASE_URL}/transaction`)
      .then((res) => res.json())
      .then((data: TransactionType[]) => {
        // Convert amounts to numbers and sort by latest
        const allData = data
          .map((t) => ({ ...t, amount: Number(t.amount) }))
          .sort((a, b) =>
            a.createdAt && b.createdAt
              ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              : 0
          );
        setTransactions(allData);
      })
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);
const totalIncome = transactions
  .filter((t) => t.type === "deposit")
  .reduce((sum, t) => sum + Number(t.amount), 0);

const totalExpense = transactions
  .filter((t) => t.type === "withdrawal")
  .reduce((sum, t) => sum + Number(t.amount), 0);

const balance = totalIncome - totalExpense;
  return (
    
   <div className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-6"> 
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition">
      <FiArrowLeft />
      Back
    </button>
    <h3 className="text-2xl font-bold text-gray-800">
      All Transactions
    </h3>
  </div>
    <div className="mt-8 border-t pt-6">
  <h4 className="text-lg font-semibold text-gray-800 mb-4">
    Summary Report
  </h4>
  <div className="grid grid-cols-3 gap-6">
    {/* Income */}
    <div className="bg-green-50 p-5 rounded-xl shadow-sm">
      <p className="text-sm text-gray-500">Total Income</p>
      <h2 className="text-2xl font-bold text-green-600 mt-2">
        ₹{totalIncome.toLocaleString()}
      </h2>
    </div>
    {/* Expense */}
    <div className="bg-red-50 p-5 rounded-xl shadow-sm">
      <p className="text-sm text-gray-500">Total Expense</p>
      <h2 className="text-2xl font-bold text-red-600 mt-2">
        ₹{totalExpense.toLocaleString()}
      </h2>
    </div>

    {/* Balance */}
    <div className={`p-5 rounded-xl shadow-sm ${
      balance >= 0 ? "bg-blue-50" : "bg-yellow-50"
    }`}>
      <p className="text-sm text-gray-500">Balance</p>
      <h2 className={`text-2xl font-bold mt-2 ${
        balance >= 0 ? "text-blue-600" : "text-yellow-600"
      }`}>
        ₹{balance.toLocaleString()}
      </h2>
    </div>

  </div>
</div>
  {/* Header Section */}
  {transactions.length === 0 && (
    <p className="text-gray-500 text-center py-6">
      No transactions found.
    </p>
  )}

  <div className="space-y-4">
    {transactions.map((t) => (
      <div
        key={t.id}
        className="flex justify-between items-center p-4 rounded-xl border hover:shadow-md transition"
      >
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {t.type === "deposit" ? (
            <FiArrowUpCircle className="text-green-500 text-2xl" />
          ) : (
            <FiArrowDownCircle className="text-red-500 text-2xl" />
          )}

          <div>
            <p className="font-semibold capitalize text-gray-800">
              {t.type}
            </p>
            <p className="text-sm text-gray-500">
              {t.createdAt}
            </p>
          </div>
        </div>

        {/* Right Side */}
        <span
          className={`text-lg font-bold ${
            t.type === "deposit"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {t.type === "deposit" ? "+" : "-"} ₹
          {Number(t.amount).toLocaleString()}
        </span>
      </div>
    ))}
  </div>
</div>
  );
}

export default Transaction;