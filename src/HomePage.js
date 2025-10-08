import React from "react";
import { useNavigate } from "react-router-dom";
import HomepageChatbot from "./components/HomepageChatbot";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.5rem 4rem",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ fontWeight: "700", fontSize: "1.5rem", color: "#0ea5e9" }}>
          Lifesense AI
        </div>
        <div style={{ display: "flex", gap: "2.5rem", fontSize: "0.95rem", alignItems: "center" }}>
          <span onClick={() => navigate("/")} style={{ color: "#334155", textDecoration: "none", fontWeight: "500", cursor: "pointer" }}>Home</span>
          <span onClick={() => navigate("/features")} style={{ color: "#334155", textDecoration: "none", fontWeight: "500", cursor: "pointer" }}>Features</span>
          <span onClick={() => navigate("/about")} style={{ color: "#334155", textDecoration: "none", fontWeight: "500", cursor: "pointer" }}>About</span>
          <span onClick={() => navigate("/contact")} style={{ color: "#334155", textDecoration: "none", fontWeight: "500", cursor: "pointer" }}>Contact</span>
          <button
            onClick={() => navigate("/get-started")}
            style={{
              background: "#0ea5e9",
              color: "#fff",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.6rem 1.5rem",
              fontSize: "0.95rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(14,165,233,0.3)",
            }}
          >
            Start Chat
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        padding: "4rem 4rem",
        maxWidth: "1400px",
        margin: "0 auto",
        gap: "4rem"
      }}>
        {/* Left Content */}
        <div style={{ flex: 1, maxWidth: "600px" }}>
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "800",
              color: "#0f172a",
              lineHeight: 1.15,
              marginBottom: "1.5rem",
            }}
          >
            Recover smarter with{" "}
            <span style={{ 
              background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              AI-powered
            </span>{" "}
            healing
          </h1>
          
          <p style={{ 
            fontSize: "1.15rem", 
            color: "#64748b", 
            marginBottom: "2.5rem",
            lineHeight: 1.7
          }}>
            Personalized recovery guidance with AI. Get instant answers about your treatment, medications, and recovery plan.
          </p>

          <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
            <button
              onClick={() => navigate("/get-started")}
              style={{
                background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "0.75rem",
                padding: "1rem 2rem",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(14,165,233,0.3)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              Start Chat →
            </button>
            <button
              onClick={() => navigate("/login")}
              style={{
                background: "#fff",
                color: "#0ea5e9",
                border: "2px solid #0ea5e9",
                borderRadius: "0.75rem",
                padding: "1rem 2rem",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </div>

          <div style={{ 
            display: "flex", 
            gap: "2rem", 
            color: "#64748b",
            fontSize: "0.9rem",
            marginTop: "2rem"
          }}>
            <div>
              <div style={{ fontWeight: "700", fontSize: "1.5rem", color: "#0f172a" }}>24/7</div>
              <div>AI Support</div>
            </div>
            <div>
              <div style={{ fontWeight: "700", fontSize: "1.5rem", color: "#0f172a" }}>100%</div>
              <div>Personalized</div>
            </div>
            <div>
              <div style={{ fontWeight: "700", fontSize: "1.5rem", color: "#0f172a" }}>Secure</div>
              <div>& Private</div>
            </div>
          </div>
        </div>

        {/* Right Content - Image Placeholder */}
        <div style={{ 
          flex: 1,
          background: "linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)",
          borderRadius: "2rem",
          padding: "3rem",
          boxShadow: "0 20px 60px rgba(14,165,233,0.2)",
          minHeight: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative"
        }}>
          <div style={{ textAlign: "center", color: "#0369a1" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🏥</div>
            <div style={{ fontSize: "1.2rem", fontWeight: "600" }}>Your AI Health Assistant</div>
            <div style={{ fontSize: "0.9rem", marginTop: "0.5rem", color: "#64748b" }}>
              Personalized recovery guidance
            </div>
          </div>
        </div>
      </main>

      {/* Homepage Chatbot */}
      <HomepageChatbot />
    </div>
  );
}

export default HomePage;