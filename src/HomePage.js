import React from "react";
import logo from "./logo.jpeg";

function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0f2fe 0%, #f1f5f9 100%)",
        fontFamily: "sans-serif",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2rem 4rem 1rem 4rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontWeight: "bold", fontSize: "1.3rem", color: "#2563eb" }}>
          <img src={logo} alt="LifeSense AI Logo" style={{ width: 40, height: 40, marginRight: "0.7rem" }} />
          LifeSense AI
        </div>
        <div style={{ display: "flex", gap: "2rem", fontSize: "1rem" }}>
          <a href="#" style={{ color: "#222", textDecoration: "none" }}>Home</a>
          <a href="#" style={{ color: "#222", textDecoration: "none" }}>Features</a>
          <a href="#" style={{ color: "#222", textDecoration: "none" }}>Testimonials</a>
          <a href="#" style={{ color: "#222", textDecoration: "none" }}>Pricing</a>
        </div>
        <a href="/get-started">
          <button
            style={{
              background: "linear-gradient(90deg, #38bdf8 0%, #2563eb 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "2rem",
              padding: "0.7rem 2rem",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(56,189,248,0.15)",
            }}
          >
            Get started
          </button>
        </a>
      </nav>

      {/* Main Section */}
      <main style={{ textAlign: "center", marginTop: "3rem" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "700", color: "#222", marginBottom: "1rem" }}>
          Your partner in recovery
        </h1>
        <p style={{ fontSize: "1.25rem", color: "#444", marginBottom: "2.5rem" }}>
          Personalized support and guidance powered by AI,<br />
          helping you navigate your recovery journey with confidence.
        </p>
        <a href="/get-started">
          <button
            style={{
              background: "linear-gradient(90deg, #38bdf8 0%, #2563eb 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "2rem",
              padding: "1rem 2.5rem",
              fontWeight: "bold",
              fontSize: "1.2rem",
              cursor: "pointer",
              boxShadow: "0 2px 12px rgba(56,189,248,0.18)",
            }}
          >
            Start your free trial
          </button>
        </a>
      </main>
    </div>
  );
}

export default HomePage;