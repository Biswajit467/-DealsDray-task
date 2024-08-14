import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/login`, {
        f_userName: userName,
        f_Pwd: password,
      });
      console.log("response from loginPage ", response);

      if (response.status === 201 || response.status === 200) {
        setError("");
        alert("Login successful");
        localStorage.setItem("userName", userName);
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError("Invalid login details or server error");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

// import { useState } from "react";
// import axios from "axios";

// function LoginPage() {
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(`/api/login`, {
//         f_userName: userName,
//         f_Pwd: password,
//       });
//       console.log("response from loginPage ", response);

//       if (response.status === 201) {
//         setError("");
//         alert("Login successful");
//         localStorage.setItem("userName", userName);
//         window.location.href = "/dashboard";
//       }
//     } catch (err) {
//       setError("Invalid login details or server error");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleLogin}>
//         <input
//           type="text"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//           placeholder="Username"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <button type="submit">Login</button>
//         {error && <p>{error}</p>}
//       </form>
//     </div>
//   );
// }

// export default LoginPage;
