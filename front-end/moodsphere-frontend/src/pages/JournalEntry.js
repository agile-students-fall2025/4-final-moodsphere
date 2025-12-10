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
      try {
        const token = localStorage.getItem('token');

        // Fetch entries filtered by date from backend
        const response = await fetch(`/api/entries?date=${date}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setEntries(data.entries || []);
        }
      } catch (error) {
        console.error('Error fetching entries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntriesForDate();
  }, [date]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleEdit = (entryId) => {
    navigate(`/journal-editor/${entryId}`);
  };

  const handleCreateNew = () => {
    navigate('/journal-editor');
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', options);
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="journal-entry-page">
        <div className="journal-entry-container">
          <button className="back-button" onClick={handleBack}>
            ← Back to Dashboard
          </button>
          <div className="no-entry">
            <h2>Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <div className="journal-entry-page">
        <div className="journal-entry-container">
          <button className="back-button" onClick={handleBack}>
            ← Back to Dashboard
          </button>
          <div className="no-entry">
            <h2>No Entries Found</h2>
            <p>There are no journal entries for {formatDate(date)}.</p>
            <button className="create-entry-button" onClick={handleCreateNew}>
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
        <button className="back-button" onClick={handleBack}>
          ← Back to Dashboard
        </button>

        <div className="entries-header">
          <h1 className="entries-date-title">{formatDate(date)}</h1>
          <p className="entries-count">{entries.length} {entries.length === 1 ? 'entry' : 'entries'}</p>
        </div>

        <div className="entries-list">
          {entries.map((entry) => (
            <article key={entry._id} className="journal-entry-card">
              <header className="entry-header">
                <div className="entry-mood-badge">📔</div>
                <div className="entry-header-text">
                  <h2 className="entry-title">{entry.title}</h2>
                  <p className="entry-time">{formatTime(entry.createdAt)}</p>
                </div>
                <button
                  className="edit-entry-button"
                  onClick={() => handleEdit(entry._id)}
                  title="Edit entry"
                >
                  ✏️
                </button>
              </header>

              <div className="entry-content">
                <p>{entry.content}</p>
              </div>
            </article>
          ))}
        </div>

        <button className="create-entry-button floating" onClick={handleCreateNew}>
          ✏️ Create New Entry
        </button>
      </div>
    </div>
  );
}

export default JournalEntry;
