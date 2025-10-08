import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomepageChatbot from "./components/HomepageChatbot";

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: "support@lifesenseai.com",
      link: "mailto:support@lifesenseai.com"
    },
    {
      icon: "📞",
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: "📍",
      title: "Address",
      value: "123 Healthcare Ave, Medical District, CA 90210",
      link: null
    },
    {
      icon: "⏰",
      title: "Support Hours",
      value: "24/7 AI Support Available",
      link: null
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
          <span onClick={() => navigate("/about")} style={{ color: "#334155", textDecoration: "none", fontWeight: "500", cursor: "pointer" }}>About</span>
          <span onClick={() => navigate("/contact")} style={{ color: "#0ea5e9", textDecoration: "none", fontWeight: "600", cursor: "pointer" }}>Contact</span>
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
          We're Here to{" "}
          <span style={{ 
            background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Help You
          </span>
        </h1>
        
        <p style={{
          fontSize: "1.15rem",
          color: "#64748b",
          lineHeight: 1.7,
          maxWidth: "700px",
          margin: "0 auto"
        }}>
          Have questions? Need support? Our team is ready to assist you with anything you need.
        </p>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: "1200px",
        margin: "3rem auto",
        padding: "0 2rem 4rem 2rem",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "3rem"
      }}>
        {/* Contact Form */}
        <div style={{
          background: "#fff",
          padding: "2.5rem",
          borderRadius: "1.5rem",
          boxShadow: "0 10px 40px rgba(14,165,233,0.1)"
        }}>
          <h2 style={{
            fontSize: "1.75rem",
            fontWeight: "700",
            color: "#0f172a",
            marginBottom: "1.5rem"
          }}>
            Send Us a Message
          </h2>

          {submitted && (
            <div style={{
              background: "#d1fae5",
              color: "#065f46",
              padding: "1rem",
              borderRadius: "0.5rem",
              marginBottom: "1.5rem",
              textAlign: "center",
              fontWeight: "600"
            }}>
              ✓ Message sent successfully! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#374151",
                fontWeight: "500",
                fontSize: "0.9rem"
              }}>
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.875rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e2e8f0",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  outline: "none"
                }}
                placeholder="John Doe"
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#374151",
                fontWeight: "500",
                fontSize: "0.9rem"
              }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.875rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e2e8f0",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  outline: "none"
                }}
                placeholder="john@example.com"
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#374151",
                fontWeight: "500",
                fontSize: "0.9rem"
              }}>
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.875rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e2e8f0",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  outline: "none"
                }}
                placeholder="How can we help?"
              />
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{
                display: "block",
                marginBottom: "0.5rem",
                color: "#374151",
                fontWeight: "500",
                fontSize: "0.9rem"
              }}>
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                style={{
                  width: "100%",
                  padding: "0.875rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #e2e8f0",
                  fontSize: "1rem",
                  boxSizing: "border-box",
                  outline: "none",
                  resize: "vertical"
                }}
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
                color: "#fff",
                border: "none",
                borderRadius: "0.75rem",
                padding: "1rem",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(14,165,233,0.3)"
              }}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <div style={{
            background: "#fff",
            padding: "2.5rem",
            borderRadius: "1.5rem",
            boxShadow: "0 10px 40px rgba(14,165,233,0.1)",
            marginBottom: "2rem"
          }}>
            <h2 style={{
              fontSize: "1.75rem",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "1.5rem"
            }}>
              Contact Information
            </h2>

            {contactInfo.map((info, index) => (
              <div key={index} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                marginBottom: "1.5rem",
                paddingBottom: index < contactInfo.length - 1 ? "1.5rem" : "0",
                borderBottom: index < contactInfo.length - 1 ? "1px solid #e2e8f0" : "none"
              }}>
                <div style={{ fontSize: "2rem" }}>{info.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontWeight: "600",
                    color: "#0f172a",
                    marginBottom: "0.25rem",
                    fontSize: "0.95rem"
                  }}>
                    {info.title}
                  </div>
                  {info.link ? (
                    <a href={info.link} style={{
                      color: "#0ea5e9",
                      textDecoration: "none",
                      fontSize: "0.95rem"
                    }}>
                      {info.value}
                    </a>
                  ) : (
                    <div style={{ color: "#64748b", fontSize: "0.95rem" }}>
                      {info.value}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div style={{
            background: "linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)",
            padding: "2rem",
            borderRadius: "1.5rem",
            color: "#fff",
            textAlign: "center"
          }}>
            <h3 style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              marginBottom: "1rem"
            }}>
              Need Immediate Help?
            </h3>
            <p style={{
              marginBottom: "1.5rem",
              opacity: 0.9
            }}>
              Our AI assistant is available 24/7 to answer your questions.
            </p>
            <button
              onClick={() => navigate("/get-started")}
              style={{
                background: "#fff",
                color: "#0ea5e9",
                border: "none",
                borderRadius: "0.75rem",
                padding: "0.875rem 2rem",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
              }}
            >
              Start Chat Now →
            </button>
          </div>
        </div>
      </div>

      {/* Homepage Chatbot */}
      <HomepageChatbot />
    </div>
  );
}

export default Contact;
