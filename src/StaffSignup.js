import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function StaffSignup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    position: "",
    phone: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Check if email already exists
    const existingStaff = JSON.parse(localStorage.getItem("approvedStaff") || "[]");
    const pendingStaff = JSON.parse(localStorage.getItem("pendingStaff") || "[]");
    
    if (existingStaff.some(staff => staff.email === form.email) || 
        pendingStaff.some(staff => staff.email === form.email)) {
      setError("Email already exists. Please use a different email.");
      return;
    }

    // Create staff record
    const staffId = Date.now().toString();
    const newStaff = {
      id: staffId,
      ...form,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    // Add to pending staff
    const updatedPending = [...pendingStaff, newStaff];
    localStorage.setItem("pendingStaff", JSON.stringify(updatedPending));

    setSuccess(true);
    setTimeout(() => {
      navigate("/staff-login");
    }, 2000);
  };

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
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
    maxWidth: "500px"
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
    background: "linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)",
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
          Hospital Staff Registration
        </h1>
        
        <p style={{ 
          textAlign: "center", 
          color: "#6b7280", 
          marginBottom: "2rem",
          fontSize: "0.875rem"
        }}>
          Register as hospital staff. Your account will be reviewed by admin before approval.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "0.5rem", 
              color: "#374151",
              fontWeight: "500"
            }}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter your full name"
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
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
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
              value={form.password}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Create a password"
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
              Department
            </label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              style={inputStyle}
              required
            >
              <option value="">Select Department</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Emergency">Emergency</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Surgery">Surgery</option>
              <option value="Nursing">Nursing</option>
              <option value="Administration">Administration</option>
            </select>
          </div>
          
          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "0.5rem", 
              color: "#374151",
              fontWeight: "500"
            }}>
              Position
            </label>
            <input
              type="text"
              name="position"
              value={form.position}
              onChange={handleChange}
              style={inputStyle}
              placeholder="e.g., Doctor, Nurse, Administrator"
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
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter your phone number"
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
          
          {success && (
            <div style={{ 
              color: "#059669", 
              textAlign: "center", 
              marginBottom: "1rem",
              fontSize: "0.875rem",
              background: "#f0fdf4",
              padding: "0.75rem",
              borderRadius: "0.5rem"
            }}>
              Registration successful! Your account is pending admin approval. Redirecting to login...
            </div>
          )}
          
          <button type="submit" style={buttonStyle} disabled={success}>
            Register as Staff
          </button>
        </form>
        
        <div style={{ 
          textAlign: "center", 
          marginTop: "1.5rem",
          fontSize: "0.875rem",
          color: "#6b7280"
        }}>
          <a href="/staff-login" style={{ color: "#4f46e5", textDecoration: "none", marginRight: "1rem" }}>
            Already registered? Login
          </a>
          <a href="/" style={{ color: "#4f46e5", textDecoration: "none" }}>
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default StaffSignup;
