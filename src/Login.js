import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "./config/api";

function Login() {
  const [activeTab, setActiveTab] = useState("patient");
  const [patientId, setPatientId] = useState("");
  const [staffCredentials, setStaffCredentials] = useState({ email: "", password: "" });
  const [adminCredentials, setAdminCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePatientLogin = (e) => {
  e.preventDefault();
  setError("");

  // ✅ Get all registered patients from localStorage
  const patientList = JSON.parse(localStorage.getItem("patientList") || "[]");

  // ✅ Check if entered email & password match any saved patient
  const foundPatient = patientList.find(
    (patient) =>
      patient.email === patientCredentials.email &&
      patient.password === patientCredentials.password
  );

  if (foundPatient) {
    // ✅ Store login session
    const sessionData = {
      email: foundPatient.email,
      role: "patient",
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem("patientSession", JSON.stringify(sessionData));

    // ✅ Redirect to patient profile or chat
    navigate("/patient-profile");
  } else {
    // ❌ Invalid credentials
    setError("Invalid credentials. Please try again.");
  }
};


  const handleStaffLogin = (e) => {
  e.preventDefault();
  setError("");

  // ✅ Get all registered staff from localStorage
  const staffList = JSON.parse(localStorage.getItem("staffList") || "[]");

  // ✅ Check if entered email & password match any staff account
  const foundStaff = staffList.find(
    (staff) =>
      staff.email === staffCredentials.email &&
      staff.password === staffCredentials.password
  );

  if (foundStaff) {
    // ✅ Store login session
    const sessionData = {
      email: foundStaff.email,
      role: "staff",
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem("staffSession", JSON.stringify(sessionData));

    // ✅ Redirect to dashboard
    navigate("/staff-dashboard");
  } else {
    // ❌ No match found
    setError("Invalid credentials. Please try again.");
  }
};


  const handleAdminLogin = (e) => {
  e.preventDefault();
  setError("");

  // ✅ Hardcoded admin login
  if (
    adminCredentials.email === "guptashridhi11@gmail.com" &&
    adminCredentials.password === "shridhii"
  ) {
    const sessionData = {
      email: adminCredentials.email,
      role: "admin",
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem("adminSession", JSON.stringify(sessionData));
    navigate("/admin-dashboard");
    return;
  }

  // ✅ Check dynamically created admins from localStorage
  const admins = JSON.parse(localStorage.getItem("admins") || "[]");
  const foundAdmin = admins.find(
    (admin) =>
      admin.email === adminCredentials.email &&
      admin.password === adminCredentials.password
  );

  if (foundAdmin) {
    localStorage.setItem(
      "adminSession",
      JSON.stringify({
        email: adminCredentials.email,
        role: "admin",
        loginTime: new Date().toISOString(),
      })
    );
    navigate("/admin-dashboard");
  } else {
    setError("Invalid credentials. Please try again.");
  }
};


  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "sans-serif",
    padding: "2rem"
  };

  const cardStyle = {
    background: "#fff",
    padding: "2.5rem",
    borderRadius: "1.5rem",
    boxShadow: "0 20px 60px rgba(14,165,233,0.15)",
    width: "100%",
    maxWidth: "450px"
  };

  const tabContainerStyle = {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "2rem",
    background: "#f1f5f9",
    padding: "0.5rem",
    borderRadius: "0.75rem"
  };

  const tabStyle = (isActive) => ({
    flex: 1,
    padding: "0.75rem",
    border: "none",
    borderRadius: "0.5rem",
    background: isActive ? "#0ea5e9" : "transparent",
    color: isActive ? "#fff" : "#64748b",
    fontWeight: "600",
    fontSize: "0.95rem",
    cursor: "pointer",
    transition: "all 0.3s"
  });

  const inputStyle = {
    width: "100%",
    padding: "0.875rem 1rem",
    borderRadius: "0.5rem",
    border: "1px solid #e2e8f0",
    fontSize: "1rem",
    marginBottom: "1rem",
    boxSizing: "border-box",
    outline: "none"
  };

  const buttonStyle = {
    width: "100%",
    background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "0.75rem",
    padding: "1rem",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "0.5rem",
    boxShadow: "0 8px 20px rgba(14,165,233,0.3)"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ 
            fontSize: "2rem", 
            fontWeight: "800", 
            color: "#0f172a",
            marginBottom: "0.5rem"
          }}>
            Welcome Back
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.95rem" }}>
            Login to access your account
          </p>
        </div>

        {/* Tabs */}
        <div style={tabContainerStyle}>
          <button
            onClick={() => { setActiveTab("patient"); setError(""); }}
            style={tabStyle(activeTab === "patient")}
          >
            Patient
          </button>
          <button
            onClick={() => { setActiveTab("staff"); setError(""); }}
            style={tabStyle(activeTab === "staff")}
          >
            Staff
          </button>
          <button
            onClick={() => { setActiveTab("admin"); setError(""); }}
            style={tabStyle(activeTab === "admin")}
          >
            Admin
          </button>
        </div>

        {/* Patient Login */}
        {activeTab === "patient" && (
          <form onSubmit={handlePatientLogin}>
            <div>
              <label style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                color: "#374151",
                fontWeight: "500",
                fontSize: "0.9rem"
              }}>
                Patient ID
              </label>
              <input
                type="text"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                style={inputStyle}
                placeholder="Enter your 7-digit Patient ID"
                required
              />
            </div>

            {error && (
              <div style={{ 
                color: "#dc2626", 
                background: "#fef2f2",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                marginBottom: "1rem",
                fontSize: "0.875rem",
                textAlign: "center"
              }}>
                {error}
              </div>
            )}

            <button type="submit" style={buttonStyle}>
              Login as Patient
            </button>

            <div style={{ 
              textAlign: "center", 
              marginTop: "1.5rem",
              fontSize: "0.875rem",
              color: "#64748b"
            }}>
              Don't have an account?{" "}
              <a href="/staff-signup" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: "600" }}>
                Register as Staff
              </a>
            </div>
          </form>
        )}

        {/* Staff Login */}
        {activeTab === "staff" && (
          <form onSubmit={handleStaffLogin}>
            <div>
              <label style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                color: "#374151",
                fontWeight: "500",
                fontSize: "0.9rem"
              }}>
                Email
              </label>
              <input
                type="email"
                value={staffCredentials.email}
                onChange={(e) => setStaffCredentials(prev => ({ ...prev, email: e.target.value }))}
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
                fontWeight: "500",
                fontSize: "0.9rem"
              }}>
                Password
              </label>
              <input
                type="password"
                value={staffCredentials.password}
                onChange={(e) => setStaffCredentials(prev => ({ ...prev, password: e.target.value }))}
                style={inputStyle}
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div style={{ 
                color: "#dc2626", 
                background: "#fef2f2",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                marginBottom: "1rem",
                fontSize: "0.875rem",
                textAlign: "center"
              }}>
                {error}
              </div>
            )}

            <button type="submit" style={buttonStyle}>
              Login as Staff
            </button>

            <div style={{ 
              textAlign: "center", 
              marginTop: "1.5rem",
              fontSize: "0.875rem",
              color: "#64748b"
            }}>
              Don't have an account?{" "}
              <a href="/staff-signup" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: "600" }}>
                Register Here
              </a>
            </div>
          </form>
        )}

        {/* Admin Login */}
        {activeTab === "admin" && (
          <form onSubmit={handleAdminLogin}>
            <div>
              <label style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                color: "#374151",
                fontWeight: "500",
                fontSize: "0.9rem"
              }}>
                Admin Email
              </label>
              <input
                type="email"
                value={adminCredentials.email}
                onChange={(e) => setAdminCredentials(prev => ({ ...prev, email: e.target.value }))}
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
                fontWeight: "500",
                fontSize: "0.9rem"
              }}>
                Password
              </label>
              <input
                type="password"
                value={adminCredentials.password}
                onChange={(e) => setAdminCredentials(prev => ({ ...prev, password: e.target.value }))}
                style={inputStyle}
                placeholder="Enter admin password"
                required
              />
            </div>

            {error && (
              <div style={{ 
                color: "#dc2626", 
                background: "#fef2f2",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                marginBottom: "1rem",
                fontSize: "0.875rem",
                textAlign: "center"
              }}>
                {error}
              </div>
            )}

            <button type="submit" style={buttonStyle}>
              Login as Admin
            </button>
          </form>
        )}

        <div style={{ 
          textAlign: "center", 
          marginTop: "2rem",
          fontSize: "0.875rem",
          color: "#64748b"
        }}>
          <a href="/" style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: "500" }}>
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
