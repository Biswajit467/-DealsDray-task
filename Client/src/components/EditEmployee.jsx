import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EmployeeEdit = () => {
  const { id } = useParams();
  console.log("id from employee edit", id);
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_gender: "",
    f_Course: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`/api/employee/${id}`);
        setEmployee(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching employee details");
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleCourseChange = (e) => {
    const { value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      f_Course: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/update-emps/${id}`, employee);
      navigate("/all-employees");
    } catch (error) {
      setError("Error updating employee details");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="employee-edit-container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="f_Name">Name</label>
          <input
            type="text"
            id="f_Name"
            name="f_Name"
            value={employee.f_Name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="f_Email">Email</label>
          <input
            type="email"
            id="f_Email"
            name="f_Email"
            value={employee.f_Email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="f_Mobile">Mobile</label>
          <input
            type="text"
            id="f_Mobile"
            name="f_Mobile"
            value={employee.f_Mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="f_Designation">Designation</label>
          <select
            id="f_Designation"
            name="f_Designation"
            value={employee.f_Designation}
            onChange={handleChange}
            required
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="f_gender">Gender</label>
          <select
            id="f_gender"
            name="f_gender"
            value={employee.f_gender}
            onChange={handleChange}
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="f_Course">Courses (comma separated)</label>
          <input
            type="text"
            id="f_Course"
            name="f_Course"
            value={employee.f_Course.join(", ")}
            onChange={handleCourseChange}
            required
          />
        </div>
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EmployeeEdit;
