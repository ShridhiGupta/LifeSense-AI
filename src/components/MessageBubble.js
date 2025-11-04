import React from "react";

function MessageBubble({ message }) {
  const isUser = message.sender === "user";
  
  return (
    <div style={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      animation: "fadeIn 0.4s ease-in",
      gap: "10px",
      alignItems: "flex-end",
    }}>
      {/* AI Avatar - only for bot messages */}
      {!isUser && (
        <div style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          flexShrink: 0,
          boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)",
        }}>
          🤖
        </div>
      )}
      
      <div style={{
        maxWidth: "70%",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}>
        <div style={{
          fontSize: "11px",
          fontWeight: "600",
          color: isUser ? "#667eea" : "#64748b",
          paddingLeft: isUser ? "0" : "8px",
          paddingRight: isUser ? "8px" : "0",
          textAlign: isUser ? "right" : "left",
          opacity: 0.8,
        }}>
          {isUser ? "You" : "AI Assistant"}
        </div>
        <div style={{
          padding: "14px 18px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          background: isUser 
            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            : "white",
          color: isUser ? "white" : "#1e293b",
          boxShadow: isUser
            ? "0 4px 16px rgba(102, 126, 234, 0.3)"
            : "0 2px 12px rgba(0, 0, 0, 0.08)",
          fontSize: "14.5px",
          lineHeight: "1.6",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          border: isUser ? "none" : "1px solid rgba(0, 0, 0, 0.05)",
        }}>
          {message.text}
        </div>
      </div>
      
      {/* User Avatar - only for user messages */}
      {isUser && (
        <div style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          flexShrink: 0,
          boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)",
          color: "white",
          fontWeight: "600",
        }}>
          👤
        </div>
      )}
      
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default MessageBubble;