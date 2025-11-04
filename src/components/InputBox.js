import React, { useState } from "react";

function InputBox({ onSend, disabled }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{
      width: "100%",
      padding: "24px 48px 32px 48px",
      background: "#ffffff",
      display: "flex",
      gap: "12px",
      alignItems: "center",
      borderTop: "1px solid #f3f4f6",
    }}>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={disabled}
        style={{
          flex: 1,
          padding: "16px 24px",
          borderRadius: "28px",
          border: "2px solid #e9ecef",
          fontSize: "15px",
          outline: "none",
          transition: "all 0.3s ease",
          fontFamily: "'Inter', -apple-system, sans-serif",
          background: "#f8f9fa",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#667eea";
          e.currentTarget.style.background = "white";
          e.currentTarget.style.boxShadow = "0 0 0 4px rgba(102, 126, 234, 0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#e9ecef";
          e.currentTarget.style.background = "#f8f9fa";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: (input.trim() && !disabled)
            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            : "#e9ecef",
          border: "none",
          color: "white",
          cursor: (input.trim() && !disabled) ? "pointer" : "not-allowed",
          fontSize: "22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: (input.trim() && !disabled) ? "0 4px 16px rgba(102, 126, 234, 0.4)" : "none",
        }}
        onMouseEnter={(e) => {
          if (input.trim() && !disabled) {
            e.currentTarget.style.transform = "scale(1.1) rotate(15deg)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(102, 126, 234, 0.5)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1) rotate(0deg)";
          e.currentTarget.style.boxShadow = (input.trim() && !disabled) ? "0 4px 16px rgba(102, 126, 234, 0.4)" : "none";
        }}
      >
        {disabled ? "⏳" : "➤"}
      </button>
    </div>
  );
}

export default InputBox;