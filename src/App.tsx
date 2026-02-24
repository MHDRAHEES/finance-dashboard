import { Routes, Route } from "react-router-dom"
import Landing from "./component/Page/landing"
import Login from "./login"
import Dashboard from "./component/Page/dashboard"
import Income from "./component/Page/income"
import ProtectedRoute from "./component/ProtectedRoute"
import Expense from "./component/Page/expense"
import SidebarLayout from "./component/Page/sidebar"
import AllTransactions from "./component/Report/report"
import Transaction from "./component/Page/transaction"
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route  path="/dashboard"  element={<ProtectedRoute><Dashboard /> </ProtectedRoute>}/>
      <Route  path="/income"  element={<ProtectedRoute><Income /> </ProtectedRoute>}/>
      <Route  path="/expense"  element={<ProtectedRoute><Expense /> </ProtectedRoute>}/>
      <Route  path="/report"  element={<ProtectedRoute><AllTransactions /></ProtectedRoute>}/>
      <Route  path="/sidebar" element={<ProtectedRoute><SidebarLayout children={undefined}/></ProtectedRoute>}/>
      <Route  path="/all_transaction" element={<ProtectedRoute><Transaction/></ProtectedRoute>}/>
    </Routes>
  )
}

export default App