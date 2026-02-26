import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validateRequired, validateAmount } from "../Validation/validation";
import { FiArrowLeft } from "react-icons/fi";
import { useAuth } from "../../Context/AuthContext";

export default function Expense() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [transactionType, setTransactionType] = useState("income");
  const [errors, setErrors] = useState<any>({});
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};
  const [date, setDate] = useState(getTodayDate());;
  const isEditMode = Boolean(id);

  const BASE_URL = "https://699c21cf110b5b738cc1c9f1.mockapi.io/transaction";
   

  const paymentTypes = ["Cash", "Banking"];
  const incomeCategories = ["Shopping, Entertainment ","Food & Dining ","Rent","Utilities "," Transportation ","Healthcare ","Education","Other Expense "]
  const transactionTypes = ["income", "expense"];

  // ✅ LOAD DATA WHEN EDITING
  useEffect(() => {
    if (id) {
      fetch(`${BASE_URL}/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setAmount(data.amount?.toString() || "");
          setDate(data.date || "");
          setCategory(data.category || "");
          setPaymentType(data.paymentType || "");
          setTransactionType(data.type || "income");
        })
        .catch((err) => console.error("Error loading data:", err));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: any = {};
    newErrors.date = validateRequired(date, "Date");
    newErrors.category = validateRequired(category, "Category");
    newErrors.paymentType = validateRequired(paymentType, "Payment Type");
    newErrors.amount = validateAmount(amount);

    Object.keys(newErrors).forEach(
      (key) => !newErrors[key] && delete newErrors[key]
    );

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFormErrors(Object.values(newErrors) as string[]);
      return;
    }

    setErrors({});
    setFormErrors([]);

    const payload = {
      type: transactionType,
      amount: Number(amount.replace(/,/g, "")),
      date,
      category,
      paymentType,
      userEmail: user
    };

    try {
      if (isEditMode) {
        // ✅ UPDATE
        await fetch(`${BASE_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // ✅ CREATE
        await fetch(BASE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Submit failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3">
        
        {/* LEFT SIDE */}
        <div className="bg-gray-100 p-6 md:p-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            <FiArrowLeft />
            Back
          </button>

          <h1 className="text-2xl font-bold mt-6">
            {isEditMode ? "Update Expense" : "Create Expense"}
          </h1>

          {formErrors.length > 0 && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg">
              <ul className="space-y-2">
                {formErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="md:col-span-2 p-6 md:p-12 bg-gray-50">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Date */}
            <div>
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 rounded-lg border"
              />
            </div>

            {/* Transaction Type */}
            <div>
              <label>Transaction Type</label>
              <select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
                className="w-full p-3 rounded-lg border"
              >
                {transactionTypes.map((x) => (
                  <option key={x} value={x}>
                    {x}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 rounded-lg border"
              >
                <option value="">Select Category</option>
                {incomeCategories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Payment Type */}
            <div>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className="w-full p-3 rounded-lg border"
              >
                <option value="">Select Payment Type</option>
                {paymentTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div className="md:col-span-2">
              <label>Amount</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 rounded-lg border"
              />
                {errors.amount && <p className="text-red-500">{errors.amount}</p>}
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="w-1/2 py-3 bg-gray-600 text-white rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-1/2 py-3 bg-green-600 text-white rounded-lg"
              >
                {isEditMode ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}