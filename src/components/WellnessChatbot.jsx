import React, { useState, useRef, useEffect } from 'react';

const WellnessChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm your Club Wellness AI. What kind of routine do you want to build today? (Try typing: 'I want a beginner muscle building routine' or 'Yoga flow for 10 mins')" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSpeech = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please try Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(prev => prev + (prev ? ' ' : '') + transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const generateSimulatedResponse = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('muscle') || lowerText.includes('strength')) {
      return "Here is a custom Muscle routine for you:\n• Push-ups (3 sets of 15)\n• Dumbbell Squats (3 sets of 12)\n• Plank (60s)\nKeep your core tight and form strict! Let me know if you want to add weights.";
    } else if (lowerText.includes('yoga') || lowerText.includes('stretch')) {
      return "Here is a relaxing Yoga flow:\n• Child's Pose (2 mins)\n• Cat-Cow (2 mins)\n• Downward Dog (2 mins)\nFocus on deep, steady breathing. Namaste!";
    } else if (lowerText.includes('hiit') || lowerText.includes('cardio')) {
      return "Ready to sweat? Here is a HIIT routine:\n• Jumping Jacks (45s)\n• Burpees (45s)\n• Mountain Climbers (45s)\nRest for 15s between each! Repeat 3 times.";
    } else {
      return "I can create custom routines for Muscle Building, Yoga, or HIIT. Tell me which one you prefer, and your current fitness level (beginner/advanced)!";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (apiKey) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `You are a professional fitness trainer AI. The user says: "${input}". Give them a short, formatted customized workout routine with reps.` }] }]
          })
        });
        const data = await response.json();
        
        if (data.error) {
           setMessages(prev => [...prev, { role: 'bot', text: `Gemini API Error: ${data.error.message}\n\nPlease check that your API key is correct and active.` }]);
        } else {
          const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a routine right now.";
          setMessages(prev => [...prev, { role: 'bot', text: botText }]);
        }
      } catch (error) {
        setMessages(prev => [...prev, { role: 'bot', text: "Error connecting to AI API. Please try again or check your API key." }]);
      }
      setIsLoading(false);
    } else {
      // Fallback to simulated AI
      setTimeout(() => {
        const reply = generateSimulatedResponse(userMessage.text);
        setMessages(prev => [...prev, { role: 'bot', text: reply }]);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
      {/* Chat Window */}
      {isOpen && (
        <div style={{
          width: '350px',
          height: '500px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '1rem',
          overflow: 'hidden',
          border: '1px solid #eee'
        }}>
          {/* Header */}
          <div style={{ background: 'var(--primary)', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🏋️‍♂️ Wellness AI
            </h3>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#f8fafc' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                <div style={{
                  background: msg.role === 'user' ? 'var(--primary)' : '#e2e8f0',
                  color: msg.role === 'user' ? 'white' : 'var(--text)',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  borderBottomRightRadius: msg.role === 'user' ? '0' : '12px',
                  borderBottomLeftRadius: msg.role === 'bot' ? '0' : '12px',
                  whiteSpace: 'pre-wrap',
                  fontSize: '0.9rem',
                  lineHeight: '1.4'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div style={{ alignSelf: 'flex-start', color: '#94a3b8', fontSize: '0.9rem', padding: '0.5rem' }}>
                AI is typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ padding: '1rem', borderTop: '1px solid #eee', background: 'white', display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isListening ? "Listening..." : "Ask for a routine..."}
              style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', background: isListening ? '#f0fdf4' : 'white' }}
            />
            <button 
              onClick={handleSpeech}
              title="Voice Input"
              style={{ background: isListening ? '#ef4444' : '#f1f5f9', color: isListening ? 'white' : 'var(--text)', border: 'none', borderRadius: '8px', padding: '0 0.75rem', cursor: 'pointer', fontSize: '1.2rem', transition: 'background 0.3s' }}
            >
              🎤
            </button>
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              style={{ background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', padding: '0 1rem', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button & Sign */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        {!isOpen && (
          <div style={{
            position: 'absolute',
            right: '75px',
            background: 'white',
            color: 'var(--primary)',
            padding: '0.4rem 0.8rem',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: '2px solid var(--primary)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none'
          }}>
            Ask me! 👋
          </div>
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--primary)',
            color: 'white',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            fontSize: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 'auto'
          }}
          title="Open Wellness AI Chatbot"
        >
          {isOpen ? '❌' : '🏃‍♂️'}
        </button>
      </div>
    </div>
  );
};

export default WellnessChatbot;
