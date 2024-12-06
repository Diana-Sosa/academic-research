import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#007bff",
      color: "#fff",
      padding: "10px 20px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      position: "sticky",
      top: "0",
      zIndex: "1000",
      fontFamily: "'Arial', sans-serif",
    },
    logo: {
      fontSize: "24px",
      fontWeight: "bold",
      textDecoration: "none",
      color: "#fff",
      fontFamily: "'Arial', sans-serif",
    },
    links: {
      display: "flex",
      gap: "15px",
    },
    link: {
      textDecoration: "none",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "500",
      fontFamily: "'Arial', sans-serif",
      transition: "color 0.3s ease",
    },
    linkHover: {
      color: "#d9e9ff",
    },
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.logo}>
        Academic Research
      </Link>
      <div style={styles.links}>
        <Link
          to="/"
          style={styles.link}
          onMouseEnter={(e) => (e.target.style.color = styles.linkHover.color)}
          onMouseLeave={(e) => (e.target.style.color = styles.link.color)}
        >
          Home
        </Link>
        <Link
          to="/login"
          style={styles.link}
          onMouseEnter={(e) => (e.target.style.color = styles.linkHover.color)}
          onMouseLeave={(e) => (e.target.style.color = styles.link.color)}
        >
          Login
        </Link>
        <Link
          to="/register"
          style={styles.link}
          onMouseEnter={(e) => (e.target.style.color = styles.linkHover.color)}
          onMouseLeave={(e) => (e.target.style.color = styles.link.color)}
        >
          Register
        </Link>
        <Link
          to="/submit-research"
          style={styles.link}
          onMouseEnter={(e) => (e.target.style.color = styles.linkHover.color)}
          onMouseLeave={(e) => (e.target.style.color = styles.link.color)}
        >
          Submit Research
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
