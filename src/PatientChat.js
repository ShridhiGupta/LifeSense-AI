import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendChatMessage, getPatientData } from "./utils/api.js";

function PatientChat() {
  const [messages, setMessages] = useState([
    { 
      sender: "bot", 
      text: "Welcome back! 👋 I'm here to support your wellness journey. What can I help you with today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const patientSession = localStorage.getItem("patientSession");
    if (!patientSession) {
      navigate("/patient-login");
      return;
    }

    const session = JSON.parse(patientSession);
    loadPatientData(session.id);
  }, []);

  const loadPatientData = async (patientId) => {
    try {
      // Try to get patient data from MongoDB
      const response = await getPatientData(patientId);
      console.log("Patient data response:", response);
      
      if (response.success && response.patient) {
        setPatient({
          patientId: response.patient.patient_id,
          name: response.patient.name,
          age: response.patient.age,
          gender: response.patient.gender,
          condition: response.patient.condition,
          recoveryPeriod: response.patient.recovery_period,
          currentStage: response.patient.current_stage,
          doctorsNotes: response.patient.doctors_notes,
          medications: response.patient.medications,
          prescription: response.patient.prescription,
          exercises: response.patient.exercises,
          diet: response.patient.diet
        });
      } else {
        // Fallback to localStorage
        const allPatients = JSON.parse(localStorage.getItem("allPatients") || "[]");
        const patientData = allPatients.find(p => p.patientId === patientId);
        console.log("Patient data from localStorage:", patientData);
        setPatient(patientData);
      }
    } catch (error) {
      console.error("Error loading patient data:", error);
      // Fallback to localStorage
      const allPatients = JSON.parse(localStorage.getItem("allPatients") || "[]");
      const patientData = allPatients.find(p => p.patientId === patientId);
      console.log("Patient data from localStorage:", patientData);
      setPatient(patientData);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() || loading) return;
    
    if (!patient) {
      console.error("Patient data not loaded");
      setMessages((prev) => [...prev, {
        sender: "bot",
        text: "Sorry, I couldn't load your medical information. Please try refreshing the page.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      return;
    }

    const userMessage = {
      sender: "user",
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setLoading(true);

    try {
      // Send message to our API with patient ID and full patient data
      const response = await sendChatMessage(inputText, patient.patientId, patient);
      console.log("Chat response:", response);
      
      if (response.success) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: response.response || "I'm sorry, I couldn't process your request at the moment.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        throw new Error(response.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "I'm having trouble connecting to the server. Please try again later.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
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
        <div style={{ fontSize: "1.2rem", color: "#1A202C" }}>Loading patient data...</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F7FAFC",
      fontFamily: "'Poppins', 'Inter', sans-serif",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Header */}
      <div style={{
        background: "#fff",
        padding: "1rem 2rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "2px solid #3A86FF"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.5rem" }}>🩺</span>
          <span style={{ fontSize: "1.25rem", fontWeight: "700", color: "#3A86FF" }}>LifeSense AI</span>
          <span style={{ fontSize: "1.25rem" }}>❤️</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <div style={{ fontSize: "1rem", color: "#1A202C", fontWeight: "500" }}>
            Hello, {patient.name} 👋
          </div>
          <button
            onClick={() => navigate("/patient-profile")}
            style={{
              background: "transparent",
              border: "2px solid #3A86FF",
              color: "#3A86FF",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.9rem"
            }}
          >
            My Profile
          </button>
          <button
            onClick={logout}
            style={{
              background: "#EF4444",
              border: "none",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "0.9rem"
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Chat Container */}
      <div style={{
        flex: 1,
        maxWidth: "900px",
        width: "100%",
        margin: "2rem auto",
        padding: "0 1rem",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}>
        {/* Messages Area */}
        <div style={{
          flex: 1,
          background: "#fff",
          borderRadius: "1rem 1rem 0 0",
          padding: "1.5rem",
          overflowY: "auto",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                animation: "fadeIn 0.3s ease-in"
              }}
            >
              <div style={{
                maxWidth: "70%",
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem"
              }}>
                {msg.sender === "bot" && (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.25rem"
                  }}>
                    <span style={{ fontSize: "1.5rem" }}>🤖</span>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: "600" }}>AI Assistant</span>
                  </div>
                )}
                <div style={{
                  background: msg.sender === "user" ? "#DFF6E0" : "#E3F2FD",
                  padding: "0.875rem 1.125rem",
                  borderRadius: msg.sender === "user" ? "1rem 1rem 0 1rem" : "1rem 1rem 1rem 0",
                  color: "#1A202C",
                  fontSize: "0.95rem",
                  lineHeight: "1.5",
                  boxShadow: msg.sender === "user" ? "0 2px 8px rgba(154,230,180,0.3)" : "0 2px 8px rgba(58,134,255,0.2)",
                  wordWrap: "break-word"
                }}>
                  {msg.text}
                </div>
                <div style={{
                  fontSize: "0.7rem",
                  color: "#94A3B8",
                  textAlign: msg.sender === "user" ? "right" : "left",
                  paddingLeft: msg.sender === "bot" ? "2.5rem" : "0"
                }}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div style={{
              display: "flex",
              justifyContent: "flex-start"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#E3F2FD",
                padding: "0.875rem 1.125rem",
                borderRadius: "1rem 1rem 1rem 0",
                boxShadow: "0 2px 8px rgba(58,134,255,0.2)"
              }}>
                <span style={{ fontSize: "1.2rem" }}>🤖</span>
                <div style={{ display: "flex", gap: "0.25rem" }}>
                  <span style={{ animation: "bounce 1s infinite", animationDelay: "0s" }}>●</span>
                  <span style={{ animation: "bounce 1s infinite", animationDelay: "0.2s" }}>●</span>
                  <span style={{ animation: "bounce 1s infinite", animationDelay: "0.4s" }}>●</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div style={{
          background: "#fff",
          padding: "1rem 1.5rem",
          borderRadius: "0 0 1rem 1rem",
          boxShadow: "0 -2px 12px rgba(0,0,0,0.08)",
          display: "flex",
          gap: "1rem",
          alignItems: "center"
        }}>
          <div style={{ flex: 1, position: "relative" }}>
            <span style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "1.2rem"
            }}>💬</span>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              placeholder="How are you feeling today?"
              style={{
                width: "100%",
                padding: "0.875rem 1rem 0.875rem 3rem",
                borderRadius: "0.75rem",
                border: "2px solid #E2E8F0",
                fontSize: "0.95rem",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "'Poppins', 'Inter', sans-serif",
                transition: "border-color 0.3s"
              }}
              onFocus={(e) => e.target.style.borderColor = "#3A86FF"}
              onBlur={(e) => e.target.style.borderColor = "#E2E8F0"}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={loading || !inputText.trim()}
            style={{
              background: loading || !inputText.trim() ? "#CBD5E0" : "linear-gradient(135deg, #3A86FF 0%, #2563EB 100%)",
              color: "#fff",
              border: "none",
              padding: "0.875rem 1.75rem",
              borderRadius: "0.75rem",
              cursor: loading || !inputText.trim() ? "not-allowed" : "pointer",
              fontWeight: "600",
              fontSize: "0.95rem",
              boxShadow: loading || !inputText.trim() ? "none" : "0 4px 12px rgba(58,134,255,0.3)",
              transition: "all 0.3s",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}
          >
            Send ➤
          </button>
        </div>

        {/* Privacy Note */}
        <div style={{
          textAlign: "center",
          padding: "1rem",
          fontSize: "0.75rem",
          color: "#94A3B8"
        }}>
          🔒 Your chat is private and encrypted
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}

export default PatientChat;
