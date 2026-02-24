import { Routes, Route } from "react-router-dom"
import Landing from "./component/Page/landing"
import Login from "./login"
import Dashboard from "./component/Page/dashboard"
import Deposit from "./component/Page/income"
import ProtectedRoute from "./component/ProtectedRoute"
import Withdraw from "./component/Page/expense"
import SidebarLayout from "./component/Page/sidebar"
import AllTransactions from "./component/transaction"
function App() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
            
        
        }
      />

      <Route
        path="/deposit"
        element={
             <ProtectedRoute>
            <Deposit />
          </ProtectedRoute>
            
          
        }
      />

      
      <Route
        path="/withdraw"
        element={
          <ProtectedRoute>
            <Withdraw />
          </ProtectedRoute>
        }
      /> 
       
      <Route
        path="/all-transactions"
        element={
          <ProtectedRoute>
            <AllTransactions />
          </ProtectedRoute>
        }
      /> 
      
      <Route
        path="/sidebar"
        element={
      <ProtectedRoute>
            <SidebarLayout children={undefined} />
          </ProtectedRoute>
        
        }
      /> 
  
    </Routes>
  )
}

export default App