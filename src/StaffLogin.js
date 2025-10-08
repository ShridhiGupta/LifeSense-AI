import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function StaffLogin() {
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

    // Check if staff is approved
    const approvedStaff = JSON.parse(localStorage.getItem("approvedStaff") || "[]");
    const staff = approvedStaff.find(s => s.email === credentials.email && s.password === credentials.password);

    if (staff) {
      // Store staff session in localStorage
      localStorage.setItem("staffSession", JSON.stringify({
        id: staff.id,
        name: staff.name,
        email: staff.email,
        department: staff.department,
        position: staff.position,
        role: "staff",
        loginTime: new Date().toISOString()
      }));
      navigate("/staff-dashboard");
    } else {
      // Check if staff is pending
      const pendingStaff = JSON.parse(localStorage.getItem("pendingStaff") || "[]");
      const pendingStaffMember = pendingStaff.find(s => s.email === credentials.email);
      
      if (pendingStaffMember) {
        setError("Your account is still pending admin approval. Please wait for approval.");
      } else {
        setError("Invalid credentials or account not found. Please check your email and password.");
      }
    }
  };

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
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
    background: "linear-gradient(90deg, #10b981 0%, #059669 100%)",
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
          Staff Login
        </h1>
        
        <p style={{ 
          textAlign: "center", 
          color: "#6b7280", 
          marginBottom: "2rem",
          fontSize: "0.875rem"
        }}>
          Login to access your staff dashboard
        </p>
        
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
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              required
            />
          </div>
          
          {error && (
            <div style={{ 
              color: "#dc2626", 
              textAlign: "center", 
              marginBottom: "1rem",
              fontSize: "0.875rem",
              background: "#fef2f2",
              padding: "0.75rem",
              borderRadius: "0.5rem"
            }}>
              {error}
            </div>
          )}
          
          <button type="submit" style={buttonStyle}>
            Login as Staff
          </button>
        </form>
        
        <div style={{ 
          textAlign: "center", 
          marginTop: "1.5rem",
          fontSize: "0.875rem",
          color: "#6b7280"
        }}>
          <a href="/staff-signup" style={{ color: "#10b981", textDecoration: "none", marginRight: "1rem" }}>
            Not registered? Sign up
          </a>
          <a href="/" style={{ color: "#10b981", textDecoration: "none" }}>
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default StaffLogin;
