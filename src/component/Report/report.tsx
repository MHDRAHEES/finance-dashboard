import  { useEffect, useMemo, useState } from "react";
import {
  FiArrowLeft,
  FiArrowUpCircle,
  FiArrowDownCircle,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

type TransactionType = {
  userEmail: { name: string; email: string } | null;
  id: string;
  type: "income" | "expense";
  amount: number | string;
  date?: string;
  category: string;
};

function Transaction() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [filterType, setFilterType] = useState<"today" | "month" | "year">("month");

  const BASE_URL = "https://699c21cf110b5b738cc1c9f1.mockapi.io";

  // ✅ Fetch and filter user transactions
  useEffect(() => {
    if (!user) return;

    fetch(`${BASE_URL}/transaction`)
      .then((res) => res.json())
      .then((data: TransactionType[]) => {
        const userData = data
          .filter((t) => t.userEmail ===user||user?.email)
          .map((t) => ({
            ...t,
            amount: Number(t.amount),
          }))
          .sort((a, b) =>
            a.date && b.date
              ? new Date(b.date).getTime() - new Date(a.date).getTime()
              : 0
          );
        setTransactions(userData);
      })
      .catch((err) => console.error("Error fetching transactions:", err));
  }, [user]);

  // ✅ Date filtering
  const filteredData = useMemo(() => {
    const now = new Date();

    return transactions.filter((t) => {
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
  }, [transactions, filterType]);
  const totalIncome = filteredData
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = filteredData
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  // ✅ Delete
  const handleDelete = async (id: string) => {
    try {
      await fetch(`${BASE_URL}/transaction/${id}`, {
        method: "DELETE",
      });

      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // ✅ Edit
  const handleEdit = (type: "income" | "expense", id: string) => {
    if (type === "expense") {
      navigate(`/expense/update/${id}`);
    } else {
      navigate(`/income/update/${id}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
        >
          <FiArrowLeft />
          Back
        </button>

        <div className="flex gap-3">
          {["today", "month", "year"].map((type) => (
            <button
              key={type}
              onClick={() =>
                setFilterType(type as "today" | "month" | "year")
              }
              className={`px-4 py-2 rounded-lg capitalize ${
                filterType === type
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 border-t pt-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
         All Transactions History
        </h4>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-green-50 p-5 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Total Income</p>
            <h2 className="text-2xl font-bold text-green-600 mt-2">
              ₹{totalIncome.toLocaleString()}
            </h2>
          </div>

          <div className="bg-red-50 p-5 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500">Total Expense</p>
            <h2 className="text-2xl font-bold text-red-600 mt-2">
              ₹{totalExpense.toLocaleString()}
            </h2>
          </div>

          <div
            className={`p-5 rounded-xl shadow-sm ${
              balance >= 0 ? "bg-blue-50" : "bg-yellow-50"
            }`}
          >
            <p className="text-sm text-gray-500">Balance</p>
            <h2
              className={`text-2xl font-bold mt-2 ${
                balance >= 0 ? "text-blue-600" : "text-yellow-600"
              }`}
            >
              ₹{balance.toLocaleString()}
            </h2>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      {filteredData.length === 0 && (
        <p className="text-gray-500 text-center py-6">
          No transactions found.
        </p>
      )}

      <div className="space-y-4 mt-6">
        {filteredData.map((t) => (
          <div
            key={t.id}
            className="flex justify-between items-center p-4 rounded-xl border hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              {t.type === "income" ? (
                <FiArrowUpCircle className="text-green-500 text-2xl" />
              ) : (
                <FiArrowDownCircle className="text-red-500 text-2xl" />
              )}

              <div>
                <p className="font-semibold capitalize text-gray-800">
                  {t.category}
                </p>
                <p className="text-sm text-gray-500">{t.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <span
                className={`text-lg font-bold ${
                  t.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {t.type === "income" ? "+" : "-"} ₹
                {Number(t.amount).toLocaleString()}
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleEdit(t.type, t.id)}
                  className="text-blue-500 hover:text-blue-700 transition"
                >
                  <FiEdit size={18} />
                </button>

                <button
                  onClick={() => handleDelete(t.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transaction;