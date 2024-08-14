import { useState } from "react";
import axios from "axios";

const CreateEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    f_Image: "",
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "HR",
    f_gender: "",
    f_Course: [],
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      let newCourses = [...employeeData.f_Course];
      if (checked) {
        newCourses.push(value);
      } else {
        newCourses = newCourses.filter((course) => course !== value);
      }
      setEmployeeData({ ...employeeData, f_Course: newCourses });
    } else if (type === "file") {
      // Handle file input
      setEmployeeData({ ...employeeData, [name]: files[0] }); // files[0] gives the File object
    } else {
      setEmployeeData({ ...employeeData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("f_Name", employeeData.f_Name);
    formData.append("f_Email", employeeData.f_Email);
    formData.append("f_Mobile", employeeData.f_Mobile);
    formData.append("f_Designation", employeeData.f_Designation);
    formData.append("f_gender", employeeData.f_gender);
    formData.append("f_Course", employeeData.f_Course);
    if (employeeData.f_Image) {
      formData.append("f_Image", employeeData.f_Image);
    }

    try {
      const response = await axios.post("/api/add-employee", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Employee created successfully!");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
      setEmployeeData({
        f_Image: "",
        f_Name: "",
        f_Email: "",
        f_Mobile: "",
        f_Designation: "",
        f_gender: "",
        f_Course: [],
      });
      console.log("Response from createEmp component:", response);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="form-container">
      <h2>Create Employee</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && (
        <p style={{ color: "green", textAlign: "center" }}>{success}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="f_Name"
            value={employeeData.f_Name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="f_Email"
            value={employeeData.f_Email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Mobile:</label>
          <input
            type="text"
            name="f_Mobile"
            value={employeeData.f_Mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>image</label>
          <input
            type="file"
            name="f_Image"
            // value={employeeData.f_Image}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Designation:</label>
          <select
            name="f_Designation"
            value={employeeData.f_Designation}
            onChange={handleChange}
            required
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div>
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="f_gender"
              value="Male"
              checked={employeeData.f_gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="f_gender"
              value="Female"
              checked={employeeData.f_gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
        </div>
        <div>
          <label>Course:</label>
          <label>
            <input
              type="checkbox"
              name="f_Course"
              value="MCA"
              checked={employeeData.f_Course.includes("MCA")}
              onChange={handleChange}
            />
            MCA
          </label>
          <label>
            <input
              type="checkbox"
              name="f_Course"
              value="BCA"
              checked={employeeData.f_Course.includes("BCA")}
              onChange={handleChange}
            />
            BCA
          </label>
          <label>
            <input
              type="checkbox"
              name="f_Course"
              value="BSC"
              checked={employeeData.f_Course.includes("BSC")}
              onChange={handleChange}
            />
            BSC
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
