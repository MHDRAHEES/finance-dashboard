import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
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

const COLORS = ["#10B981", "#EF4444"];

type Transaction = {
  id: string;
  userEmail?: string;
  type: "income" | "expense";
  amount: number;
  date?: string;

};

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filterType, setFilterType] = useState<"today" | "month" | "year">("month");
  const { user } = useAuth();

  useEffect(() => {
    fetch(`${BASE_URL}/transaction`)
      .then((res) => res.json())
      .then((data: Transaction[]) => {
        const formatted = data
          .map((t) => ({
            ...t,
            amount: Number(t.amount),
            type: t.type.trim() as "income" | "expense",
          }))
          .sort((a, b) =>
            a.date && b.date
              ? new Date(b.date).getTime() - new Date(a.date).getTime()
              : 0
          );
        setTransactions(formatted);
      })
      .catch((err) => console.error(err));
  }, []);

  const userData = transactions.filter(
    (t) => t.userEmail === user
  );
console.log(userData,"lllll");


  // ✅ Date Filtering
  const now = new Date();

  const filteredData = userData.filter((t) => {
    if (!t.date) return false;

    const d = new Date(t.date);

    if (filterType === "today") {
      return (
        d.getDate() === now.getDate() &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    }

    if (filterType === "month") {
      return (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      );
    }
    if (filterType === "year") {
      return d.getFullYear() === now.getFullYear();
    }

    return true;
  });


  const totalIncome = filteredData
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredData
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const chartData = [
    { name: "Income", amount: totalIncome },
    { name: "Expense", amount: totalExpense },
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
          <h2 className="text-3xl font-bold">
            Welcome,🖐
          </h2>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            Logout
          </button>
        </div>
        <div className="flex gap-3 mb-6">
          {["today", "month", "year"].map((type) => (
            <button
              key={type}
              onClick={() =>
                setFilterType(type as "today" | "month" | "year")
              }
              className={`px-4 py-2 rounded-lg capitalize ${filterType === type
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
                }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Top Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <h3 className="text-gray-500">Total Income</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">
              ₹{totalIncome.toLocaleString()}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
            <h3 className="text-gray-500">Total Expense</h3>
            <p className="text-2xl font-bold text-red-600 mt-2">
              ₹{totalExpense.toLocaleString()}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <h3 className="text-gray-500">Balance</h3>
            <p
              className={`text-2xl font-bold mt-2 ${balance >= 0
                ? "text-blue-600"
                : "text-red-600"
                }`}
            >
              ₹{balance.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-10">
          <h3 className="text-xl font-semibold mb-4">
            Income vs Expense
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip

                formatter={(value: number | undefined) =>
                  `₹${(value ?? 0).toLocaleString()}`
                }
              />
              <Legend />
              <Bar dataKey="amount" barSize={50}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-10">
          <h3 className="text-xl font-semibold mb-4">
            Income & Expense Ratio
          </h3>

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
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number | undefined) =>
                  `₹${(value ?? 0).toLocaleString()}`
                }
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </SidebarLayout>
  );
}