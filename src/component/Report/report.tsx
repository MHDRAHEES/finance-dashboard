import React, { useEffect, useState } from "react";

type TransactionType = {
  id: string;
  type: "deposit" | "withdrawal";
  amount: number | string;
  createdAt?: string;
};

function Transaction() {
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

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold mb-4">All Transactions</h3>

      {transactions.length === 0 && (
        <p className="text-gray-500">No transactions found.</p>
      )}

      {transactions.map((t) => (
        <div
          key={t.id}
          className="flex justify-between py-2 border-b last:border-none"
        >
          <span className="capitalize">{t.type}</span>
          <span
            className={t.type === "deposit" ? "text-green-600" : "text-red-600"}
          >
            ₹{Number(t.amount).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Transaction;