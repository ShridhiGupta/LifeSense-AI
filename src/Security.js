import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Security() {
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
        }}>Security</h1>
        
        <p style={{ color: "#64748b", fontSize: "1.1rem", marginBottom: "3rem" }}>
          Your data security and privacy are our top priorities
        </p>

        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "2rem",
          borderRadius: "1rem",
          color: "#fff",
          marginBottom: "3rem"
        }}>
          <h3 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1rem" }}>
            🔒 Enterprise-Grade Security
          </h3>
          <p style={{ lineHeight: 1.8, opacity: 0.95 }}>
            LifeSense AI implements industry-leading security measures to protect your sensitive health information. 
            We are committed to maintaining the highest standards of data protection and privacy.
          </p>
        </div>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            1. Data Encryption
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1rem" }}>
            All your data is protected with military-grade encryption:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div style={{
              background: "#f8fafc",
              padding: "1.5rem",
              borderRadius: "0.75rem",
              border: "1px solid #e5e7eb"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔐</div>
              <h4 style={{ fontWeight: "700", color: "#0f172a", marginBottom: "0.5rem" }}>
                Encryption in Transit
              </h4>
              <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6 }}>
                TLS 1.3 encryption for all data transmitted between your device and our servers
              </p>
            </div>
            <div style={{
              background: "#f8fafc",
              padding: "1.5rem",
              borderRadius: "0.75rem",
              border: "1px solid #e5e7eb"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🛡️</div>
              <h4 style={{ fontWeight: "700", color: "#0f172a", marginBottom: "0.5rem" }}>
                Encryption at Rest
              </h4>
              <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: 1.6 }}>
                AES-256 encryption for all stored data in our MongoDB databases
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            2. HIPAA Compliance
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1rem" }}>
            We adhere to HIPAA (Health Insurance Portability and Accountability Act) standards:
          </p>
          <ul style={{ color: "#334155", lineHeight: 1.8, paddingLeft: "2rem" }}>
            <li>Protected Health Information (PHI) is handled according to HIPAA guidelines</li>
            <li>Regular security audits and risk assessments</li>
            <li>Staff training on HIPAA compliance and data protection</li>
            <li>Business Associate Agreements (BAAs) with all third-party vendors</li>
            <li>Comprehensive audit logs for all data access</li>
          </ul>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            3. Access Control
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1rem" }}>
            We implement strict access controls to ensure only authorized users can access data:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem" }}>
            <div style={{
              background: "#eff6ff",
              padding: "1.5rem",
              borderRadius: "0.75rem",
              border: "1px solid #bfdbfe",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>👤</div>
              <h4 style={{ fontWeight: "700", color: "#0f172a", marginBottom: "0.5rem" }}>
                Role-Based Access
              </h4>
              <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
                Patient, Staff, and Admin roles with specific permissions
              </p>
            </div>
            <div style={{
              background: "#eff6ff",
              padding: "1.5rem",
              borderRadius: "0.75rem",
              border: "1px solid #bfdbfe",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔑</div>
              <h4 style={{ fontWeight: "700", color: "#0f172a", marginBottom: "0.5rem" }}>
                Secure Authentication
              </h4>
              <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
                Unique Patient IDs and encrypted password storage
              </p>
            </div>
            <div style={{
              background: "#eff6ff",
              padding: "1.5rem",
              borderRadius: "0.75rem",
              border: "1px solid #bfdbfe",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⏱️</div>
              <h4 style={{ fontWeight: "700", color: "#0f172a", marginBottom: "0.5rem" }}>
                Session Management
              </h4>
              <p style={{ color: "#64748b", fontSize: "0.9rem" }}>
                Automatic logout and secure session handling
              </p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            4. Infrastructure Security
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1rem" }}>
            Our infrastructure is built with security at its core:
          </p>
          <ul style={{ color: "#334155", lineHeight: 1.8, paddingLeft: "2rem" }}>
            <li><strong>Secure Hosting:</strong> Cloud infrastructure with 99.9% uptime SLA</li>
            <li><strong>Firewall Protection:</strong> Advanced firewall rules to prevent unauthorized access</li>
            <li><strong>DDoS Protection:</strong> Protection against distributed denial-of-service attacks</li>
            <li><strong>Regular Backups:</strong> Automated daily backups with disaster recovery plans</li>
            <li><strong>Monitoring:</strong> 24/7 security monitoring and intrusion detection</li>
          </ul>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            5. AI Security
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1rem" }}>
            Our AI chatbot (powered by Google Gemini AI) follows strict security protocols:
          </p>
          <ul style={{ color: "#334155", lineHeight: 1.8, paddingLeft: "2rem" }}>
            <li>Patient data is anonymized before being sent to AI services</li>
            <li>No personally identifiable information (PII) is shared with third-party AI</li>
            <li>AI responses are filtered for safety and accuracy</li>
            <li>Conversation logs are encrypted and stored securely</li>
          </ul>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            6. Data Retention and Deletion
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8 }}>
            We maintain clear data retention policies:
          </p>
          <ul style={{ color: "#334155", lineHeight: 1.8, paddingLeft: "2rem" }}>
            <li>Patient data is retained as long as the account is active</li>
            <li>Users can request data deletion at any time</li>
            <li>Deleted data is permanently removed within 30 days</li>
            <li>Backup copies are securely erased according to our retention schedule</li>
          </ul>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            7. Incident Response
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1rem" }}>
            In the unlikely event of a security incident:
          </p>
          <ul style={{ color: "#334155", lineHeight: 1.8, paddingLeft: "2rem" }}>
            <li>We have a dedicated incident response team available 24/7</li>
            <li>Affected users will be notified within 72 hours</li>
            <li>We will work with law enforcement and regulatory bodies as required</li>
            <li>Post-incident analysis and security improvements will be implemented</li>
          </ul>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            8. Your Security Responsibilities
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1rem" }}>
            Help us keep your account secure by:
          </p>
          <div style={{
            background: "#fef2f2",
            padding: "1.5rem",
            borderRadius: "0.75rem",
            border: "1px solid #fecaca"
          }}>
            <ul style={{ color: "#334155", lineHeight: 1.8, paddingLeft: "2rem", margin: 0 }}>
              <li>Never sharing your Patient ID or login credentials</li>
              <li>Using a strong, unique password</li>
              <li>Logging out after each session on shared devices</li>
              <li>Reporting suspicious activity immediately</li>
              <li>Keeping your contact information up to date</li>
            </ul>
          </div>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            9. Security Certifications
          </h2>
          <div style={{ display: "flex", gap: "2rem", justifyContent: "center", marginTop: "2rem" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🏆</div>
              <p style={{ fontWeight: "600", color: "#0f172a" }}>HIPAA Compliant</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🔒</div>
              <p style={{ fontWeight: "600", color: "#0f172a" }}>SSL/TLS Secured</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>✅</div>
              <p style={{ fontWeight: "600", color: "#0f172a" }}>SOC 2 Type II</p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a", marginBottom: "1rem" }}>
            10. Report a Security Issue
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.8, marginBottom: "1rem" }}>
            If you discover a security vulnerability, please report it immediately:
          </p>
          <div style={{ 
            background: "#f8fafc", 
            padding: "1.5rem", 
            borderRadius: "0.5rem",
            border: "1px solid #e5e7eb"
          }}>
            <p style={{ color: "#334155", marginBottom: "0.5rem" }}>
              🚨 Security Team: security@lifesense.ai
            </p>
            <p style={{ color: "#334155", marginBottom: "0.5rem" }}>
              📞 Emergency Hotline: 1-800-LIFESENSE (24/7)
            </p>
            <p style={{ color: "#334155" }}>
              🔐 PGP Key: Available upon request for encrypted communication
            </p>
          </div>
        </section>

        <div style={{
          background: "#ecfdf5",
          padding: "1.5rem",
          borderRadius: "0.75rem",
          border: "1px solid #a7f3d0",
          marginTop: "3rem"
        }}>
          <p style={{ color: "#065f46", fontWeight: "600", marginBottom: "0.5rem" }}>
            ✅ Commitment to Security
          </p>
          <p style={{ color: "#334155", lineHeight: 1.6 }}>
            We continuously invest in security improvements and stay updated with the latest security best practices 
            to ensure your health data remains safe and private.
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

export default Security;
