import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contacts.css';

function Contacts() {
  const navigate = useNavigate();

  const [contacts] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Friend since 2023',
      avatar: '👩',
      status: 'online',
      lastMessage: 'Hey! Want to grab coffee tomorrow?',
      lastMessageTime: '2m ago'
    },
    {
      id: 2,
      name: 'Alex Rivera',
      role: 'Friend since 2022',
      avatar: '👨',
      status: 'online',
      lastMessage: 'That meditation session was great!',
      lastMessageTime: '15m ago'
    },
    {
      id: 3,
      name: 'Jamie Park',
      role: 'Friend since 2024',
      avatar: '🧑',
      status: 'away',
      lastMessage: 'At the gym, text you later!',
      lastMessageTime: '1h ago'
    },
    {
      id: 4,
      name: 'Taylor Micheals',
      role: 'Friend since 2023',
      avatar: '👩‍🦰',
      status: 'offline',
      lastMessage: 'Hope you\'re having a good day 😊',
      lastMessageTime: '3h ago'
    },
    {
      id: 5,
      name: 'Jordan Lee',
      role: 'Friend since 2021',
      avatar: '🧑‍💼',
      status: 'online',
      lastMessage: 'Thanks for checking in on me yesterday',
      lastMessageTime: '5h ago'
    },
    {
      id: 6,
      name: 'Morgan Davis',
      role: 'Friend since 2024',
      avatar: '👨‍🎨',
      status: 'online',
      lastMessage: 'Just finished my journal entry too!',
      lastMessageTime: '8h ago'
    }
  ]);

  const handleContactClick = (contactId) => {
    navigate(`/chat/${contactId}`);
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="contacts-page">
      <div className="contacts-container">
        <header className="contacts-header">
          <button className="back-button" onClick={handleBack}>
            ← Back
          </button>
          <h1 className="contacts-title">Friends</h1>
          <p className="contacts-subtitle">Chat with your Moodsphere friends</p>
        </header>

        <div className="contacts-list">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="contact-card"
              onClick={() => handleContactClick(contact.id)}
            >
              <div className="contact-avatar-wrapper">
                <div className="contact-avatar">{contact.avatar}</div>
                <span className={`status-indicator ${contact.status}`}></span>
              </div>

              <div className="contact-info">
                <div className="contact-header-row">
                  <h3 className="contact-name">{contact.name}</h3>
                  <span className="contact-time">{contact.lastMessageTime}</span>
                </div>
                <p className="contact-role">{contact.role}</p>
                <p className="contact-last-message">{contact.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contacts;
