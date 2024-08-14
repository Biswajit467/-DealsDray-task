import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  function logout() {
    localStorage.removeItem("userName");
    navigate("/");

    setUserName("");
  }
  return (
    <nav className="navbar">
      <div className="first">
        <img src="https://img.freepik.com/premium-vector/smart-staff-logo-human-resources-logo-modern-employee-relations-logo_658057-44.jpg" alt="" />
        <Link className="home-text" to={"/dashboard"}>Home</Link>
        <Link className="empList-text" to={"/all-employees"}>
          Employee List
        </Link>
      </div>
      <div className="second">
        <span>{userName}</span>
        <button onClick={logout}>logout</button>
      </div>
    </nav>
  );
};

export default Header;
