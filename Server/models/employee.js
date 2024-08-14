const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const EmployeeSchema = new mongoose.Schema({
  f_Id: {
    type: Number,
    unique: true,
  },
  f_Image: {
    type: String,
    required: true,
  },
  f_Name: {
    type: String,
    required: true,
  },
  f_Email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  f_Mobile: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid mobile number!`,
    },
  },
  f_Designation: {
    type: String,
    required: true,
    enum: ["HR", "Manager", "Sales"],
  },
  f_gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  f_Course: {
    type: [String],
    required: true,
    enum: ["MCA", "BCA", "BSC"],
  },
  f_Createdate: {
    type: Date,
    default: Date.now,
  },
});

EmployeeSchema.plugin(AutoIncrement, { inc_field: "f_Id" });

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
