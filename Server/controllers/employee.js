const Employee = require("../models/employee");
async function handleCreateEmployee(req, res) {
  try {
    const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } =
      req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required." });
    }

    if (
      !f_Name ||
      !f_Email ||
      !f_Mobile ||
      !f_Designation ||
      !f_gender ||
      !f_Course
    ) {
      //   console.log(f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course);

      return res.status(400).json({ error: "All fields are required." });
    }

    const newEmployee = new Employee({
      f_Image: req.file.path,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
    });

    const savedEmployee = await newEmployee.save();

    res.status(201).json(savedEmployee);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    if (error.code === 11000) {
      return res.status(409).json({
        error: "Duplicate key error: " + JSON.stringify(error.keyValue),
      });
    }
    console.error("Server error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the employee." });
  }
}

// GET all employees
async function handleListEmployee(req, res) {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching employees." });
  }
}

async function handleSingleEmp(req,res){
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
          return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(employee);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
}

async function handleUpdateEmployee(req, res) {
  try {
    const { id } = req.params;
    console.log("this is id from updateEmp api ", id);
    const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } =
      req.body;

    if (!id) {
      return res.status(400).json({ error: "Employee ID is required." });
    }

    const updateFields = {
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
    };

    if (req.file) {
      updateFields.f_Image = req.file.path;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    if (error.code === 11000) {
      return res.status(409).json({
        error: "Duplicate key error: " + JSON.stringify(error.keyValue),
      });
    }
    console.error("Server error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the employee." });
  }
}

async function handleDeleteEmployee(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Employee ID is required." });
    }

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found." });
    }

    res.status(200).json({ message: "Employee deleted successfully." });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the employee." });
  }
}

module.exports = {
  handleCreateEmployee,
  handleListEmployee,
  handleSingleEmp,
  handleUpdateEmployee,
  handleDeleteEmployee,
};
