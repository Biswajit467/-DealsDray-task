const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const LoginSchema = new mongoose.Schema({
  f_sno: {
    type: Number,
    unique: true,
  },
  f_userName: {
    type: String,
    required: true,
  },
  f_Pwd: {
    type: String,
    required: true,
  },
});

LoginSchema.plugin(AutoIncrement, { inc_field: "f_sno" });

const Login = mongoose.model("Login", LoginSchema);
module.exports = Login;
