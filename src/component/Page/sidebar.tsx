import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiCreditCard, FiDollarSign, FiChevronLeft, FiChevronRight ,FiBarChart2 ,FiRepeat } from "react-icons/fi";
type Props = {
  children: ReactNode;
};

export default function SidebarLayout({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

   const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FiHome size={20} /> },
    { name: "Income", path: "/income", icon: <FiCreditCard size={20} /> },
    { name: "Expense", path: "/expense", icon: <FiDollarSign size={20} /> },
    { name: "Transaction", path: "/all_transaction", icon: <FiRepeat  size={20} /> },
    { name: "Report", path: "/report", icon: <FiBarChart2  size={20} /> },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // ✅ Auto adjust sidebar based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true); // desktop open
      } else {
        setIsOpen(false); // mobile closed
      }
    };

    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Overlay (Mobile Only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-40
          bg-green-700 text-white
          h-full
          transition-all duration-300
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-16"}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          {isOpen && (
            <span className="font-bold text-lg">
              {user?.name || "User"}
            </span>
          )}

          <button onClick={toggleSidebar}>
            {isOpen ? (
              <FiChevronLeft size={20} />
            ) : (
              <FiChevronRight size={20} />
            )}
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 768) {
                  setIsOpen(false);
                }
              }}
              className="flex items-center gap-3 p-3 hover:bg-green-600 transition">
              {isOpen && <span>{item?.icon}</span>}
              {isOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-4 md:p-6 overflow-auto w-full">

        {/* Mobile Top Bar */}
        <div className="md:hidden mb-4">
          <button
            onClick={toggleSidebar}
            className="px-4 py-2 bg-green-700 text-white rounded-lg"
          >
            Menu
          </button>
        </div>

        {children}
      </main>
    </div>
  );
}