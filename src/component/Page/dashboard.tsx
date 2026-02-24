import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
} from "recharts";
import SidebarLayout from "./sidebar";

const BASE_URL = "https://699c21cf110b5b738cc1c9f1.mockapi.io";

const COLORS = ["#10B981", "#EF4444"]; // green for deposit, red for withdrawal

type Transaction = {
  id: string;
  type: "deposit" | "withdrawal";
  amount: number | string;
  createdAt?: string;
};

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetch(`${BASE_URL}/transaction`)
      .then((res) => res.json())
      .then((data: Transaction[]) => {
        const allData = data
          .map((t) => ({
            ...t,
            type: t.type.trim() as "deposit" | "withdrawal",
            amount: Number(t.amount),
          }))
          .sort((a, b) =>
            a.createdAt && b.createdAt
              ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              : 0
          );

        setTransactions(allData);
      });
  }, []);

  const totalDeposits = transactions
    .filter((t) => t.type === "deposit")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalWithdrawals = transactions
    .filter((t) => t.type === "withdrawal")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const balance = totalDeposits - totalWithdrawals;

  // Chart data with proper "name" keys
  const chartData = [
    { name: "Deposits", amount: totalDeposits, color: "#10B981" },
    { name: "Withdrawals", amount: totalWithdrawals, color: "#EF4444" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <SidebarLayout>
      <div className="min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Welcome, {user?.name || "User"}</h2>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            Logout
          </button>
        </div>

        {/* Top Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <h3 className="text-gray-500">Total Deposits</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">
              ₹{totalDeposits.toLocaleString()}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
            <h3 className="text-gray-500">Total Withdrawals</h3>
            <p className="text-2xl font-bold text-red-600 mt-2">
              ₹{totalWithdrawals.toLocaleString()}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <h3 className="text-gray-500">Balance</h3>
            <p
              className={`text-2xl font-bold mt-2 ${
                balance >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              ₹{balance.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-10">
          <h3 className="text-xl font-semibold mb-4">Transaction Overview (Bar Chart)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number | undefined) => value !== undefined ? `₹${value.toLocaleString()}` : '₹0'} />
              <Bar dataKey="amount" barSize={50}>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-10">
          <h3 className="text-xl font-semibold mb-4">Transaction Overview (Pie Chart)</h3>
<ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={chartData}
      dataKey="amount"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={100}
      label
    >
      {chartData.map((entry, index) => (
        <Cell key={index} fill={entry.color} />
      ))}
    </Pie>
    <Tooltip formatter={(value: number | undefined) => value !== undefined ? `₹${value.toLocaleString()}` : '₹0'} />
    <Legend />
  </PieChart>
</ResponsiveContainer>
        </div>
      </div>
    </SidebarLayout>
  );
}