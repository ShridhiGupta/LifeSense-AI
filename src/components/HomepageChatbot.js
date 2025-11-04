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
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(102, 126, 234, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              color: 'white',
              animation: 'pulse 3s ease-in-out infinite',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.15) rotate(10deg)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.5)';
            }}
            title="Need help? Chat with LifeSense AI"
          >
            <span style={{ animation: 'float 3s ease-in-out infinite' }}>🤖</span>
          </button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div
            style={{
              width: '420px',
              height: '650px',
              background: 'white',
              borderRadius: '24px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              animation: 'slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                padding: '24px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Animated background circles */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '200px',
                height: '200px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                animation: 'float 6s ease-in-out infinite',
              }} />
              <div style={{
                position: 'absolute',
                bottom: '-30%',
                left: '-10%',
                width: '150px',
                height: '150px',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '50%',
                animation: 'float 8s ease-in-out infinite',
              }} />
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', zIndex: 1 }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #fff 0%, #f0f0f0 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    animation: 'pulse 2s ease-in-out infinite',
                  }}
                >
                  🤖
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '-0.5px' }}>
                    LifeSense AI
                  </div>
                  <div style={{ 
                    fontSize: '13px', 
                    opacity: 0.95,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      background: '#4ade80',
                      borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'pulse 2s ease-in-out infinite',
                    }} />
                    Online • Ready to assist
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(10px)',
                  border: 'none',
                  color: 'white',
                  fontSize: '22px',
                  cursor: 'pointer',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  zIndex: 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.35)';
                  e.currentTarget.style.transform = 'rotate(90deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.transform = 'rotate(0deg)';
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
                padding: '24px',
                background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(240, 147, 251, 0.03) 0%, transparent 50%)',
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
                      maxWidth: '80%',
                      padding: '14px 18px',
                      borderRadius: message.type === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                      background: message.type === 'user' 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'white',
                      color: message.type === 'user' ? 'white' : '#1e293b',
                      boxShadow: message.type === 'user'
                        ? '0 4px 16px rgba(102, 126, 234, 0.3)'
                        : '0 2px 12px rgba(0, 0, 0, 0.08)',
                      fontSize: '14.5px',
                      lineHeight: '1.6',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      position: 'relative',
                      border: message.type === 'user' ? 'none' : '1px solid rgba(0, 0, 0, 0.05)',
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
                      padding: '16px 20px',
                      borderRadius: '20px 20px 20px 4px',
                      background: 'white',
                      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
                      display: 'flex',
                      gap: '6px',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ 
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      animation: 'bounce 1.4s infinite', 
                      animationDelay: '0s' 
                    }} />
                    <span style={{ 
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      animation: 'bounce 1.4s infinite', 
                      animationDelay: '0.2s' 
                    }} />
                    <span style={{ 
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      animation: 'bounce 1.4s infinite', 
                      animationDelay: '0.4s' 
                    }} />
                  </div>
                </div>
              )}

              {/* Quick Reply Buttons */}
              {messages.length === 1 && !isTyping && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickReply(reply.value)}
                      style={{
                        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                        border: '2px solid #e9ecef',
                        borderRadius: '16px',
                        padding: '14px 18px',
                        fontSize: '14.5px',
                        color: '#667eea',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        textAlign: 'left',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                        e.currentTarget.style.borderColor = '#667eea';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.transform = 'translateX(8px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)';
                        e.currentTarget.style.borderColor = '#e9ecef';
                        e.currentTarget.style.color = '#667eea';
                        e.currentTarget.style.transform = 'translateX(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
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
                padding: '20px',
                background: 'white',
                borderTop: '1px solid #f0f0f0',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.03)',
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: '14px 20px',
                  borderRadius: '28px',
                  border: '2px solid #e9ecef',
                  fontSize: '14.5px',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  fontFamily: "'Inter', -apple-system, sans-serif",
                  background: '#f8f9fa',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.boxShadow = '0 0 0 4px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e9ecef';
                  e.currentTarget.style.background = '#f8f9fa';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: inputValue.trim() 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : '#e9ecef',
                  border: 'none',
                  color: 'white',
                  cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: inputValue.trim() ? '0 4px 16px rgba(102, 126, 234, 0.3)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (inputValue.trim()) {
                    e.currentTarget.style.transform = 'scale(1.1) rotate(15deg)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(102, 126, 234, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  e.currentTarget.style.boxShadow = inputValue.trim() ? '0 4px 16px rgba(102, 126, 234, 0.3)' : 'none';
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
              box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
              transform: scale(1);
            }
            50% {
              box-shadow: 0 4px 30px rgba(102, 126, 234, 0.7);
              transform: scale(1.05);
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

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

          @keyframes bounce {
            0%, 60%, 100% {
              transform: translateY(0);
            }
            30% {
              transform: translateY(-12px);
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(5deg);
            }
          }

          /* Custom scrollbar */
          div::-webkit-scrollbar {
            width: 6px;
          }

          div::-webkit-scrollbar-track {
            background: transparent;
          }

          div::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 10px;
          }

          div::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          }
        `}
      </style>
    </>
  );
};

export default HomepageChatbot;
