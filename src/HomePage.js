import React from "react";
import { useNavigate } from "react-router-dom";
import HomepageChatbot from "./components/HomepageChatbot.js";

function HomePage() {
  const navigate = useNavigate();

  const features = [
    { icon: "🤖", title: "AI Health Assistant", desc: "Get recovery guidance 24/7" },
    { icon: "🧍‍♀️", title: "Patient Dashboard", desc: "View medications, progress & advice" },
    { icon: "👩‍⚕️", title: "Staff Portal", desc: "Manage and monitor patients easily" },
    { icon: "🛡️", title: "Admin Controls", desc: "Manage staff, patient data & approvals" },
    { icon: "🔒", title: "Secure Data", desc: "HIPAA-grade privacy & encryption" },
    { icon: "🌐", title: "Multi-role Access", desc: "Patient, Staff, and Admin logins" },
  ];

  const testimonials = [
    { name: "Sarah M.", role: "Patient", text: "This chatbot helped me understand my medication routine easily! Recovery has never been this organized." },
    { name: "Dr. James K.", role: "Healthcare Provider", text: "As a doctor, it saves me hours managing patient updates. Highly recommended!" },
    { name: "Emily R.", role: "Patient", text: "The personalized recovery guidance is amazing. I feel supported every step of the way." },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        fontFamily: "'Inter', -apple-system, sans-serif",
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

        {/* Right Content - Chat Preview */}
        <div style={{ 
          flex: 1,
          background: "linear-gradient(135deg, #E6F0FF 0%, #F8FBFF 100%)",
          borderRadius: "2rem",
          padding: "2.5rem",
          boxShadow: "0 20px 60px rgba(14,165,233,0.2)",
          minHeight: "500px",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          border: "1px solid rgba(59, 130, 246, 0.1)"
        }}>
          {/* Chat Header */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "2rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid rgba(59, 130, 246, 0.15)"
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
            }}>
              🤖
            </div>
            <div>
              <div style={{ fontWeight: "700", fontSize: "1.1rem", color: "#0f172a" }}>
                LifeSense AI
              </div>
              <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                Your AI Health Assistant
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* User Message */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{
                background: "#ffffff",
                padding: "1rem 1.25rem",
                borderRadius: "18px 18px 4px 18px",
                maxWidth: "80%",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                border: "1px solid #e5e7eb"
              }}>
                <div style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "0.25rem", fontWeight: "600" }}>
                  You
                </div>
                <div style={{ color: "#334155", lineHeight: 1.5 }}>
                  I just had knee surgery. How can I recover safely?
                </div>
              </div>
            </div>

            {/* AI Message */}
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div style={{
                background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
                padding: "1rem 1.25rem",
                borderRadius: "18px 18px 18px 4px",
                maxWidth: "85%",
                boxShadow: "0 2px 12px rgba(59, 130, 246, 0.15)",
                border: "1px solid rgba(59, 130, 246, 0.2)"
              }}>
                <div style={{ 
                  fontSize: "0.75rem", 
                  color: "#1e40af", 
                  marginBottom: "0.5rem", 
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}>
                  <span>🤖</span> LifeSense AI
                </div>
                <div style={{ color: "#1e3a8a", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                  Start with gentle leg lifts twice a day. Avoid stairs for 2 weeks and drink plenty of water. 💧
                </div>
                <div style={{
                  background: "rgba(255, 255, 255, 0.7)",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  color: "#1e40af",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}>
                  <span>⚕️</span>
                  <strong>Tip:</strong> Always follow your doctor's routine.
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <button
              onClick={() => navigate("/get-started")}
              style={{
                background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "1rem 2.5rem",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(14,165,233,0.3)",
                width: "100%",
                transition: "transform 0.3s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              Start Chat Now →
            </button>
            <p style={{ 
              marginTop: "1rem", 
              color: "#64748b", 
              fontSize: "0.9rem",
              lineHeight: 1.5
            }}>
              Your AI Health Assistant<br/>
              <span style={{ fontSize: "0.85rem" }}>Personalized recovery guidance</span>
            </p>
          </div>
        </div>
      </main>

      {/* How It Works Section */}
      <section style={{
        padding: "5rem 4rem",
        background: "#f8fafc",
        textAlign: "center"
      }}>
        <h2 style={{
          fontSize: "2.5rem",
          fontWeight: "800",
          color: "#0f172a",
          marginBottom: "1rem"
        }}>How It Works</h2>
        <p style={{ color: "#64748b", fontSize: "1.1rem", marginBottom: "4rem", maxWidth: "600px", margin: "0 auto 4rem" }}>
          Get started in three simple steps
        </p>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "3rem",
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <div style={{ padding: "2rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💬</div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.75rem" }}>
              Chat with AI
            </h3>
            <p style={{ color: "#64748b", lineHeight: 1.6 }}>
              Get instant medical insights and personalized recovery guidance 24/7
            </p>
          </div>
          
          <div style={{ padding: "2rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📊</div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.75rem" }}>
              Track Recovery
            </h3>
            <p style={{ color: "#64748b", lineHeight: 1.6 }}>
              Monitor your progress with personalized recovery updates and milestones
            </p>
          </div>
          
          <div style={{ padding: "2rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>👩‍⚕️</div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.75rem" }}>
              Stay Connected
            </h3>
            <p style={{ color: "#64748b", lineHeight: 1.6 }}>
              Communicate seamlessly with doctors and healthcare staff
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: "5rem 4rem",
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        <h2 style={{
          fontSize: "2.5rem",
          fontWeight: "800",
          color: "#0f172a",
          marginBottom: "1rem",
          textAlign: "center"
        }}>Core Features</h2>
        <p style={{ color: "#64748b", fontSize: "1.1rem", marginBottom: "4rem", textAlign: "center" }}>
          Everything you need for a successful recovery journey
        </p>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem"
        }}>
          {features.map((feature, idx) => (
            <div key={idx} style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "1rem",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              transition: "transform 0.3s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-8px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{feature.icon}</div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.5rem" }}>
                {feature.title}
              </h3>
              <p style={{ color: "#64748b", lineHeight: 1.6 }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Section */}
      <section style={{
        padding: "5rem 4rem",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        textAlign: "center"
      }}>
        <h2 style={{
          fontSize: "2.5rem",
          fontWeight: "800",
          marginBottom: "3rem"
        }}>Why Choose LifeSense AI?</h2>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <div>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✅</div>
            <div style={{ fontWeight: "600" }}>100% Personalized</div>
            <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>Recovery Guidance</div>
          </div>
          <div>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⏰</div>
            <div style={{ fontWeight: "600" }}>24/7 Available</div>
            <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>Instant Answers Anytime</div>
          </div>
          <div>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>💊</div>
            <div style={{ fontWeight: "600" }}>Medication Reminders</div>
            <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>Never Miss a Dose</div>
          </div>
          <div>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔐</div>
            <div style={{ fontWeight: "600" }}>Private & Secure</div>
            <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>Your Data Protected</div>
          </div>
        </div>
      </section>

      {/* Chatbot Preview Section */}
      <section style={{
        padding: "5rem 4rem",
        textAlign: "center",
        background: "#f8fafc"
      }}>
        <h2 style={{
          fontSize: "2.5rem",
          fontWeight: "800",
          color: "#0f172a",
          marginBottom: "1rem"
        }}>Try Our AI Chatbot</h2>
        <p style={{ color: "#64748b", fontSize: "1.1rem", marginBottom: "3rem" }}>
          Experience personalized health guidance powered by AI
        </p>
        
        <div style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "#fff",
          padding: "2.5rem",
          borderRadius: "1.5rem",
          boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🤖</div>
          <p style={{ fontSize: "1.1rem", color: "#334155", marginBottom: "2rem", lineHeight: 1.6 }}>
            "Hi! I'm your AI health assistant. How can I support your recovery today?"
          </p>
          <button
            onClick={() => navigate("/get-started")}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "0.75rem",
              padding: "1rem 2.5rem",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(102,126,234,0.3)"
            }}
          >
            Try the Demo →
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{
        padding: "5rem 4rem",
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        <h2 style={{
          fontSize: "2.5rem",
          fontWeight: "800",
          color: "#0f172a",
          marginBottom: "1rem",
          textAlign: "center"
        }}>What Our Users Say</h2>
        <p style={{ color: "#64748b", fontSize: "1.1rem", marginBottom: "4rem", textAlign: "center" }}>
          Trusted by patients and healthcare professionals
        </p>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem"
        }}>
          {testimonials.map((testimonial, idx) => (
            <div key={idx} style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "1rem",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid #e5e7eb"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>💬</div>
              <p style={{ color: "#334155", lineHeight: 1.7, marginBottom: "1.5rem", fontStyle: "italic" }}>
                "{testimonial.text}"
              </p>
              <div>
                <div style={{ fontWeight: "700", color: "#0f172a" }}>{testimonial.name}</div>
                <div style={{ fontSize: "0.9rem", color: "#64748b" }}>{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: "#0f172a",
        color: "#fff",
        padding: "3rem 4rem 2rem",
        marginTop: "4rem"
      }}>
        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "3rem",
          marginBottom: "2rem"
        }}>
          <div>
            <div style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1rem" }}>
              LifeSense AI
            </div>
            <p style={{ color: "#94a3b8", lineHeight: 1.6 }}>
              Your personal AI health assistant for recovery guidance, medication tracking, and wellness support.
            </p>
          </div>
          
          <div>
            <div style={{ fontWeight: "600", marginBottom: "1rem" }}>Quick Links</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <a href="/" style={{ color: "#94a3b8", textDecoration: "none" }}>Home</a>
              <a href="/features" style={{ color: "#94a3b8", textDecoration: "none" }}>Features</a>
              <a href="/about" style={{ color: "#94a3b8", textDecoration: "none" }}>About</a>
              <a href="/contact" style={{ color: "#94a3b8", textDecoration: "none" }}>Contact</a>
            </div>
          </div>
          
          <div>
            <div style={{ fontWeight: "600", marginBottom: "1rem" }}>Legal</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <span onClick={() => navigate("/privacy")} style={{ color: "#94a3b8", textDecoration: "none", cursor: "pointer" }}>Privacy Policy</span>
              <span onClick={() => navigate("/terms")} style={{ color: "#94a3b8", textDecoration: "none", cursor: "pointer" }}>Terms of Service</span>
              <span onClick={() => navigate("/security")} style={{ color: "#94a3b8", textDecoration: "none", cursor: "pointer" }}>Security</span>
            </div>
          </div>
          
          <div>
            <div style={{ fontWeight: "600", marginBottom: "1rem" }}>Contact</div>
            <div style={{ color: "#94a3b8", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div>📧 support@lifesense.ai</div>
              <div>📞 1-800-LIFESENSE</div>
              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <span style={{ cursor: "pointer" }}>🔵</span>
                <span style={{ cursor: "pointer" }}>🐦</span>
                <span style={{ cursor: "pointer" }}>📷</span>
              </div>
            </div>
          </div>
        </div>
        
        <div style={{
          borderTop: "1px solid #334155",
          paddingTop: "2rem",
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "0.9rem"
        }}>
          © 2025 LifeSense AI. All rights reserved.
        </div>
      </footer>

      {/* Homepage Chatbot */}
      <HomepageChatbot />
    </div>
  );
}

export default HomePage;