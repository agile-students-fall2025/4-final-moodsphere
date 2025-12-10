import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './JournalEntry.css';

function JournalEntry() {
  const { date } = useParams();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntriesForDate = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No auth token found');

        const response = await fetch(`http://localhost:5001/api/entries?date=${date}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          console.error('Failed to fetch entries:', response.statusText);
          setEntries([]);
          return;
        }

        const data = await response.json();
        setEntries(data.entries || []);
      } catch (error) {
        console.error('Error fetching entries:', error);
        setEntries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEntriesForDate();
  }, [date]);

  const handleNavigate = (path) => navigate(path);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', options);
  };

  const formatTime = (dateString) => new Date(dateString).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  if (loading) {
    return (
      <div className="journal-entry-page">
        <div className="journal-entry-container">
          <button className="back-button" onClick={() => handleNavigate('/dashboard')}>
            ← Back to Dashboard
          </button>
          <div className="no-entry">
            <h2>Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!entries.length) {
    return (
      <div className="journal-entry-page">
        <div className="journal-entry-container">
          <button className="back-button" onClick={() => handleNavigate('/dashboard')}>
            ← Back to Dashboard
          </button>
          <div className="no-entry">
            <h2>No Entries Found</h2>
            <p>There are no journal entries for {formatDate(date)}.</p>
            <button className="create-entry-button" onClick={() => handleNavigate('/journal-editor')}>
              ✏️ Create New Entry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="journal-entry-page">
      <div className="journal-entry-container">
        <button className="back-button" onClick={() => handleNavigate('/dashboard')}>
          ← Back to Dashboard
        </button>

        <div className="entries-header">
          <h1 className="entries-date-title">{formatDate(date)}</h1>
          <p className="entries-count">{entries.length} {entries.length === 1 ? 'entry' : 'entries'}</p>
        </div>

        <div className="entries-list">
          {entries.map(({ _id, title, content, createdAt }) => (
            <article key={_id} className="journal-entry-card">
              <header className="entry-header">
                <div className="entry-mood-badge">📔</div>
                <div className="entry-header-text">
                  <h2 className="entry-title">{title}</h2>
                  <p className="entry-time">{formatTime(createdAt)}</p>
                </div>
                <button
                  className="edit-entry-button"
                  onClick={() => handleNavigate(`/journal-editor/${_id}`)}
                  title="Edit entry"
                >
                  ✏️
                </button>
              </header>

              <div className="entry-content">
                <p>{content}</p>
              </div>
            </article>
          ))}
        </div>

        <button className="create-entry-button floating" onClick={() => handleNavigate('/journal-editor')}>
          ✏️ Create New Entry
        </button>
      </div>
    </div>
  );
}

export default JournalEntry;
