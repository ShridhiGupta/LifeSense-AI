import React from "react";
import { useNavigate } from "react-router-dom";
import HomepageChatbot from "./components/HomepageChatbot.js";

function Features() {
  const navigate = useNavigate();

  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Guidance",
      description: "Get instant, personalized recovery advice powered by advanced AI technology tailored to your medical condition."
    },
    {
      icon: "📋",
      title: "Personalized Care Plans",
      description: "Access your complete medical history, prescriptions, and doctor's notes in one secure place."
    },
    {
      icon: "💊",
      title: "Medication Reminders",
      description: "Never miss a dose with intelligent medication tracking and timely reminders."
    },
    {
      icon: "🏋️",
      title: "Exercise Tracking",
      description: "Follow your physiotherapy exercises with step-by-step guidance and progress tracking."
    },
    {
      icon: "🥗",
      title: "Nutrition Guidance",
      description: "Get personalized dietary recommendations based on your recovery needs and restrictions."
    },
    {
      icon: "📊",
      title: "Progress Monitoring",
      description: "Track your recovery journey with detailed analytics and milestone achievements."
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Your health data is encrypted and protected with industry-leading security standards."
    },
    {
      icon: "⚡",
      title: "24/7 Availability",
      description: "Access your AI health assistant anytime, anywhere, for immediate support and guidance."
    },
    {
      icon: "👨‍⚕️",
      title: "Healthcare Team Portal",
      description: "Seamless collaboration between patients, staff, and healthcare providers."
    }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Navbar */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.5rem 4rem",
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}>
        <div 
          onClick={() => navigate("/")}
          style={{ fontWeight: "700", fontSize: "1.5rem", color: "#0ea5e9", cursor: "pointer" }}
        >
          Lifesense AI
        </div>
        <div style={{ display: "flex", gap: "2.5rem", fontSize: "0.95rem", alignItems: "center" }}>
          <span onClick={() => navigate("/")} style={{ color: "#334155", textDecoration: "none", fontWeight: "500", cursor: "pointer" }}>Home</span>
          <span onClick={() => navigate("/features")} style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: "600", cursor: "pointer" }}>Features</span>
          <span onClick={() => navigate("/about")} style={{ color: "#334155", textDecoration: "none", fontWeight: "500", cursor: "pointer" }}>About</span>
          <span onClick={() => navigate("/contact")} style={{ color: "#334155", textDecoration: "none", fontWeight: "500", cursor: "pointer" }}>Contact</span>
          <button
            onClick={() => navigate("/login")}
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
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        textAlign: "center",
        padding: "4rem 2rem 2rem 2rem",
        maxWidth: "900px",
        margin: "0 auto"
      }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "800",
          color: "#0f172a",
          marginBottom: "1rem",
          lineHeight: 1.2
        }}>
          Everything You Need for{" "}
          <span style={{ 
            background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Smart Recovery
          </span>
        </h1>
        
        <p style={{
          fontSize: "1.15rem",
          color: "#64748b",
          lineHeight: 1.7,
          maxWidth: "700px",
          margin: "0 auto"
        }}>
          Discover how LifeSense AI combines cutting-edge technology with personalized care to support your healing journey.
        </p>
      </div>

      {/* Features Grid */}
      <div style={{
        maxWidth: "1200px",
        margin: "3rem auto",
        padding: "0 2rem 4rem 2rem",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "2rem"
      }}>
        {features.map((feature, index) => (
          <div key={index} style={{
            background: "#fff",
            padding: "2rem",
            borderRadius: "1rem",
            boxShadow: "0 4px 20px rgba(14,165,233,0.1)",
            transition: "transform 0.3s, box-shadow 0.3s",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 10px 30px rgba(14,165,233,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(14,165,233,0.1)";
          }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{feature.icon}</div>
            <h3 style={{
              fontSize: "1.25rem",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "0.75rem"
            }}>
              {feature.title}
            </h3>
            <p style={{
              fontSize: "0.95rem",
              color: "#64748b",
              lineHeight: 1.6
            }}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div style={{
        background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
        padding: "4rem 2rem",
        textAlign: "center",
        color: "#fff"
      }}>
        <h2 style={{
          fontSize: "2.5rem",
          fontWeight: "800",
          marginBottom: "1rem"
        }}>
          Ready to Start Your Recovery Journey?
        </h2>
        <p style={{
          fontSize: "1.15rem",
          marginBottom: "2rem",
          opacity: 0.9
        }}>
          Join thousands of patients experiencing smarter, personalized recovery.
        </p>
        <button
          onClick={() => navigate("/get-started")}
          style={{
            background: "#fff",
            color: "#0ea5e9",
            border: "none",
            borderRadius: "0.75rem",
            padding: "1rem 2.5rem",
            fontSize: "1.1rem",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
          }}
        >
          Get Started Now →
        </button>
      </div>

      {/* Homepage Chatbot */}
      <HomepageChatbot />
    </div>
  );
}

export default Features;
