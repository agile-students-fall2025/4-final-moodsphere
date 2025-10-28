import { useNavigate, useParams } from 'react-router-dom';
import './JournalEntry.css';

function JournalEntry() {
  const { date } = useParams();
  const navigate = useNavigate();

  // Sample journal entries data
  const journalEntries = {
    '2025-10-01': {
      title: 'New Beginnings',
      mood: '😊',
      content: 'Started using Moodsphere today! I\'m excited to track my journey and connect with friends who understand the importance of mental wellness. Today was a good day - went for a morning walk and had a productive work session.',
      tags: ['wellness', 'productivity', 'exercise']
    },
    '2025-10-05': {
      title: 'Mindful Saturday',
      mood: '😌',
      content: 'Tried meditation for the first time in months. It felt amazing to just sit with my thoughts and breathe. Met up with Sarah for coffee after - we talked about our journaling practices and how Moodsphere helps us stay accountable.',
      tags: ['meditation', 'friends', 'mindfulness']
    },
    '2025-10-12': {
      title: 'Challenging Week',
      mood: '😔',
      content: 'This week has been tough. Work deadlines piling up and feeling a bit overwhelmed. But I\'m grateful for the support from my Moodsphere friends. Alex sent me some encouraging messages that really helped.',
      tags: ['stress', 'support', 'gratitude']
    },
    '2025-10-15': {
      title: 'Breakthrough Moment',
      mood: '🌟',
      content: 'Had a therapy session today that really opened my eyes. Dr. Mitchell helped me realize some patterns I\'ve been stuck in. Feeling hopeful about making positive changes. Logged my mood as "inspired" for the first time in weeks!',
      tags: ['therapy', 'growth', 'hope']
    },
    '2025-10-18': {
      title: 'Self-Care Day',
      mood: '💆',
      content: 'Took the day off for some much-needed self-care. Yoga in the morning, journaling, reading a book, and a long bath. Sometimes we need to pause and recharge. Feeling so much better.',
      tags: ['self-care', 'relaxation', 'wellness']
    },
    '2025-10-22': {
      title: 'Connection & Community',
      mood: '❤️',
      content: 'Had a wonderful day connecting with my Moodsphere friends. We all shared our weekly reflections and it felt so good to be heard and understood. Jamie suggested we start a weekly virtual meditation group - I love that idea!',
      tags: ['community', 'connection', 'friendship']
    },
    '2025-10-25': {
      title: 'Gratitude Practice',
      mood: '🙏',
      content: 'Been focusing on gratitude lately. Today I\'m grateful for: my health, supportive friends, a job I mostly enjoy, and platforms like Moodsphere that help me stay mindful. The daily reflection prompts are really helping me stay positive.',
      tags: ['gratitude', 'positivity', 'reflection']
    },
    '2025-10-28': {
      title: 'Progress Check-In',
      mood: '📈',
      content: 'Looking back at this month, I\'ve come so far! Consistent with journaling, meditation practice is growing, and my mood overall has improved. The calendar feature on Moodsphere really helps me see my progress visually. Proud of myself!',
      tags: ['progress', 'achievement', 'reflection']
    }
  };

  const entry = journalEntries[date];

  const handleBack = () => {
    navigate('/dashboard');
  };

  if (!entry) {
    return (
      <div className="journal-entry-page">
        <div className="journal-entry-container">
          <button className="back-button" onClick={handleBack}>
            ← Back to Dashboard
          </button>
          <div className="no-entry">
            <h2>No Entry Found</h2>
            <p>There is no journal entry for this date.</p>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', options);
  };

  return (
    <div className="journal-entry-page">
      <div className="journal-entry-container">
        <button className="back-button" onClick={handleBack}>
          ← Back to Dashboard
        </button>

        <article className="journal-entry-card">
          <header className="entry-header">
            <div className="entry-mood-badge">{entry.mood}</div>
            <div className="entry-header-text">
              <h1 className="entry-title">{entry.title}</h1>
              <p className="entry-date">{formatDate(date)}</p>
            </div>
          </header>

          <div className="entry-content">
            <p>{entry.content}</p>
          </div>

          <footer className="entry-footer">
            <div className="entry-tags">
              {entry.tags.map((tag, index) => (
                <span key={index} className="entry-tag">
                  #{tag}
                </span>
              ))}
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}

export default JournalEntry;
