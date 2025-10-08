import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const HomepageChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting when chatbot opens
      setTimeout(() => {
        setMessages([
          {
            type: 'bot',
            text: "👋 Hello! I'm LifeSense AI, your smart health assistant.\n\nYou can ask me about:\n• Recovery & exercises 🧘‍♀️\n• Medicine reminders 💊\n• Healthy diet suggestions 🥗\n• Appointment info 🕒\n\nHow can I help you today?",
            timestamp: new Date(),
          },
        ]);
      }, 300);
    }
  }, [isOpen]);

  const quickReplies = [
    { text: '💪 Daily recovery tips', value: 'daily recovery tips' },
    { text: '💊 Medicine info', value: 'medicine info' },
    { text: '🩺 Talk to support', value: 'talk to support' },
  ];

  const handleQuickReply = (value) => {
    handleSendMessage(value);
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Recovery tips
    if (lowerMessage.includes('recovery') || lowerMessage.includes('exercise') || lowerMessage.includes('healing')) {
      return "🧘‍♀️ **Recovery Tips:**\n\n• Get adequate rest (7-8 hours daily)\n• Follow prescribed exercises regularly\n• Stay hydrated - drink 8-10 glasses of water\n• Avoid stress and maintain positive mindset\n• Attend follow-up appointments\n\nWould you like specific recovery exercises for your condition?";
    }

    // Diet and nutrition
    if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('nutrition')) {
      return "🥗 **Healthy Recovery Diet:**\n\n• **Protein-rich foods:** Eggs, chicken, fish, lentils\n• **Calcium sources:** Milk, yogurt, cheese, leafy greens\n• **Vitamin C:** Citrus fruits, berries, bell peppers\n• **Whole grains:** Brown rice, oats, quinoa\n• **Healthy fats:** Nuts, avocado, olive oil\n\nAvoid: Processed foods, excessive sugar, alcohol\n\nNeed a personalized meal plan? I can help!";
    }

    // Medicine information
    if (lowerMessage.includes('medicine') || lowerMessage.includes('medication') || lowerMessage.includes('drug') || lowerMessage.includes('pill')) {
      return "💊 **Medicine Information:**\n\nTo provide accurate medicine information, I recommend:\n\n1. **Login to your account** to view your prescribed medications\n2. Check medicine reminders and dosage schedules\n3. View side effects and precautions\n\nWould you like me to guide you to the login page?";
    }

    // Symptoms and concerns
    if (lowerMessage.includes('pain') || lowerMessage.includes('swelling') || lowerMessage.includes('symptom')) {
      return "🩺 **Symptom Assessment:**\n\nFor mild symptoms:\n• Apply ice packs (15-20 mins)\n• Keep the area elevated\n• Take prescribed pain medication\n• Rest and avoid strain\n\n⚠️ **Seek immediate medical attention if:**\n• Severe pain or swelling\n• Fever above 101°F\n• Unusual discharge or bleeding\n• Numbness or tingling\n\nShould I connect you with medical support?";
    }

    // Emotional support
    if (lowerMessage.includes('low') || lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('anxious')) {
      return "💙 **You're Not Alone:**\n\nRecovery can be challenging, but you're doing great!\n\n✨ **Positive tips:**\n• Practice deep breathing exercises\n• Connect with loved ones\n• Set small daily goals\n• Celebrate small victories\n• Listen to calming music\n\nRemember: Healing takes time, and every day is progress. Would you like to speak with a counselor?";
    }

    // Appointment and profile
    if (lowerMessage.includes('appointment') || lowerMessage.includes('profile') || lowerMessage.includes('dashboard')) {
      return "📋 **Access Your Information:**\n\nTo view appointments, medical records, and your complete profile:\n\n1. **Login** to your patient account\n2. Visit your **Dashboard**\n3. Access all your health information\n\nWould you like me to take you to the login page?";
    }

    // Support and contact
    if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('contact') || lowerMessage.includes('doctor')) {
      return "🩺 **Get Support:**\n\n**Ways to reach us:**\n• 📞 Emergency Hotline: Available 24/7\n• 💬 Live Chat: Login to your account\n• 📧 Email Support: support@lifesense.ai\n• 🏥 Visit: Schedule an appointment\n\nFor immediate assistance, please login to connect with our medical team.";
    }

    // Fracture specific
    if (lowerMessage.includes('fracture') || lowerMessage.includes('bone') || lowerMessage.includes('break')) {
      return "🦴 **Fracture Recovery Guide:**\n\n**Diet for bone healing:**\n• High calcium: Dairy, leafy greens, almonds\n• Vitamin D: Sunlight, fish, fortified foods\n• Protein: Lean meat, eggs, legumes\n• Vitamin K: Broccoli, spinach, kale\n\n**Do's:**\n✅ Follow immobilization guidelines\n✅ Attend physiotherapy sessions\n✅ Take prescribed supplements\n\n**Don'ts:**\n❌ Don't put weight on injured area\n❌ Avoid smoking and alcohol\n❌ Don't skip follow-ups\n\nRecovery time: 6-8 weeks typically";
    }

    // Default response
    return "I'm here to help! 😊\n\nI can assist you with:\n• **Recovery guidance** and exercises\n• **Dietary recommendations** for healing\n• **Medicine information** and reminders\n• **Symptom assessment** and care tips\n• **Appointment scheduling** and support\n\nPlease ask me anything about your health and recovery, or choose from the quick options below!";
  };

  const handleSendMessage = (messageText = null) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Add user message
    const userMessage = {
      type: 'user',
      text: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getBotResponse(text),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 1000,
        }}
      >
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(14, 165, 233, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              color: 'white',
              animation: 'pulse 2s infinite',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            title="Need help? Chat with LifeSense AI"
          >
            🤖
          </button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div
            style={{
              width: '380px',
              height: '600px',
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              animation: 'slideUp 0.3s ease-out',
            }}
          >
            {/* Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'white',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                  }}
                >
                  🤖
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '16px' }}>LifeSense Assistant</div>
                  <div style={{ fontSize: '12px', opacity: 0.9 }}>Online • Always here to help</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: 'white',
                  fontSize: '20px',
                  cursor: 'pointer',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                ✕
              </button>
            </div>

            {/* Chat Messages Area */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                background: 'linear-gradient(to bottom, #f8fafc 0%, #f1f5f9 100%)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                    animation: 'fadeIn 0.3s ease-in',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '75%',
                      padding: '12px 16px',
                      borderRadius: message.type === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      background: message.type === 'user' 
                        ? 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)'
                        : 'white',
                      color: message.type === 'user' ? 'white' : '#334155',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: '18px 18px 18px 4px',
                      background: 'white',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      display: 'flex',
                      gap: '4px',
                    }}
                  >
                    <span style={{ animation: 'bounce 1.4s infinite', animationDelay: '0s' }}>●</span>
                    <span style={{ animation: 'bounce 1.4s infinite', animationDelay: '0.2s' }}>●</span>
                    <span style={{ animation: 'bounce 1.4s infinite', animationDelay: '0.4s' }}>●</span>
                  </div>
                </div>
              )}

              {/* Quick Reply Buttons */}
              {messages.length === 1 && !isTyping && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply.value)}
                      style={{
                        background: 'white',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        fontSize: '14px',
                        color: '#0ea5e9',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.2s',
                        textAlign: 'left',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f0f9ff';
                        e.currentTarget.style.borderColor = '#0ea5e9';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      {reply.text}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div
              style={{
                padding: '16px',
                background: 'white',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about recovery, medicines, or diet..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '24px',
                  border: '2px solid #e2e8f0',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  fontFamily: "'Inter', sans-serif",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#0ea5e9';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: inputValue.trim() 
                    ? 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)'
                    : '#e2e8f0',
                  border: 'none',
                  color: 'white',
                  cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (inputValue.trim()) {
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                ➤
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              box-shadow: 0 4px 20px rgba(14, 165, 233, 0.4);
            }
            50% {
              box-shadow: 0 4px 30px rgba(14, 165, 233, 0.7);
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes bounce {
            0%, 60%, 100% {
              transform: translateY(0);
            }
            30% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>
    </>
  );
};

export default HomepageChatbot;
