import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './JournalEntry.css';

function JournalEntry() {
  const { date } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/entries');
        const data = await response.json();

        if (response.ok) {
          // Find entry that matches the date
          const foundEntry = data.entries.find(e => {
            const entryDate = new Date(e.createdAt).toISOString().split('T')[0];
            return entryDate === date;
          });

          setEntry(foundEntry || null);
        }
      } catch (error) {
        console.error('Error fetching entry:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [date]);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', options);
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

  if (!entry) {
    return (
      <div className="journal-entry-page">
        <div className="journal-entry-container">
          <button className="back-button" onClick={handleBack}>
            ← Back to Dashboard
          </button>
          <div className="no-entry">
            <h2>No Entry Found</h2>
            <p>There is no journal entry for {formatDate(date)}.</p>
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

        <article className="journal-entry-card">
          <header className="entry-header">
            <div className="entry-mood-badge">📔</div>
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
              <span className="entry-tag">Entry ID: {entry.id}</span>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}

export default JournalEntry;
