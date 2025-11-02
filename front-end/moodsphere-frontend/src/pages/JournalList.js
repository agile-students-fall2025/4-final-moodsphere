import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JournalList.css';

// Sample journal entries data - replace with actual data from API/props
const defaultJournalEntries = [
  {
    id: 1,
    date: '2025-10-28',
    title: 'Progress Check-In',
    mood: '📈',
    preview: 'Looking back at this month, I\'ve come so far! Consistent with journaling, meditation practice is growing...',
    tags: ['progress', 'achievement', 'reflection']
  },
  {
    id: 2,
    date: '2025-10-25',
    title: 'Gratitude Practice',
    mood: '🙏',
    preview: 'Been focusing on gratitude lately. Today I\'m grateful for: my health, supportive friends...',
    tags: ['gratitude', 'positivity', 'reflection']
  },
  {
    id: 3,
    date: '2025-10-22',
    title: 'Connection & Community',
    mood: '❤️',
    preview: 'Had a wonderful day connecting with my Moodsphere friends. We all shared our weekly reflections...',
    tags: ['community', 'connection', 'friendship']
  },
  {
    id: 4,
    date: '2025-10-18',
    title: 'Self-Care Day',
    mood: '💆',
    preview: 'Took the day off for some much-needed self-care. Yoga in the morning, journaling, reading...',
    tags: ['self-care', 'relaxation', 'wellness']
  },
  {
    id: 5,
    date: '2025-10-15',
    title: 'Breakthrough Moment',
    mood: '🌟',
    preview: 'Had a therapy session today that really opened my eyes. Dr. Mitchell helped me realize some patterns...',
    tags: ['therapy', 'growth', 'hope']
  },
  {
    id: 6,
    date: '2025-10-12',
    title: 'Challenging Week',
    mood: '😔',
    preview: 'This week has been tough. Work deadlines piling up and feeling a bit overwhelmed...',
    tags: ['stress', 'support', 'gratitude']
  },
  {
    id: 7,
    date: '2025-10-05',
    title: 'Mindful Saturday',
    mood: '😌',
    preview: 'Tried meditation for the first time in months. It felt amazing to just sit with my thoughts...',
    tags: ['meditation', 'friends', 'mindfulness']
  },
  {
    id: 8,
    date: '2025-10-01',
    title: 'New Beginnings',
    mood: '😊',
    preview: 'Started using Moodsphere today! I\'m excited to track my journey and connect with friends...',
    tags: ['wellness', 'productivity', 'exercise']
  }
];

export default function JournalList({ entries = defaultJournalEntries }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  // Get all unique tags
  const allTags = ['all', ...new Set(entries.flatMap(entry => entry.tags))];

  // Filter entries by search term and tag
  const filteredEntries = entries.filter(entry => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.preview.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = selectedTag === 'all' || entry.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', options);
  };

  const handleEntryClick = (date) => {
    navigate(`/journal/${date}`);
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleNewEntry = () => {
    navigate('/journal-editor');
  };

  return (
    <div className="journal-list-page">
      <div className="journal-list-container">
        <div className="journal-navigation">
          <button className="journal-back-button" onClick={handleBack}>
            <span className="journal-back-arrow">←</span>
            <span className="journal-back-text">Back to Dashboard</span>
          </button>
        </div>

        <header className="journal-list-header">
          <div className="journal-header-content">
            <h1 className="journal-list-title">My Journal</h1>
            <p className="journal-list-subtitle">Your personal thoughts and reflections</p>
          </div>
          <button className="new-journal-button" onClick={handleNewEntry}>
            <span className="plus-icon">+</span>
            <span>New Entry</span>
          </button>
        </header>

        <div className="journal-controls">
          <div className="search-section">
            <input
              type="text"
              placeholder="Search journal entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="journal-search-input"
            />
          </div>

          <div className="tags-section">
            <label className="tags-label">Filter by tag:</label>
            <div className="tags-list">
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`tag-button ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="entries-count">
          {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'} found
        </div>

        <div className="journal-entries-grid">
          {filteredEntries.length === 0 ? (
            <div className="no-journal-entries">
              <div className="no-journal-icon">📔</div>
              <h2 className="no-journal-title">No Entries Found</h2>
              <p className="no-journal-text">
                {searchTerm || selectedTag !== 'all'
                  ? 'Try adjusting your filters or search term'
                  : 'Start documenting your journey by creating your first journal entry!'}
              </p>
              <button className="create-journal-button" onClick={handleNewEntry}>
                Create First Entry
              </button>
            </div>
          ) : (
            filteredEntries.map(entry => (
              <article
                key={entry.id}
                className="journal-entry-card"
                onClick={() => handleEntryClick(entry.date)}
              >
                <div className="journal-card-header">
                  <div className="journal-mood-icon">{entry.mood}</div>
                  <div className="journal-card-header-text">
                    <h3 className="journal-card-title">{entry.title}</h3>
                    <p className="journal-card-date">{formatDate(entry.date)}</p>
                  </div>
                </div>

                <p className="journal-card-preview">{entry.preview}</p>

                <div className="journal-card-footer">
                  <div className="journal-card-tags">
                    {entry.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="journal-card-tag">
                        #{tag}
                      </span>
                    ))}
                    {entry.tags.length > 3 && (
                      <span className="journal-card-tag-more">+{entry.tags.length - 3}</span>
                    )}
                  </div>
                  <button className="read-more-button">
                    Read More →
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
