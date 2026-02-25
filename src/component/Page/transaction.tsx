import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function transaction() {
const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-[750px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 relative">

        <button
            onClick={() => navigate("/dashboard")}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <FiX size={22} />
        </button>

        {/* ================= INCOME ================= */}
        <h2 className="text-green-600 font-bold mb-4">INCOME</h2>

        <div className="grid grid-cols-2 gap-6 text-gray-700">
          <div className="space-y-3">
            <Row label="His Paycheck 1" amount="$1,500.00" />
            <Row label="Her Paycheck 1" amount="$1,500.00" />
            <Row label="Side Hustle" amount="$500.00" />
          </div>

          <div className="space-y-3">
            <Row label="His Paycheck 2" amount="$1,500.00" />
            <Row label="Her Paycheck 2" amount="$1,500.00" />
          </div>
        </div>

        <TotalBar label="TOTAL INCOME" amount="$6,500.00" />

        {/* ================= EXPENSES ================= */}
        <h2 className="text-green-600 font-bold mt-8 mb-4">EXPENSES</h2>

        <div className="grid grid-cols-2 gap-6 text-gray-700">
          <div className="space-y-3">
            <Row label="Giving" amount="$650.00" />
            <Row label="Savings" amount="$200.00" />
            <Row label="Food" amount="$950.00" />
            <Row label="Utilities" amount="$325.00" />
            <Row label="Housing" amount="$1,625.00" />
            <Row label="Transportation" amount="$250.00" />
          </div>

          <div className="space-y-3">
            <Row label="Insurance" amount="$725.00" />
            <Row label="Debt" amount="$400.00" />
            <Row label="Childcare" amount="$900.00" />
            <Row label="Miscellaneous" amount="$175.00" />
            <Row label="Fun Money" amount="$175.00" />
            <Row label="Entertainment" amount="$125.00" />
          </div>
        </div>

        <TotalBar label="TOTAL EXPENSES" amount="$6,500.00" />

        {/* ================= SUMMARY ================= */}
        <div className="mt-8 space-y-3">
          <SummaryRow label="INCOME" amount="$6,500.00" />
          <SummaryRow label="EXPENSES" amount="-$6,500.00" />
        </div>

        <TotalBar label="BALANCE" amount="$0" />
      </div>
    </div>
  );
}



function Row({ label, amount }: { label: string; amount: string }) {
  return (
    <div className="flex justify-between border-b pb-2 text-sm">
      <span>{label}</span>
      <span className="font-medium">{amount}</span>
    </div>
  );
}

function SummaryRow({ label, amount }:{ label: string; amount: string }) {
  return (
    <div className="flex justify-between font-semibold">
      <span>{label}</span>
      <span>{amount}</span>
    </div>
  );
}

function TotalBar({ label, amount }: { label: string; amount: string }) {
  return (
    <div className="mt-4 bg-green-500 text-white flex justify-between items-center px-4 py-2 rounded-lg font-semibold">
      <span>{label}</span>
      <span className="bg-white text-gray-700 px-3 py-1 rounded-md text-sm">
        {amount}
      </span>
    </div>
  );
}