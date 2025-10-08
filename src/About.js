import React from "react";
import { useNavigate } from "react-router-dom";
import HomepageChatbot from "./components/HomepageChatbot";

function About() {
  const navigate = useNavigate();

  const values = [
    {
      icon: "❤️",
      title: "Patient-Centered Care",
      description: "Every feature is designed with patients' needs and comfort in mind."
    },
    {
      icon: "🔬",
      title: "Evidence-Based",
      description: "Our AI is trained on medical research and best practices."
    },
    {
      icon: "🤝",
      title: "Collaborative",
      description: "Bridging the gap between patients and healthcare providers."
    },
    {
      icon: "🌟",
      title: "Innovation",
      description: "Continuously improving with the latest AI technology."
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
          <span onClick={() => navigate("/features")} style={{ color: "#334155", textDecoration: "none", fontWeight: "500", cursor: "pointer" }}>Features</span>
          <span onClick={() => navigate("/about")} style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: "600", cursor: "pointer" }}>About</span>
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
        padding: "4rem 2rem",
        maxWidth: "900px",
        margin: "0 auto"
      }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "800",
          color: "#0f172a",
          marginBottom: "1.5rem",
          lineHeight: 1.2
        }}>
          Transforming Healthcare with{" "}
          <span style={{ 
            background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            AI Innovation
          </span>
        </h1>
        
        <p style={{
          fontSize: "1.15rem",
          color: "#64748b",
          lineHeight: 1.8,
          maxWidth: "700px",
          margin: "0 auto"
        }}>
          LifeSense AI was created with a simple mission: to make personalized healthcare guidance accessible to everyone, anytime, anywhere.
        </p>
      </div>

      {/* Mission Section */}
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto 4rem auto",
        padding: "0 2rem"
      }}>
        <div style={{
          background: "#fff",
          borderRadius: "1.5rem",
          padding: "3rem",
          boxShadow: "0 10px 40px rgba(14,165,233,0.1)"
        }}>
          <h2 style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#0f172a",
            marginBottom: "1.5rem",
            textAlign: "center"
          }}>
            Our Mission
          </h2>
          <p style={{
            fontSize: "1.1rem",
            color: "#475569",
            lineHeight: 1.8,
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            We believe that recovery should be supported by intelligent, personalized guidance. Our AI-powered platform bridges the gap between doctor visits, providing patients with instant access to their medical information, treatment plans, and recovery advice. We're committed to making healthcare more accessible, understandable, and effective for everyone.
          </p>
        </div>
      </div>

      {/* Values Grid */}
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto 4rem auto",
        padding: "0 2rem"
      }}>
        <h2 style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: "#0f172a",
          marginBottom: "2rem",
          textAlign: "center"
        }}>
          Our Core Values
        </h2>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem"
        }}>
          {values.map((value, index) => (
            <div key={index} style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "1rem",
              boxShadow: "0 4px 20px rgba(14,165,233,0.1)",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{value.icon}</div>
              <h3 style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                color: "#0f172a",
                marginBottom: "0.75rem"
              }}>
                {value.title}
              </h3>
              <p style={{
                fontSize: "0.95rem",
                color: "#64748b",
                lineHeight: 1.6
              }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div style={{
        background: "#fff",
        padding: "4rem 2rem",
        marginBottom: "4rem"
      }}>
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "3rem",
          textAlign: "center"
        }}>
          <div>
            <div style={{
              fontSize: "3rem",
              fontWeight: "800",
              color: "#0ea5e9",
              marginBottom: "0.5rem"
            }}>
              10K+
            </div>
            <div style={{ fontSize: "1rem", color: "#64748b" }}>Active Patients</div>
          </div>
          <div>
            <div style={{
              fontSize: "3rem",
              fontWeight: "800",
              color: "#0ea5e9",
              marginBottom: "0.5rem"
            }}>
              500+
            </div>
            <div style={{ fontSize: "1rem", color: "#64748b" }}>Healthcare Providers</div>
          </div>
          <div>
            <div style={{
              fontSize: "3rem",
              fontWeight: "800",
              color: "#0ea5e9",
              marginBottom: "0.5rem"
            }}>
              95%
            </div>
            <div style={{ fontSize: "1rem", color: "#64748b" }}>Satisfaction Rate</div>
          </div>
          <div>
            <div style={{
              fontSize: "3rem",
              fontWeight: "800",
              color: "#0ea5e9",
              marginBottom: "0.5rem"
            }}>
              24/7
            </div>
            <div style={{ fontSize: "1rem", color: "#64748b" }}>AI Support</div>
          </div>
        </div>
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
          Join Our Growing Community
        </h2>
        <p style={{
          fontSize: "1.15rem",
          marginBottom: "2rem",
          opacity: 0.9
        }}>
          Experience the future of personalized healthcare today.
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

export default About;
