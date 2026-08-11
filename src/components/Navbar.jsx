import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
          <span className="logo-text">Job Portal</span>
        </Link>
        <nav className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
          >
            Việc làm
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
