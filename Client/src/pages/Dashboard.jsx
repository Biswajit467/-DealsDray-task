import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard-container">
        <aside className="sidebar">
          <h4 className="dash-text">Dashboard</h4>
          <ul>
            <li>
              <Link style={{fontSize:"20px"}} to={"/create-emp"}>Create Employee</Link>
            </li>
          </ul>
        </aside>
        <section className="main-content">
          <h1>Welcome to the Admin Panel</h1>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
