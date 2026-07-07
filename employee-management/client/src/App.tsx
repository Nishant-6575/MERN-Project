import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import MainLayout from "./Layout/MainLayout"
import EmployeeList from "./pages/EmployeeList"
import AddEmployee from "./pages/AddEmployee"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/add" element={<AddEmployee />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
