import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateRequired, validateAmount } from "../Validation/validation";
import { FiArrowLeft } from "react-icons/fi";

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<any>({});
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const BASE_URL = "https://699c21cf110b5b738cc1c9f1.mockapi.io/transactions";

  const paymentTypes = ["Cash", "Banking"];
  const incomeCategories = ["Salary", "Freelance", "Petty Cash", "other income"];

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: any = {};
    newErrors.date = validateRequired(date, "Date");
    newErrors.category = validateRequired(category, "Category");
    newErrors.paymentType = validateRequired(paymentType, "Payment Type");
    newErrors.amount = validateAmount(amount);

    // Remove empty errors
    Object.keys(newErrors).forEach(
      (key) => !newErrors[key] && delete newErrors[key]
    );

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      // ✅ Collect all error messages
      const allErrorMessages = Object.values(newErrors);
      setFormErrors(allErrorMessages as string[]);

      return;
    }

    setErrors({});
    setFormErrors([]);

    await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        type: "withdrawal",
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3">

        {/* LEFT SIDE */}
        <div className="bg-gray-100 p-6 md:p-12 text-white">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            <FiArrowLeft />
            Back
          </button>

          <h1 className="text-3xl md:text-5xl font-bold mt-6 text-black">
            Income
          </h1>

          {/* Top Validation Message */}
          {formErrors.length > 0 && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg">
              <ul className="space-y-2">
                {formErrors.map((error, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1 w-2 h-2 bg-red-600 rounded-full"></span>
                    <span>{error}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="md:col-span-2 p-6 md:p-12 bg-gray-50">
          <form
            onSubmit={handleWithdraw}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >

            {/* Date */}
            <div>
              <label className="block mb-2 font-medium">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setErrors({ ...errors, date: "" });
                }}
                className={`w-full p-3 rounded-lg border ${errors.date ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label className="block mb-2 font-medium">Amount</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setErrors({ ...errors, amount: "" });
                }}
                className={`w-full p-3 rounded-lg border ${errors.amount ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
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
                {incomeCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            {/* Payment Type */}
            <div>
              <select
                value={paymentType}
                onChange={(e) => {
                  setPaymentType(e.target.value);
                  setErrors({ ...errors, paymentType: "" });
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
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300"
              />
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex flex-col md:flex-row gap-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="w-full md:w-1/2 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-full md:w-1/2 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Add Withdraw
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}