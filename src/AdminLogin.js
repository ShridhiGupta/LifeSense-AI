import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Check hardcoded admin credentials first
    if (credentials.email === "guptashridhi11@gmail.com" && credentials.password === "shridhii") {
      try {
        const sessionData = {
          email: credentials.email,
          role: "admin",
          loginTime: new Date().toISOString()
        };
        localStorage.setItem("adminSession", JSON.stringify(sessionData));
        
        // Verify it was set
        const verify = localStorage.getItem("adminSession");
        console.log("Admin session set:", verify);
        
        // Small delay to ensure localStorage is written
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 100);
      } catch (error) {
        console.error("Error setting localStorage:", error);
        setError("Failed to save session. Please try again.");
      }
      return;
    }

    // Check dynamically created admins from localStorage
    const admins = JSON.parse(localStorage.getItem("admins") || "[]");
    const foundAdmin = admins.find(
      admin => admin.email === credentials.email && admin.password === credentials.password
    );

    if (foundAdmin) {
      localStorage.setItem("adminSession", JSON.stringify({
        email: credentials.email,
        role: "admin",
        loginTime: new Date().toISOString()
      }));
      navigate("/admin-dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "sans-serif",
    padding: "1rem"
  };

  const formStyle = {
    background: "#fff",
    padding: "2.5rem",
    borderRadius: "1rem",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px"
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    border: "1px solid #cbd5e1",
    fontSize: "1rem",
    marginBottom: "1rem",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    width: "100%",
    background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.75rem",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "0.5rem"
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h1 style={{ 
          textAlign: "center", 
          color: "#1e293b", 
          marginBottom: "2rem",
          fontSize: "1.75rem",
          fontWeight: "700"
        }}>
          Admin Login
        </h1>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "0.5rem", 
              color: "#374151",
              fontWeight: "500"
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter admin email"
              required
            />
          </div>
          
          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "0.5rem", 
              color: "#374151",
              fontWeight: "500"
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter password"
              required
            />
          </div>
          
          {error && (
            <div style={{ 
              color: "#dc2626", 
              textAlign: "center", 
              marginBottom: "1rem",
              fontSize: "0.875rem"
            }}>
              {error}
            </div>
          )}
          
          <button type="submit" style={buttonStyle}>
            Login as Admin
          </button>
        </form>
        
        <div style={{ 
          textAlign: "center", 
          marginTop: "1.5rem",
          fontSize: "0.875rem",
          color: "#6b7280"
        }}>
          <a href="/" style={{ color: "#667eea", textDecoration: "none" }}>
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
