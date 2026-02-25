import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

type TransactionType = {
  userEmail: { name: string; email: string; } | null;
  id: string;
  amount: string;
  date: string;
  type: "income" | "expense";
  category: string;
};
export default function Transaction() {
  const {user}=useAuth();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  const BASE_URL = "https://699c21cf110b5b738cc1c9f1.mockapi.io";

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`${BASE_URL}/transaction`);
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchTransactions();
  }, []);
  const newData=transactions.filter((x)=>x.userEmail===user)
  // Separate income & expense
  const income = newData.filter((t) => t.type === "income");
  const expenses = newData.filter((t) => t.type === "expense");

  // Calculate totals
  const totalIncome = income.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );

  const totalExpense = expenses.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );

  const balance = totalIncome - totalExpense;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[750px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 relative">

        <button
          onClick={() => navigate("/dashboard")}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <FiX size={22} />
        </button>

        {/* INCOME */}
        <h2 className="text-green-600 font-bold mb-4">INCOME</h2>

        <div className="space-y-2">
          {income.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.category}</span>
              <span className="text-green-600">
                ${Number(item.amount).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 font-bold flex justify-between">
          <span>TOTAL INCOME</span>
          <span className="text-green-600">
            ${totalIncome.toLocaleString()}
          </span>
        </div>

        {/* EXPENSES */}
        <h2 className="text-red-600 font-bold mt-8 mb-4">EXPENSES</h2>

        <div className="space-y-2">
          {expenses.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.category}</span>
              <span className="text-red-600">
                -${Number(item.amount).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 font-bold flex justify-between">
          <span>TOTAL EXPENSES</span>
          <span className="text-red-600">
            -${totalExpense.toLocaleString()}
          </span>
        </div>

        {/* SUMMARY */}
        <div className="mt-8 border-t pt-4 font-bold flex justify-between text-lg">
          <span>BALANCE</span>
          <span
            className={
              balance >= 0 ? "text-green-600" : "text-red-600"
            }
          >
            ${balance.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
