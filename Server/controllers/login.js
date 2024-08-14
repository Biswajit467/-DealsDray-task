const Login = require("../models/login");

async function handleLogin(req, res) {
  const { f_userName, f_Pwd } = req.body;

  if (!f_userName || !f_Pwd) {
    return res
      .status(400)
      .json({ error: "Username and Password are required" });
  }

  try {
    const existingLogin = await Login.findOne({ f_userName, f_Pwd });

    if (existingLogin) {
      return res
        .status(200)
        .json({ message: "Login successful", user: existingLogin });
    } else {
      const newLogin = new Login({
        f_userName,
        f_Pwd,
      });

      const savedLogin = await newLogin.save();
      res
        .status(201)
        .json({ message: "New user created and logged in", user: savedLogin });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to process login" });
  }
}

module.exports = { handleLogin };
