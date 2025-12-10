// Import React utilities and hooks
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './ViewEntry.css';

export default function ViewEntry() {
  // Store all entries fetched from API
  const [entries, setEntries] = useState([]);
  // Loading state for initial fetch
  const [loading, setLoading] = useState(true);
  // Access and modify URL query params
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Read optional ?date=YYYY-MM-DD query param
  const dateFilter = searchParams.get('date');
  // Track selected date in local state
  const [selectedDate, setSelectedDate] = useState(dateFilter || '');

  // Fetch entries from backend (optionally filtered by date)
  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem('token');

      // Build URL dynamically depending on whether a date filter is applied
      const url = dateFilter
        ? `/api/entries?date=${dateFilter}`
        : '/api/entries';

      // Fetch entries
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      // Successful fetch: store entries
      if (response.ok) {
        setEntries(data.entries || []);
      } else {
        console.error('Failed to fetch entries:', data.error);
      }
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      // Stop loading spinner regardless of outcome
      setLoading(false);
    }
  };

  // Refetch entries whenever the URL's date filter changes
  useEffect(() => {
    setSelectedDate(dateFilter || '');
    fetchEntries();
  }, [dateFilter]);

  // When user picks a new date in date input field
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);

    // Update URL params (keeps UI filter in sync)
    if (newDate) {
      setSearchParams({ date: newDate });
    } else {
      setSearchParams({});
    }
  };

  // Delete a specific journal entry
  const handleDelete = async (entryId) => {
    if (!window.confirm('Are you sure you want to delete this journal entry?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`/api/entries/${entryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Successful deletion → remove from UI
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

  // Navigate to edit page for a specific entry
  const handleEdit = (entryId) => {
    navigate(`/journal-editor/${entryId}`);
  };

  // Format entry date for display inside list
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format selected filter date for UI header
  const formatFilterDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Reset filter → removes ?date= param from URL
  const clearFilter = () => {
    navigate('/view-entry');
  };

  // Show loading UI before entries are loaded
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

  // Main rendering of journal entries list
  return (
    <div className="journal-page">
      <div className="journal-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>← Back</button>
        <h2 className="journal-title">My Journal</h2>
      </div>

      {/* Date Filter UI */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #E5E7EB',
        borderRadius: '12px',
        padding: '1rem 1.5rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <label style={{
          fontSize: '0.95rem',
          fontWeight: '600',
          color: '#374151'
        }}>
          Filter by date:
        </label>

        {/* Native date selector that sets URL param */}
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          style={{
            padding: '0.5rem 0.75rem',
            border: '1px solid #D1D5DB',
            borderRadius: '8px',
            fontSize: '0.95rem',
            color: '#374151',
            cursor: 'pointer'
          }}
        />

        {/* Clear filter button appears only when filtering */}
        {selectedDate && (
          <button
            onClick={clearFilter}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#EF4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}
          >
            Clear Filter
          </button>
        )}

        {/* Counter + dynamic label */}
        <span style={{
          fontSize: '0.85rem',
          color: '#6B7280',
          marginLeft: 'auto'
        }}>
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'} {selectedDate ? `on ${formatFilterDate(selectedDate)}` : 'total'}
        </span>
      </div>

      {/* Entries list */}
      <div className="journal-list">
        {/* Empty state */}
        {entries.length === 0 ? (
          <div className="no-entries">
            <p>No entries found</p>
            <p className="no-entries-sub">Create your first journal entry to get started!</p>
          </div>
        ) : (
          // Render each journal entry card
          entries.map(entry => (
            <div key={entry._id} className="journal-card">
              <div className="card-content">
                
                {/* Small mood square icon */}
                <div className="mood-square bg-indigo-100">
                  <span className="mood-emoji">📔</span>
                </div>

                {/* Entry main block */}
                <div className="card-main">
                  <div className="card-mood-row">
                    <span className="card-mood">{entry.title}</span>
                  </div>

                  {/* Date displayed under title */}
                  <span className="card-date">
                    {formatDate(entry.createdAt)}
                  </span>

                  {/* Truncated content preview */}
                  <div className="card-desc">
                    {entry.content.length > 150
                      ? entry.content.substring(0, 150) + '...'
                      : entry.content}
                  </div>

                  {/* Edit/Delete action buttons */}
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