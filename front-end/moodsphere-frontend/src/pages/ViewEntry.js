import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewEntry.css';

export default function ViewEntry() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5001/api/entries', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setEntries(data.entries || []);
      } else {
        console.error('Failed to fetch entries:', data.error);
      }
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = async (entryId) => {
    if (!window.confirm('Are you sure you want to delete this journal entry?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:5001/api/entries/${entryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setEntries(entries.filter(entry => entry._id !== entryId));
        alert('Entry deleted successfully!');
      } else {
        const data = await response.json();
        alert(`Failed to delete entry: ${data.error}`);
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
      alert('An error occurred while deleting the entry.');
    }
  };

  const handleEdit = (entryId) => {
    navigate(`/journal-editor/${entryId}`);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="journal-page">
        <div className="journal-header">
          <button className="back-btn" onClick={() => navigate('/dashboard')}>← Back</button>
          <h2 className="journal-title">My Journal</h2>
        </div>
        <div className="no-entries">
          <p>Loading entries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="journal-page">
      <div className="journal-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>← Back</button>
        <h2 className="journal-title">My Journal</h2>
      </div>

      <div className="journal-list">
        {entries.length === 0 ? (
          <div className="no-entries">
            <p>No entries found</p>
            <p className="no-entries-sub">Create your first journal entry to get started!</p>
          </div>
        ) : (
          entries.map(entry => (
            <div key={entry._id} className="journal-card">
              <div className="card-content">
                <div className="mood-square bg-indigo-100">
                  <span className="mood-emoji">📔</span>
                </div>
                <div className="card-main">
                  <div className="card-mood-row">
                    <span className="card-mood">{entry.title}</span>
                  </div>
                  <span className="card-date">
                    {formatDate(entry.createdAt)}
                  </span>
                  <div className="card-desc">
                    {entry.content.length > 150
                      ? entry.content.substring(0, 150) + '...'
                      : entry.content}
                  </div>
                  <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleEdit(entry._id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#4F46E5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: '500'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(entry._id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#EF4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: '500'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
