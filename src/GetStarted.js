import React, { useState } from "react";
import logo from "./logo.jpeg"; // Logo for navbar
import chatbot from "./chatbot.jpeg"; // Save your chatbot image as chatbot.png in src
import ChatWindow from "./components/ChatWindow";
import InputBox from "./components/InputBox";

function GetStarted() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.text }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong." }
      ]);
    }
    setLoading(false);
  };
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
          <a href="/" style={{ color: "#222", textDecoration: "none" }}>Home</a>
          <a href="#" style={{ color: "#222", textDecoration: "none" }}>Features</a>
          <a href="#" style={{ color: "#222", textDecoration: "none" }}>Testimonials</a>
          <a href="#" style={{ color: "#222", textDecoration: "none" }}>Pricing</a>
        </div>
      </nav>

      {/* Main Section */}
      <main style={{ textAlign: "center", marginTop: "3rem" }}>
        <img
          src={chatbot}
          alt="AI Chatbot"
          style={{
            width: "220px",
            marginBottom: "2rem",
            boxShadow: "0 4px 24px rgba(56,189,248,0.12)",
            borderRadius: "50%",
            background: "#fff",
          }}
        />
        <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#222", marginBottom: "1rem" }}>
          Welcome to LifeSense AI Chatbot
        </h2>
        <p style={{ fontSize: "1.15rem", color: "#444", marginBottom: "2.5rem" }}>
          Start chatting with your medical recovery assistant.<br />
          Get personalized support and guidance for your recovery journey.
        </p>
        <div className="app-container" style={{ maxWidth: 720, margin: "0 auto" }}>
          <h3 className="chat-title" style={{ marginBottom: "1rem" }}>Chat</h3>
          <ChatWindow messages={messages} />
          <InputBox onSend={handleSend} disabled={loading} />
        </div>
      </main>
    </div>
  );
}

export default GetStarted;