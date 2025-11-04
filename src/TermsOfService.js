import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TermsOfService() {
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
        }}>Terms of Service</h1>
        
        <p style={{ color: "#64748b", fontSize: "1.1rem", marginBottom: "3rem" }}>
          Last updated: October 19, 2025
        </p>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            1. Acceptance of Terms
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8 }}>
            By accessing and using LifeSense AI ("the Service"), you accept and agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use our service.
          </p>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            2. Service Description
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1rem" }}>
            LifeSense AI provides:
          </p>
          <ul style={{ color: "#334155", lineHeight: 1.8, paddingLeft: "2rem" }}>
            <li>AI-powered health assistance and recovery guidance</li>
            <li>Patient dashboard for tracking medications and progress</li>
            <li>Staff portal for healthcare providers to manage patients</li>
            <li>Admin controls for system management</li>
            <li>Secure communication between patients and healthcare providers</li>
          </ul>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            3. User Responsibilities
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1rem" }}>
            As a user, you agree to:
          </p>
          <ul style={{ color: "#334155", lineHeight: 1.8, paddingLeft: "2rem" }}>
            <li>Provide accurate and truthful information</li>
            <li>Keep your login credentials secure and confidential</li>
            <li>Use the service only for lawful purposes</li>
            <li>Not attempt to hack, disrupt, or damage the platform</li>
            <li>Respect the privacy and rights of other users</li>
            <li>Not share your patient ID or account access with others</li>
          </ul>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            4. Medical Disclaimer
          </h2>
          <div style={{
            background: "#fef2f2",
            padding: "1.5rem",
            borderRadius: "0.75rem",
            border: "2px solid #fecaca",
            marginBottom: "1rem"
          }}>
            <p style={{ color: "#991b1b", fontWeight: "600", marginBottom: "0.5rem" }}>
              ⚠️ Important Medical Disclaimer
            </p>
            <p style={{ color: "#334155", lineHeight: 1.8 }}>
              LifeSense AI is NOT a substitute for professional medical advice, diagnosis, or treatment. 
              Our AI chatbot provides general health information and wellness guidance only.
            </p>
          </div>
          <ul style={{ color: "#334155", lineHeight: 1.8, paddingLeft: "2rem" }}>
            <li>Always consult with qualified healthcare professionals for medical decisions</li>
            <li>In case of emergency, call emergency services immediately</li>
            <li>Do not rely solely on AI recommendations for critical health matters</li>
            <li>Follow your doctor's prescribed treatment plan</li>
          </ul>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            5. Account Types and Access
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1rem" }}>
            We offer three types of accounts:
          </p>
          <ul style={{ color: "#334155", lineHeight: 1.8, paddingLeft: "2rem" }}>
            <li><strong>Patient Account:</strong> Access via 7-digit Patient ID for personalized health guidance</li>
            <li><strong>Staff Account:</strong> Healthcare providers can manage patients (requires admin approval)</li>
            <li><strong>Admin Account:</strong> Full system access for managing staff and patients</li>
          </ul>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            6. Intellectual Property
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8 }}>
            All content, features, and functionality of LifeSense AI are owned by us and protected by copyright, 
            trademark, and other intellectual property laws. You may not:
          </p>
          <ul style={{ color: "#334155", lineHeight: 1.8, paddingLeft: "2rem" }}>
            <li>Copy, modify, or distribute our software or content</li>
            <li>Reverse engineer or attempt to extract source code</li>
            <li>Use our branding or trademarks without permission</li>
          </ul>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            7. Limitation of Liability
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8 }}>
            LifeSense AI and its affiliates shall not be liable for:
          </p>
          <ul style={{ color: "#334155", lineHeight: 1.8, paddingLeft: "2rem" }}>
            <li>Any medical decisions made based on AI recommendations</li>
            <li>Service interruptions or technical errors</li>
            <li>Loss of data due to technical failures</li>
            <li>Indirect, incidental, or consequential damages</li>
          </ul>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            8. Termination
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8 }}>
            We reserve the right to suspend or terminate your account if you:
          </p>
          <ul style={{ color: "#334155", lineHeight: 1.8, paddingLeft: "2rem" }}>
            <li>Violate these Terms of Service</li>
            <li>Provide false or misleading information</li>
            <li>Engage in fraudulent or illegal activities</li>
            <li>Abuse or misuse the platform</li>
          </ul>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            9. Changes to Terms
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8 }}>
            We may update these Terms of Service from time to time. We will notify users of significant changes 
            via email or platform notifications. Continued use of the service after changes constitutes acceptance 
            of the new terms.
          </p>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            10. Contact Information
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1rem" }}>
            For questions about these Terms of Service, contact us:
          </p>
          <div style={{ 
            background: "#f8fafc", 
            padding: "1.5rem", 
            borderRadius: "0.5rem",
            border: "1px solid #e5e7eb"
          }}>
            <p style={{ color: "#334155", marginBottom: "0.5rem" }}>
              📧 Email: legal@lifesense.ai
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
            ✅ Agreement
          </p>
          <p style={{ color: "#334155", lineHeight: 1.6 }}>
            By using LifeSense AI, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
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

export default TermsOfService;
