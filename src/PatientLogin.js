import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PatientLogin() {
  const [patientId, setPatientId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Get all patients from localStorage
    const allPatients = JSON.parse(localStorage.getItem("allPatients") || "[]");
    const patient = allPatients.find(p => p.id === patientId);

    if (patient) {
      // Store patient session in localStorage
      localStorage.setItem("patientSession", JSON.stringify({
        id: patient.id,
        name: patient.name,
        loginTime: new Date().toISOString()
      }));
      navigate("/patient-profile");
    } else {
      setError("Patient ID not found. Please check your ID and try again.");
    }
  };

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
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
    background: "linear-gradient(90deg, #06b6d4 0%, #0891b2 100%)",
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
          Patient Login
        </h1>
        
        <p style={{ 
          textAlign: "center", 
          color: "#6b7280", 
          marginBottom: "2rem",
          fontSize: "0.875rem"
        }}>
          Enter your Patient ID to access your profile and chatbot
        </p>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ 
              display: "block", 
              marginBottom: "0.5rem", 
              color: "#374151",
              fontWeight: "500"
            }}>
              Patient ID
            </label>
            <input
              type="text"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              style={inputStyle}
              placeholder="Enter your Patient ID"
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
            Login as Patient
          </button>
        </form>
        
        <div style={{ 
          textAlign: "center", 
          marginTop: "1.5rem",
          fontSize: "0.875rem",
          color: "#6b7280"
        }}>
          <a href="/" style={{ color: "#06b6d4", textDecoration: "none" }}>
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default PatientLogin;
