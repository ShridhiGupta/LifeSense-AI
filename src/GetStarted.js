import React, { useState } from "react";
import logo from "./logo.jpeg"; // Logo for navbar
import ChatWindow from "./components/ChatWindow.js";
import InputBox from "./components/InputBox.js";

function GetStarted() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hello! I'm your comprehensive AI medical assistant.\n\nI can help you with:\n• General medical and health-related questions\n• Information about diseases, symptoms, and treatments\n• Healthy lifestyle practices and preventive care\n• Medication information and uses\n• Guidance on when to seek professional medical help\n• Recovery support for surgeries or illnesses\n• Wellness and nutrition advice\n\n⚠️ Important: I provide health information and guidance, but I am NOT a substitute for professional medical consultation. For emergencies, please call emergency services immediately.\n\nHow can I assist you today?" }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setLoading(true);
    
    console.log('📤 Sending message to API:', text);
    console.log('API URL: http://localhost:3001/api/chat');
    
    try {
      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientId: "general", message: text }),
      });
      
      console.log('📥 Response status:', res.status, res.statusText);
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      const data = await res.json();
      console.log('✅ Response data:', data);
      console.log('Bot response:', data.response);
      
      setMessages((prev) => [...prev, { sender: "bot", text: data.response || "I'm here to help!" }]);
    } catch (err) {
      console.error("❌ Chat error:", err);
      console.error("Error details:", err.message);
      
      // Show specific error message
      let errorMessage = "⚠️ Sorry, I'm having trouble connecting to the server. ";
      
      if (err.message.includes('Failed to fetch')) {
        errorMessage += "Please make sure the server is running (node server.js).";
      } else if (err.message.includes('HTTP 500')) {
        errorMessage += "The server encountered an error. Check the server console for details.";
      } else {
        errorMessage += err.message;
      }
      
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: errorMessage }
      ]);
    }
    setLoading(false);
  };
  
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        fontFamily: "'Inter', -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >

      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.2rem 3rem",
          background: "#ffffff",
          borderBottom: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          fontWeight: "800", 
          fontSize: "1.5rem", 
          color: "#667eea",
        }}>
          <img src={logo} alt="LifeSense AI Logo" style={{ 
            width: 45, 
            height: 45, 
            marginRight: "0.8rem",
            borderRadius: "50%",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }} />
          LifeSense AI
        </div>
        <div style={{ display: "flex", gap: "1rem", fontSize: "1rem", alignItems: "center" }}>
          <a href="/" style={{ 
            color: "#ffffff", 
            textDecoration: "none", 
            fontWeight: "600",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "0.6rem 1.5rem",
            borderRadius: "10px",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(102, 126, 234, 0.3)";
          }}
          >Home</a>
          <a href="/login" style={{ 
            color: "#ffffff", 
            textDecoration: "none", 
            fontWeight: "600",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "0.6rem 1.5rem",
            borderRadius: "10px",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(102, 126, 234, 0.3)";
          }}
          >Login</a>
        </div>
      </nav>

      {/* Main Section */}
      <main style={{ 
        flex: 1,
        display: "flex",
        justifyContent: "center",
        padding: "0",
        background: "#ffffff",
      }}>
        <div className="app-container" style={{ 
          maxWidth: "1200px",
          width: "100%",
          height: "calc(100vh - 90px)",
          display: "flex",
          flexDirection: "column",
        }}>
          <ChatWindow messages={messages} loading={loading} />
          <InputBox onSend={handleSend} disabled={loading} />
        </div>
      </main>
    </div>
  );
}

export default GetStarted;