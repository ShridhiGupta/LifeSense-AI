import React, { useState } from "react";
import { saveProfile } from "./utils/api.js";
import { useNavigate } from "react-router-dom";

function generatePatientId() {
  return Math.floor(1000000 + Math.random() * 9000000); // Generates a random 7-digit number
}

function PatientForm() {
  const [form, setForm] = useState({
    patientId: generatePatientId().toString(),
    name: "",
    age: "",
    gender: "",
    condition: "",
    recoveryPeriod: "",
    currentStage: "",
    doctorsNotes: "",
    medications: "",
    prescription: "",
    exercises: "",
    diet: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    
    try {
      // Send form data to our Netlify function (MongoDB)
      const response = await saveProfile(form);
      console.log("Save response:", response);
      
      if (response.success) {
        // Also save to localStorage for client-side functionality
        const allPatients = JSON.parse(localStorage.getItem("allPatients") || "[]");
        const existingIndex = allPatients.findIndex(p => p.patientId === form.patientId);
        
        if (existingIndex >= 0) {
          allPatients[existingIndex] = form;
        } else {
          allPatients.push(form);
        }
        
        localStorage.setItem("allPatients", JSON.stringify(allPatients));
        
        setSaving(false);
        setSaved(true);
        
        // Redirect to patient login after saving
        setTimeout(() => {
          navigate("/patient-login");
        }, 1500);
      } else {
        throw new Error(response.error || "Failed to save patient data");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to save patient data. Please try again.");
      setSaving(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    border: "1px solid #cbd5e1",
    fontSize: "1rem",
    height: 44,
    boxSizing: "border-box",
  };

  const labelStyle = { fontWeight: 600, color: "#0f172a", marginBottom: "0.4rem" };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e0f2fe 0%, #f1f5f9 100%)",
      fontFamily: "sans-serif",
      padding: "2rem 1rem",
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto", background: "#fff", padding: "2rem", borderRadius: "1rem", boxShadow: "0 10px 30px rgba(2,6,23,0.06)" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", marginBottom: "1rem" }}>Patient Information</h1>
        <p style={{ color: "#334155", marginBottom: "1.5rem" }}>Provide details to personalize guidance.</p>
        
        <div style={{ 
          background: "#f0f9ff", 
          borderLeft: "4px solid #0ea5e9", 
          padding: "1rem", 
          marginBottom: "1.5rem",
          borderRadius: "0.5rem"
        }}>
          <p style={{ margin: 0, fontWeight: 600, color: "#0f172a" }}>Patient ID: <span style={{ fontFamily: 'monospace', color: '#2563eb' }}>{form.patientId}</span></p>
          <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.875rem", color: "#475569" }}>
            Please save this ID. It will be required for future logins.
          </p>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label style={labelStyle}>Name</label>
            <input name="name" value={form.name} onChange={handleChange} style={inputStyle} placeholder="Rohan Sharma" />
          </div>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label style={labelStyle}>Age</label>
            <input name="age" value={form.age} onChange={handleChange} style={inputStyle} placeholder="42 years" />
          </div>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label style={labelStyle}>Gender</label>
            <input name="gender" value={form.gender} onChange={handleChange} style={inputStyle} placeholder="Male/Female/Other" />
          </div>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label style={labelStyle}>Disease/Condition</label>
            <input name="condition" value={form.condition} onChange={handleChange} style={inputStyle} placeholder="Post-operative knee replacement" />
          </div>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label style={labelStyle}>Recovery Period</label>
            <input name="recoveryPeriod" value={form.recoveryPeriod} onChange={handleChange} style={inputStyle} placeholder="e.g., 2.5 months" />
          </div>
          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label style={labelStyle}>Current Stage</label>
            <input name="currentStage" value={form.currentStage} onChange={handleChange} style={inputStyle} placeholder="Week 3 (mild swelling, using walker)" />
          </div>

          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label style={labelStyle}>Doctor's Notes</label>
            <textarea name="doctorsNotes" value={form.doctorsNotes} onChange={handleChange} style={{ ...inputStyle, minHeight: 120, height: 120, resize: "none" }} placeholder={"- Avoid climbing stairs for 6 weeks\n- Physiotherapy daily\n- Elevate knee when resting\n- Contact doctor for severe pain"} />
          </div>

          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label style={labelStyle}>Medications</label>
            <textarea name="medications" value={form.medications} onChange={handleChange} style={{ ...inputStyle, minHeight: 120, height: 120, resize: "none" }} placeholder={"- Paracetamol 500 mg, 2x daily after meals\n- Amoxicillin 500 mg, 3x daily for 7 days\n- Vitamin D & Calcium supplements, once daily"} />
          </div>

          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label style={labelStyle}>Prescription</label>
            <textarea
              name="prescription"
              value={form.prescription}
              onChange={handleChange}
              style={{ ...inputStyle, minHeight: 120, height: 120, resize: "none" }}
              placeholder={"- Drug name, dosage, frequency\n- e.g., Ibuprofen 400 mg, 2x daily after meals\n- Notes: Take with water; stop if stomach upset"}
            />
          </div>

          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label style={labelStyle}>Physiotherapy Exercises</label>
            <textarea name="exercises" value={form.exercises} onChange={handleChange} style={{ ...inputStyle, minHeight: 120, height: 120, resize: "none" }} placeholder={"- Knee bends (3x10) twice daily\n- Leg raises (3x15) once daily\n- Walking with walker - 10 min, 3x daily"} />
          </div>

          <div style={{ display: "grid", gap: "0.5rem" }}>
            <label style={labelStyle}>Dietary Instructions</label>
            <textarea name="diet" value={form.diet} onChange={handleChange} style={{ ...inputStyle, minHeight: 120, height: 120, resize: "none" }} placeholder={"- High protein diet (egg, fish, lentils)\n- Avoid oily and spicy food\n- 2-3 liters of water daily"} />
          </div>

          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginTop: "0.5rem" }}>
            <button type="submit" disabled={saving} style={{
              background: "linear-gradient(90deg, #38bdf8 0%, #2563eb 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "0.75rem",
              padding: "0.8rem 1.4rem",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(56,189,248,0.25)",
            }}>
              {saving ? "Saving..." : "Save Patient Info"}
            </button>
            {saved && <span style={{ color: "#16a34a", fontWeight: 600 }}>Saved! Redirecting to login...</span>}
            {error && <span style={{ color: "#dc2626" }}>{error}</span>}
          </div>

          <div style={{ marginTop: "0.5rem" }}>
            <a href="/" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>← Back to Home</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PatientForm;
