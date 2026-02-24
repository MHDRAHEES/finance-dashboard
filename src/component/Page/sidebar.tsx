import { useState } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiCreditCard, FiDollarSign, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome size={20} /> },
    { name: "Income", path: "/deposit", icon: <FiCreditCard size={20} /> },
    { name: "Expense", path: "/withdraw", icon: <FiDollarSign size={20} /> },
    { name: "All Transactions", path: "/all-transactions", icon: <FiDollarSign size={20} /> },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className={`bg-green-700 text-white transition-all duration-300 ${isOpen ? "w-64" : "w-16"} flex flex-col`}>
        <div className="flex items-center justify-between p-4">
          {isOpen && <span className="font-bold text-lg">Oman Co.</span>}
          <button onClick={toggleSidebar} className="p-1">
            {isOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
          </button>
        </div>

        <nav className="flex-1 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-2 p-3 hover:bg-green-600 transition-colors duration-200"
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">{children}</main>
    </div>
  );
}