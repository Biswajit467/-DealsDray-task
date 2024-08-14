import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CreateEmployee from "./components/CreateEmp";
import Header from "./components/Header";
import ListAllEmp from "./components/ListAllEmp";
import EmployeeEdit from "./components/EditEmployee";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* useing nested routing, cause i want header on all components except for login page  */}
        <Route element={<LayoutWithHeader />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-emp" element={<CreateEmployee />} />
          <Route path="/all-employees" element={<ListAllEmp />} />
          <Route path="/edit-emp/:id" element={<EmployeeEdit />} />
        </Route>
      </Routes>
    </Router>
  );
}

const LayoutWithHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
