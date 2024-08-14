import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeleteConfirmationPopUp from "./DeleteConfirmationPopUp";
const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const ListAllEmp = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const openDeletePopup = (employeeId) => {
    setEmployeeToDelete(employeeId);
    setIsDeletePopupOpen(true);
  };

  const closeDeletePopup = () => {
    setIsDeletePopupOpen(false);
    setEmployeeToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/delete-emp/${employeeToDelete}`);
      closeDeletePopup();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/all-employees");
        setEmployees(response.data);
        console.log("this is response from EmpList component", response);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.f_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.f_Email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("filtered employees:", filteredEmployees);

  return (
    <div className="employee-list-container">
      <div className="header">
        <h2>Employees count: {filteredEmployees.length}</h2>
        <Link to={"/create-emp"} className="create-employee-btn">
          Create Employee
        </Link>
      </div>
      <div className="search-container">
        <label>Search</label>
        <input
          type="text"
          placeholder="Enter Search Keyword"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Unique Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.f_Id}</td>
              <td>
                <img
                  // src={`http://localhost:3000/${employee.f_Image.replace(/\\/g, "/")}`}
                  src={`${baseUrl}/${employee.f_Image.replace(/\\/g, "/")}`}
                  alt={"N/A"}
                  className="employee-image"
                />
              </td>
              <td>{employee.f_Name}</td>
              <td>
                <a href={`mailto:${employee.f_Email}`}>{employee.f_Email}</a>
              </td>
              <td>{employee.f_Mobile}</td>
              <td>{employee.f_Designation}</td>
              <td>{employee.f_gender}</td>
              <td>{employee.f_Course.join(", ")}</td>
              <td>
                {employee.f_Createdate
                  ? new Date(employee.f_Createdate).toLocaleDateString()
                  : "N/A"}
              </td>

              <td className="edit-deleteP">
                <Link to={`/edit-emp/${employee._id}`} className="edit-btn">
                  Edit
                </Link>{" "}
                <button
                  onClick={() => openDeletePopup(employee._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteConfirmationPopUp
        isOpen={isDeletePopupOpen}
        onClose={closeDeletePopup}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ListAllEmp;
