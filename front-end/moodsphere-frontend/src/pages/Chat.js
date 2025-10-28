import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Toast from '../components/Toast';
import './Chat.css';

function Chat() {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const contacts = {
    1: { name: 'Sarah Chen', role: 'Friend since 2023', avatar: '👩', status: 'online' },
    2: { name: 'Alex Rivera', role: 'Friend since 2022', avatar: '👨', status: 'online' },
    3: { name: 'Jamie Park', role: 'Friend since 2024', avatar: '🧑', status: 'away' },
    4: { name: 'Taylor Micheals', role: 'Friend since 2023', avatar: '👩‍🦰', status: 'offline' },
    5: { name: 'Jordan Lee', role: 'Friend since 2021', avatar: '🧑‍💼', status: 'online' },
    6: { name: 'Morgan Davis', role: 'Friend since 2024', avatar: '👨‍🎨', status: 'online' }
  };

  const contact = contacts[contactId];

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hey! How have you been? 😊',
      sender: 'contact',
      time: '10:30 AM'
    },
    {
      id: 2,
      text: "Hey! Pretty good, just logged my mood on Moodsphere. Feeling calm today!",
      sender: 'user',
      time: '10:32 AM'
    },
    {
      id: 3,
      text: "That's awesome! I just finished my daily reflection. It really helps me stay grounded.",
      sender: 'contact',
      time: '10:33 AM'
    },
    {
      id: 4,
      text: "Same here! Want to meet up this weekend? Maybe a walk in the park?",
      sender: 'user',
      time: '10:35 AM'
    },
    {
      id: 5,
      text: "I'd love that! How about Saturday morning? 🌳",
      sender: 'contact',
      time: '10:36 AM'
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user',
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
      };
      setMessages([...messages, message]);
      setNewMessage('');

      // Simulate friend response after 2 seconds
      setTimeout(() => {
        const responses = [
          "Totally agree! 😊",
          "That sounds great! Count me in!",
          "I know right? That's exactly how I feel too!",
          "Haha yes! That's so true 😂",
          "Aw, I'm here for you! Let me know if you need anything 💙",
          "That's awesome! So proud of you!",
          "I feel you on that one!",
          "For sure! Let's do it!"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const contactMessage = {
          id: messages.length + 2,
          text: randomResponse,
          sender: 'contact',
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
        };
        setMessages(prev => [...prev, contactMessage]);
      }, 2000);
    }
  };

  const handleBack = () => {
    navigate('/contacts');
  };

  const handleSendWarmThoughts = () => {
    const thoughtMessages = [
      `Sent warm thoughts to ${contact.name} 💙`,
      `${contact.name} will know you're thinking of them! 💭`,
      `Your caring message was sent to ${contact.name} ✨`,
      `${contact.name} received your thoughtful nudge! 🌟`,
    ];
    const randomMessage = thoughtMessages[Math.floor(Math.random() * thoughtMessages.length)];
    setToastMessage(randomMessage);
    setShowToast(true);
  };

  if (!contact) {
    return <div>Contact not found</div>;
  }

  return (
    <div className="chat-page">
      {showToast && (
        <Toast
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="chat-container">
        {/* Chat Header */}
        <header className="chat-header">
          <button className="chat-back-button" onClick={handleBack}>
            ←
          </button>
          <div className="chat-contact-info">
            <div className="chat-avatar-wrapper">
              <div className="chat-avatar">{contact.avatar}</div>
              <span className={`chat-status-indicator ${contact.status}`}></span>
            </div>
            <div className="chat-contact-details">
              <h2 className="chat-contact-name">{contact.name}</h2>
              <p className="chat-contact-role">{contact.role}</p>
            </div>
          </div>
          <button className="warm-thoughts-button" onClick={handleSendWarmThoughts} title="Send warm thoughts">
            💙
          </button>
        </header>

        {/* Messages Area */}
        <div className="messages-area">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'user' ? 'user-message' : 'contact-message'}`}
            >
              <div className="message-bubble">
                <p className="message-text">{message.text}</p>
                <span className="message-time">{message.time}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form className="message-input-area" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="message-input"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
