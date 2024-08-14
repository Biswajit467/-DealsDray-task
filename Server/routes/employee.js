const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  handleCreateEmployee,
  handleListEmployee,
  handleSingleEmp,
  handleUpdateEmployee,
  handleDeleteEmployee,
} = require("../controllers/employee");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post("/add-employee", upload.single("f_Image"), handleCreateEmployee);
router.get("/all-employees", handleListEmployee);
router.get("/employee/:id", handleSingleEmp);
router.put("/update-emps/:id", upload.single("image"), handleUpdateEmployee);
router.delete("/delete-emp/:id", handleDeleteEmployee);

module.exports = router;
