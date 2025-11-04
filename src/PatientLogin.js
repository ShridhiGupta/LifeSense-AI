import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPatientData } from "./utils/api.js";

function PatientLogin() {
  const [patientId, setPatientId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Try to get patient data from MongoDB first
      const response = await getPatientData(patientId);
      console.log("Login response:", response);
      
      if (response.success && response.patient) {
        const patient = response.patient;
        
        // Store patient session in localStorage
        localStorage.setItem("patientSession", JSON.stringify({
          id: patient.patient_id,
          name: patient.name,
          loginTime: new Date().toISOString()
        }));
        
        // Also store in allPatients for consistency
        const allPatients = JSON.parse(localStorage.getItem("allPatients") || "[]");
        const existingIndex = allPatients.findIndex(p => p.patientId === patient.patient_id);
        
        const patientData = {
          patientId: patient.patient_id,
          name: patient.name,
          age: patient.age,
          gender: patient.gender,
          condition: patient.condition,
          recoveryPeriod: patient.recovery_period,
          currentStage: patient.current_stage,
          doctorsNotes: patient.doctors_notes,
          medications: patient.medications,
          prescription: patient.prescription,
          exercises: patient.exercises,
          diet: patient.diet
        };
        
        if (existingIndex >= 0) {
          allPatients[existingIndex] = patientData;
        } else {
          allPatients.push(patientData);
        }
        
        localStorage.setItem("allPatients", JSON.stringify(allPatients));
        
        navigate("/patient-chat");
      } else {
        setError("Patient ID not found. Please check your ID and try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      // Fallback to localStorage if MongoDB is not accessible
      const allPatients = JSON.parse(localStorage.getItem("allPatients") || "[]");
      const patient = allPatients.find(p => p.patientId === patientId);
      
      if (patient) {
        // Store patient session in localStorage
        localStorage.setItem("patientSession", JSON.stringify({
          id: patient.patientId,
          name: patient.name,
          loginTime: new Date().toISOString()
        }));
        navigate("/patient-chat");
      } else {
        setError("Patient ID not found. Please check your ID and try again.");
      }
    } finally {
      setLoading(false);
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
    background: loading ? "#94a3b8" : "linear-gradient(90deg, #06b6d4 0%, #0891b2 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "0.5rem",
    padding: "0.75rem",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: loading ? "not-allowed" : "pointer",
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
              disabled={loading}
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
          
          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Logging in..." : "Login as Patient"}
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
