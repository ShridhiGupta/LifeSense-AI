import React, { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble.js";

function ChatWindow({ messages, loading }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div style={{
      background: "#ffffff",
      width: "100%",
      flex: 1,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Messages Area */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "32px 48px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        background: "#ffffff",
      }}>
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} message={msg} />
        ))}
        
        {/* Typing Indicator */}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              padding: "16px 20px",
              borderRadius: "20px 20px 20px 4px",
              background: "white",
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
              display: "flex",
              gap: "6px",
              alignItems: "center",
            }}>
              <span style={{ 
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                animation: "bounce 1.4s infinite", 
                animationDelay: "0s" 
              }} />
              <span style={{ 
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                animation: "bounce 1.4s infinite", 
                animationDelay: "0.2s" 
              }} />
              <span style={{ 
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                animation: "bounce 1.4s infinite", 
                animationDelay: "0.4s" 
              }} />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* CSS for scrollbar and animations */}
      <style>
        {`
          div::-webkit-scrollbar {
            width: 8px;
          }

          div::-webkit-scrollbar-track {
            background: transparent;
          }

          div::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            borderRadius: 10px;
          }

          div::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          }

          @keyframes bounce {
            0%, 60%, 100% {
              transform: translateY(0);
            }
            30% {
              transform: translateY(-12px);
            }
          }
        `}
      </style>
    </div>
  );
}

export default ChatWindow;