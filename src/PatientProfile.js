import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PatientProfile() {
  const [patient, setPatient] = useState(null);
  const [activeTab, setActiveTab] = useState("medical-info");
  const [lifestyleInfo, setLifestyleInfo] = useState({
    dailyActivities: "",
    sleepPattern: "",
    stressLevel: "",
    exerciseRoutine: "",
    dietaryPreferences: "",
    symptoms: "",
    painLevel: "",
    mood: "",
    notes: ""
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if patient is logged in
    const patientSession = localStorage.getItem("patientSession");
    if (!patientSession) {
      navigate("/patient-login");
      return;
    }

    const session = JSON.parse(patientSession);
    loadPatientData(session.id);
    loadLifestyleData(session.id);
  }, []);

  const loadPatientData = (patientId) => {
    const allPatients = JSON.parse(localStorage.getItem("allPatients") || "[]");
    const patientData = allPatients.find(p => p.id === patientId);
    setPatient(patientData);
  };

  const loadLifestyleData = (patientId) => {
    const lifestyleData = JSON.parse(localStorage.getItem(`lifestyle_${patientId}`) || "{}");
    setLifestyleInfo({
      dailyActivities: lifestyleData.dailyActivities || "",
      sleepPattern: lifestyleData.sleepPattern || "",
      stressLevel: lifestyleData.stressLevel || "",
      exerciseRoutine: lifestyleData.exerciseRoutine || "",
      dietaryPreferences: lifestyleData.dietaryPreferences || "",
      symptoms: lifestyleData.symptoms || "",
      painLevel: lifestyleData.painLevel || "",
      mood: lifestyleData.mood || "",
      notes: lifestyleData.notes || ""
    });
  };

  const handleLifestyleChange = (e) => {
    const { name, value } = e.target;
    setLifestyleInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleLifestyleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    // Save lifestyle data to localStorage
    localStorage.setItem(`lifestyle_${patient.id}`, JSON.stringify(lifestyleInfo));
    
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const logout = () => {
    localStorage.removeItem("patientSession");
    navigate("/");
  };

  if (!patient) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#F7FAFC",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Poppins', 'Inter', sans-serif"
      }}>
        <div style={{ fontSize: "1.2rem", color: "#1A202C" }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F7FAFC",
      fontFamily: "'Poppins', 'Inter', sans-serif",
      position: "relative"
    }}>
      {/* Header */}
      <div style={{
        background: "#fff",
        padding: "1.5rem 2rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        borderBottom: "2px solid #3A86FF"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ margin: 0, color: "#1A202C", fontSize: "1.75rem", fontWeight: "700" }}>
              🩺 Patient Profile
            </h1>
            <p style={{ margin: "0.5rem 0 0 0", color: "#64748b", fontSize: "1rem" }}>
              Welcome, <span style={{ fontWeight: "600", color: "#3A86FF" }}>{patient.name}</span> 👋
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button
              onClick={() => navigate("/patient-chat")}
              style={{
                background: "linear-gradient(135deg, #3A86FF 0%, #2563EB 100%)",
                color: "#fff",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.75rem",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.95rem",
                boxShadow: "0 4px 12px rgba(58,134,255,0.3)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              🧠 Chat with AI
            </button>
            <button 
              onClick={logout}
              style={{
                background: "#EF4444",
                color: "#fff",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.75rem",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.95rem"
              }}
            >
              🔴 Logout
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        background: "#fff",
        padding: "1rem 0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", display: "flex", gap: "1rem" }}>
          <button
            onClick={() => setActiveTab("medical-info")}
            style={{
              background: activeTab === "medical-info" ? "#3A86FF" : "transparent",
              color: activeTab === "medical-info" ? "#fff" : "#64748b",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.75rem",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.95rem",
              transition: "all 0.3s"
            }}
          >
            📋 Medical Information (Read-Only)
          </button>
          <button
            onClick={() => setActiveTab("lifestyle-info")}
            style={{
              background: activeTab === "lifestyle-info" ? "#3A86FF" : "transparent",
              color: activeTab === "lifestyle-info" ? "#fff" : "#64748b",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.75rem",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.95rem",
              transition: "all 0.3s"
            }}
          >
            🌟 Lifestyle Information (Editable)
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{
        padding: "2rem",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {activeTab === "medical-info" && (
          <div>
            <p style={{ 
              color: "#64748b", 
              marginBottom: "1.5rem", 
              fontSize: "0.95rem",
              background: "#FEF3C7",
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              borderLeft: "4px solid #F59E0B"
            }}>
              ℹ️ This information was provided by your healthcare staff and cannot be edited.
            </p>
            
            {/* Basic Information Card */}
            <div style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "1rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              marginBottom: "1.5rem"
            }}>
              <h3 style={{ margin: "0 0 1rem 0", color: "#1A202C", fontSize: "1.25rem", fontWeight: "700" }}>
                👤 Basic Information
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <p style={{ margin: 0, color: "#94A3B8", fontSize: "0.85rem", marginBottom: "0.25rem" }}>Name</p>
                  <p style={{ margin: 0, color: "#1A202C", fontWeight: "600", fontSize: "1rem" }}>{patient.name}</p>
                </div>
                <div>
                  <p style={{ margin: 0, color: "#94A3B8", fontSize: "0.85rem", marginBottom: "0.25rem" }}>Gender</p>
                  <p style={{ margin: 0, color: "#1A202C", fontWeight: "600", fontSize: "1rem" }}>{patient.gender}</p>
                </div>
                <div>
                  <p style={{ margin: 0, color: "#94A3B8", fontSize: "0.85rem", marginBottom: "0.25rem" }}>Age</p>
                  <p style={{ margin: 0, color: "#1A202C", fontWeight: "600", fontSize: "1rem" }}>{patient.age} years</p>
                </div>
                <div>
                  <p style={{ margin: 0, color: "#94A3B8", fontSize: "0.85rem", marginBottom: "0.25rem" }}>Condition</p>
                  <p style={{ margin: 0, color: "#1A202C", fontWeight: "600", fontSize: "1rem" }}>{patient.condition}</p>
                </div>
              </div>
            </div>

            {/* Recovery Information Card */}
            {patient.recoveryPeriod && (
              <div style={{
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "1rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                marginBottom: "1.5rem"
              }}>
                <h3 style={{ margin: "0 0 1rem 0", color: "#1A202C", fontSize: "1.25rem", fontWeight: "700" }}>
                  📊 Recovery Information
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <p style={{ margin: 0, color: "#94A3B8", fontSize: "0.85rem", marginBottom: "0.25rem" }}>Recovery Period</p>
                    <p style={{ margin: 0, color: "#1A202C", fontWeight: "600", fontSize: "1rem" }}>{patient.recoveryPeriod}</p>
                  </div>
                  {patient.currentStage && (
                    <div>
                      <p style={{ margin: 0, color: "#94A3B8", fontSize: "0.85rem", marginBottom: "0.25rem" }}>Current Stage</p>
                      <p style={{ margin: 0, color: "#1A202C", fontWeight: "600", fontSize: "1rem" }}>{patient.currentStage}</p>
                    </div>
                  )}
                </div>
                <div style={{ 
                  marginTop: "1rem", 
                  padding: "0.75rem", 
                  background: "#F0F9FF", 
                  borderRadius: "0.5rem",
                  fontSize: "0.85rem",
                  color: "#0369A1"
                }}>
                  <strong>Added by:</strong> {patient.addedBy} on {new Date(patient.addedAt).toLocaleDateString()}
                </div>
              </div>
            )}

            {/* Additional Medical Cards */}
            {patient.doctorsNotes && (
              <div style={{
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "1rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                marginBottom: "1.5rem"
              }}>
                <h3 style={{ margin: "0 0 1rem 0", color: "#1A202C", fontSize: "1.25rem", fontWeight: "700" }}>
                  📝 Doctor's Notes
                </h3>
                <p style={{ margin: 0, color: "#64748b", whiteSpace: "pre-line", lineHeight: "1.6" }}>{patient.doctorsNotes}</p>
              </div>
            )}

            {patient.medications && (
              <div style={{
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "1rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                marginBottom: "1.5rem"
              }}>
                <h3 style={{ margin: "0 0 1rem 0", color: "#1A202C", fontSize: "1.25rem", fontWeight: "700" }}>
                  💊 Medications
                </h3>
                <p style={{ margin: 0, color: "#64748b", whiteSpace: "pre-line", lineHeight: "1.6" }}>{patient.medications}</p>
              </div>
            )}

            {patient.exercises && (
              <div style={{
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "1rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                marginBottom: "1.5rem"
              }}>
                <h3 style={{ margin: "0 0 1rem 0", color: "#1A202C", fontSize: "1.25rem", fontWeight: "700" }}>
                  🏋️ Physiotherapy Exercises
                </h3>
                <p style={{ margin: 0, color: "#64748b", whiteSpace: "pre-line", lineHeight: "1.6" }}>{patient.exercises}</p>
              </div>
            )}

            {patient.diet && (
              <div style={{
                background: "#fff",
                padding: "1.5rem",
                borderRadius: "1rem",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                marginBottom: "1.5rem"
              }}>
                <h3 style={{ margin: "0 0 1rem 0", color: "#1A202C", fontSize: "1.25rem", fontWeight: "700" }}>
                  🥗 Dietary Instructions
                </h3>
                <p style={{ margin: 0, color: "#64748b", whiteSpace: "pre-line", lineHeight: "1.6" }}>{patient.diet}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "lifestyle-info" && (
          <div>
            <p style={{ 
              color: "#64748b", 
              marginBottom: "1.5rem", 
              fontSize: "0.95rem",
              background: "#DBEAFE",
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              borderLeft: "4px solid #3A86FF"
            }}>
              ✏️ Update your lifestyle information to help the AI provide more personalized guidance.
            </p>
            
            <div style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "1rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
            }}>
              <form onSubmit={handleLifestyleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                      Daily Activities
                    </label>
                    <textarea
                      name="dailyActivities"
                      value={lifestyleInfo.dailyActivities}
                      onChange={handleLifestyleChange}
                      style={{
                        width: "100%",
                        padding: "0.875rem",
                        borderRadius: "0.75rem",
                        border: "2px solid #E2E8F0",
                        fontSize: "0.95rem",
                        minHeight: "100px",
                        resize: "vertical",
                        boxSizing: "border-box",
                        fontFamily: "'Poppins', 'Inter', sans-serif",
                        outline: "none"
                      }}
                      placeholder="Describe your daily routine and activities"
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                      Sleep Pattern
                    </label>
                    <textarea
                      name="sleepPattern"
                      value={lifestyleInfo.sleepPattern}
                      onChange={handleLifestyleChange}
                      style={{
                        width: "100%",
                        padding: "0.875rem",
                        borderRadius: "0.75rem",
                        border: "2px solid #E2E8F0",
                        fontSize: "0.95rem",
                        minHeight: "100px",
                        resize: "vertical",
                        boxSizing: "border-box",
                        fontFamily: "'Poppins', 'Inter', sans-serif",
                        outline: "none"
                      }}
                      placeholder="Describe your sleep schedule and quality"
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                      Stress Level (1-10)
                    </label>
                    <input
                      type="number"
                      name="stressLevel"
                      value={lifestyleInfo.stressLevel}
                      onChange={handleLifestyleChange}
                      style={{
                        width: "100%",
                        padding: "0.875rem",
                        borderRadius: "0.75rem",
                        border: "2px solid #E2E8F0",
                        fontSize: "0.95rem",
                        boxSizing: "border-box",
                        fontFamily: "'Poppins', 'Inter', sans-serif",
                        outline: "none"
                      }}
                      placeholder="Rate your stress level from 1-10"
                      min="1"
                      max="10"
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                      Pain Level (1-10)
                    </label>
                    <input
                      type="number"
                      name="painLevel"
                      value={lifestyleInfo.painLevel}
                      onChange={handleLifestyleChange}
                      style={{
                        width: "100%",
                        padding: "0.875rem",
                        borderRadius: "0.75rem",
                        border: "2px solid #E2E8F0",
                        fontSize: "0.95rem",
                        boxSizing: "border-box",
                        fontFamily: "'Poppins', 'Inter', sans-serif",
                        outline: "none"
                      }}
                      placeholder="Rate your pain level from 1-10"
                      min="1"
                      max="10"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                    Exercise Routine
                  </label>
                  <textarea
                    name="exerciseRoutine"
                    value={lifestyleInfo.exerciseRoutine}
                    onChange={handleLifestyleChange}
                    style={{
                      width: "100%",
                      padding: "0.875rem",
                      borderRadius: "0.75rem",
                      border: "2px solid #E2E8F0",
                      fontSize: "0.95rem",
                      minHeight: "100px",
                      resize: "vertical",
                      boxSizing: "border-box",
                      fontFamily: "'Poppins', 'Inter', sans-serif",
                      outline: "none"
                    }}
                    placeholder="Describe your current exercise routine"
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                    Dietary Preferences
                  </label>
                  <textarea
                    name="dietaryPreferences"
                    value={lifestyleInfo.dietaryPreferences}
                    onChange={handleLifestyleChange}
                    style={{
                      width: "100%",
                      padding: "0.875rem",
                      borderRadius: "0.75rem",
                      border: "2px solid #E2E8F0",
                      fontSize: "0.95rem",
                      minHeight: "100px",
                      resize: "vertical",
                      boxSizing: "border-box",
                      fontFamily: "'Poppins', 'Inter', sans-serif",
                      outline: "none"
                    }}
                    placeholder="Describe your dietary preferences and restrictions"
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                      Current Symptoms
                    </label>
                    <textarea
                      name="symptoms"
                      value={lifestyleInfo.symptoms}
                      onChange={handleLifestyleChange}
                      style={{
                        width: "100%",
                        padding: "0.875rem",
                        borderRadius: "0.75rem",
                        border: "2px solid #E2E8F0",
                        fontSize: "0.95rem",
                        minHeight: "100px",
                        resize: "vertical",
                        boxSizing: "border-box",
                        fontFamily: "'Poppins', 'Inter', sans-serif",
                        outline: "none"
                      }}
                      placeholder="Describe any current symptoms"
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                      Mood
                    </label>
                    <textarea
                      name="mood"
                      value={lifestyleInfo.mood}
                      onChange={handleLifestyleChange}
                      style={{
                        width: "100%",
                        padding: "0.875rem",
                        borderRadius: "0.75rem",
                        border: "2px solid #E2E8F0",
                        fontSize: "0.95rem",
                        minHeight: "100px",
                        resize: "vertical",
                        boxSizing: "border-box",
                        fontFamily: "'Poppins', 'Inter', sans-serif",
                        outline: "none"
                      }}
                      placeholder="Describe your current mood and emotional state"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", color: "#374151", fontWeight: "500" }}>
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    value={lifestyleInfo.notes}
                    onChange={handleLifestyleChange}
                    style={{
                      width: "100%",
                      padding: "0.875rem",
                      borderRadius: "0.75rem",
                      border: "2px solid #E2E8F0",
                      fontSize: "0.95rem",
                      minHeight: "100px",
                      resize: "vertical",
                      boxSizing: "border-box",
                      fontFamily: "'Poppins', 'Inter', sans-serif",
                      outline: "none"
                    }}
                    placeholder="Any additional information you'd like to share"
                  />
                </div>

                <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: "1.5rem" }}>
                  <button 
                    type="submit" 
                    disabled={saving}
                    style={{
                      background: saving ? "#CBD5E0" : "linear-gradient(135deg, #3A86FF 0%, #2563EB 100%)",
                      color: "#fff",
                      border: "none",
                      padding: "0.875rem 2rem",
                      borderRadius: "0.75rem",
                      cursor: saving ? "not-allowed" : "pointer",
                      fontWeight: "600",
                      fontSize: "0.95rem",
                      boxShadow: saving ? "none" : "0 4px 12px rgba(58,134,255,0.3)"
                    }}
                  >
                    {saving ? "Saving..." : "💾 Save Lifestyle Info"}
                  </button>
                  {saved && (
                    <span style={{ 
                      color: "#059669", 
                      fontWeight: "600",
                      background: "#D1FAE5",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem"
                    }}>
                      ✓ Lifestyle information saved!
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Floating AI Chat Icon */}
      {showChatIcon && (
        <div
          onClick={() => navigate("/patient-chat")}
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            width: "60px",
            height: "60px",
            background: "linear-gradient(135deg, #3A86FF 0%, #2563EB 100%)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(58,134,255,0.4)",
            fontSize: "1.75rem",
            transition: "transform 0.3s",
            zIndex: 1000
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          title="Chat with AI Assistant"
        >
          🧠
        </div>
      )}
    </div>
  );
}

export default PatientProfile;
