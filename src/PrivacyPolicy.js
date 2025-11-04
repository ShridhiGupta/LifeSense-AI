import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PrivacyPolicy() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#ffffff",
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      {/* Navbar */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.5rem 4rem",
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}>
        <div style={{ fontWeight: "700", fontSize: "1.5rem", color: "#667eea", cursor: "pointer" }}
          onClick={() => navigate("/")}>
          LifeSense AI
        </div>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            padding: "0.6rem 1.5rem",
            fontSize: "0.95rem",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(102,126,234,0.3)",
          }}
        >
          ← Back to Home
        </button>
      </nav>

      {/* Content */}
      <main style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "4rem 2rem",
      }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "800",
          color: "#0f172a",
          marginBottom: "1rem",
        }}>Privacy Policy</h1>
        
        <p style={{ color: "#64748b", fontSize: "1.1rem", marginBottom: "3rem" }}>
          Last updated: October 19, 2025
        </p>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            1. Information We Collect
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1rem" }}>
            At LifeSense AI, we collect information to provide you with personalized healthcare assistance:
          </p>
          <ul style={{ color: "#334155", lineHeight: 1.8, paddingLeft: "2rem" }}>
            <li><strong>Personal Information:</strong> Name, age, gender, and contact details</li>
            <li><strong>Medical Information:</strong> Health conditions, recovery progress, medications, and treatment plans</li>
            <li><strong>Usage Data:</strong> Chat interactions, login times, and feature usage</li>
            <li><strong>Technical Data:</strong> IP address, browser type, and device information</li>
          </ul>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            2. How We Use Your Information
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1rem" }}>
            We use your information to:
          </p>
          <ul style={{ color: "#334155", lineHeight: 1.8, paddingLeft: "2rem" }}>
            <li>Provide personalized AI-powered health guidance and recovery support</li>
            <li>Track your recovery progress and medication schedules</li>
            <li>Enable communication between patients, staff, and healthcare providers</li>
            <li>Improve our AI algorithms and service quality</li>
            <li>Ensure platform security and prevent unauthorized access</li>
          </ul>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            3. Data Security
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8 }}>
            We implement industry-standard security measures to protect your data:
          </p>
          <ul style={{ color: "#334155", lineHeight: 1.8, paddingLeft: "2rem" }}>
            <li><strong>Encryption:</strong> All data is encrypted in transit and at rest</li>
            <li><strong>HIPAA Compliance:</strong> We follow HIPAA guidelines for healthcare data protection</li>
            <li><strong>Secure Storage:</strong> Data is stored in MongoDB with secure authentication</li>
            <li><strong>Access Control:</strong> Role-based access ensures only authorized users can view sensitive information</li>
          </ul>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            4. Data Sharing
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8 }}>
            We do not sell your personal information. We may share data only in these circumstances:
          </p>
          <ul style={{ color: "#334155", lineHeight: 1.8, paddingLeft: "2rem" }}>
            <li>With your healthcare providers (staff and doctors) for treatment purposes</li>
            <li>With AI service providers (Google Gemini AI) for chatbot functionality</li>
            <li>When required by law or legal process</li>
            <li>To protect the rights and safety of our users</li>
          </ul>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            5. Your Rights
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8 }}>
            You have the right to:
          </p>
          <ul style={{ color: "#334155", lineHeight: 1.8, paddingLeft: "2rem" }}>
            <li>Access your personal and medical data</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your account and data</li>
            <li>Opt-out of non-essential data collection</li>
            <li>Export your data in a portable format</li>
          </ul>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            6. Cookies and Tracking
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8 }}>
            We use cookies and local storage to enhance your experience. This includes:
          </p>
          <ul style={{ color: "#334155", lineHeight: 1.8, paddingLeft: "2rem" }}>
            <li>Session management and authentication</li>
            <li>Remembering your preferences</li>
            <li>Analytics to improve our service</li>
          </ul>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            7. Contact Us
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8 }}>
            If you have questions about this Privacy Policy, please contact us:
          </p>
          <div style={{ 
            background: "#f8fafc", 
            padding: "1.5rem", 
            borderRadius: "0.5rem", 
            marginTop: "1rem",
            border: "1px solid #e5e7eb"
          }}>
            <p style={{ color: "#334155", marginBottom: "0.5rem" }}>
              📧 Email: privacy@lifesense.ai
            </p>
            <p style={{ color: "#334155", marginBottom: "0.5rem" }}>
              📞 Phone: 1-800-LIFESENSE
            </p>
            <p style={{ color: "#334155" }}>
              🏢 Address: LifeSense AI, Healthcare Innovation Center
            </p>
          </div>
        </section>

        <div style={{
          background: "#eff6ff",
          padding: "1.5rem",
          borderRadius: "0.75rem",
          border: "1px solid #bfdbfe",
          marginTop: "3rem"
        }}>
          <p style={{ color: "#1e40af", fontWeight: "600", marginBottom: "0.5rem" }}>
            📌 Important Note
          </p>
          <p style={{ color: "#334155", lineHeight: 1.6 }}>
            This privacy policy may be updated periodically. We will notify you of significant changes via email or through the platform.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: "#0f172a",
        color: "#94a3b8",
        padding: "2rem 4rem",
        textAlign: "center",
        marginTop: "4rem"
      }}>
        <p>© 2025 LifeSense AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default PrivacyPolicy;
