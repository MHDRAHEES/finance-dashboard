import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateRequired,
  validateAmount,
} from "../Validation/validation";

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<any>({});

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const BASE_URL =
    "https://699c21cf110b5b738cc1c9f1.mockapi.io/transactions";

  const paymentTypes = ["Cash", "Banking"];
  const expenseCategories = [
    "Food & Drink",
    "Transportation",
    "Entertainment",
    "Shopping",
    "Rent",
    "Utilities",
    "Other Expense",
  ];

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: any = {};

    newErrors.date = validateRequired(date, "Date");
    newErrors.category = validateRequired(category, "Category");
    newErrors.paymentType = validateRequired(
      paymentType,
      "Payment Type"
    );
    newErrors.amount = validateAmount(amount);

    Object.keys(newErrors).forEach(
      (key) => !newErrors[key] && delete newErrors[key]
    );

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        type: "withdrawal", // ✅ FIXED
        amount: Number(amount.replace(/,/g, "")),
        date,
        category,
        paymentType,
        description,
      }),
    });

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-500 to-red-700 p-12 text-white">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-white text-blue-700 rounded-lg"
          >
            Back to Dashboard
          </button>
          <h1 className="text-5xl font-bold mt-6">
            Withdraw
          </h1>
        </div>

        <form onSubmit={handleWithdraw}>
          <div className="p-12 grid grid-cols-2 gap-10 bg-gray-50">

            {/* Date */}
            <div>
              <label className="block mb-2 font-medium">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setErrors({ ...errors, date: "" });
                }}
                className={`w-full p-3 rounded-lg border ${
                  errors.date
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.date}
                </p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label className="block mb-2 font-medium">
                Amount
              </label>
              <input
                type="text"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setErrors({ ...errors, amount: "" });
                }}
                className={`w-full p-3 rounded-lg border ${
                  errors.amount
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.amount}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setErrors({ ...errors, category: "" });
                }}
                className="w-full p-3 rounded-lg border border-gray-300"
              >
                <option value="">Select Category</option>
                {expenseCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category}
                </p>
              )}
            </div>

            {/* Payment Type */}
            <div>
              <select
                value={paymentType}
                onChange={(e) => {
                  setPaymentType(e.target.value);
                  setErrors({
                    ...errors,
                    paymentType: "",
                  });
                }}
                className="w-full p-3 rounded-lg border border-gray-300"
              >
                <option value="">Select Payment Type</option>
                {paymentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.paymentType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.paymentType}
                </p>
              )}
            </div>
            {/* Description */}
            <div className="col-span-2">
              <label className="block mb-2 font-medium">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                className="w-full p-3 rounded-lg border border-gray-300"
              />
            </div>

            {/* Buttons */}
            <div className="col-span-2 flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="w-1/2 py-3 bg-gray-600 text-white rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-1/2 py-3 bg-red-600 text-white rounded-lg">
                Add Withdraw
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}