import React from "react";
import "./../styles/MessageBubble.css";

function MessageBubble({ message }) {
  const label = message.sender === "user" ? "You" : "AI";
  
  return (
    <div className={`message-container ${message.sender}`}>
      <div className={`message-label ${message.sender}`}>{label}</div>
      <div className={`message-bubble ${message.sender}`}>
        <span>{message.text}</span>
      </div>
    </div>
  );
}

export default MessageBubble;