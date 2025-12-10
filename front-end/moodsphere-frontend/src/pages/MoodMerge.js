import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MoodMerge.css';

const MOOD_EMOJIS = {
  happy: '😊',
  excited: '🤩',
  calm: '😌',
  grateful: '🙏',
  sad: '😢',
  anxious: '😰',
  angry: '😠',
  tired: '😴',
  neutral: '😐',
  annoyed: '🙄',
  inspired: '🌟',
  stressed: '😩',
  'burnt out': '🫩',
};

const MOOD_COLORS = {
  happy: '#FFD93D',
  excited: '#FF6B9D',
  calm: '#A7C7E7',
  grateful: '#C9A0DC',
  sad: '#6CB4EE',
  anxious: '#FFA07A',
  angry: '#FF6B6B',
  tired: '#B0C4DE',
  neutral: '#9CA3AF',
  annoyed: '#F472B6',
  inspired: '#FBBF24',
  stressed: '#FB923C',
  'burnt out': '#78350F',
};

function MoodMerge() {
  const [moods, setMoods] = useState([]);
  const [mergedColor, setMergedColor] = useState('#A7C7E7');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/moods', {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      const data = await response.json();
      if (response.ok && data.moods) {
        setMoods(data.moods);
        calculateMergedColor(data.moods);
      }
    } catch (error) {
      console.error('Error fetching moods:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateMergedColor = (moodList) => {
    if (moodList.length === 0) {
      setMergedColor('#A7C7E7');
      return;
    }

    // Get all colors from moods
    const colors = moodList.map((m) => {
      const moodKey = m.mood.toLowerCase();
      return MOOD_COLORS[moodKey] || '#A7C7E7';
    });

    // Average the RGB values
    let totalR = 0, totalG = 0, totalB = 0;

    colors.forEach((color) => {
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      totalR += r;
      totalG += g;
      totalB += b;
    });

    const avgR = Math.round(totalR / colors.length);
    const avgG = Math.round(totalG / colors.length);
    const avgB = Math.round(totalB / colors.length);

    const merged = `#${avgR.toString(16).padStart(2, '0')}${avgG.toString(16).padStart(2, '0')}${avgB.toString(16).padStart(2, '0')}`;
    setMergedColor(merged);
  };

  const handleDelete = async (moodId) => {
    if (!window.confirm('Are you sure you want to delete this mood entry?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/moods/${moodId}`, {
        method: 'DELETE',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });

      if (response.ok) {
        const updatedMoods = moods.filter((m) => m._id !== moodId);
        setMoods(updatedMoods);
        calculateMergedColor(updatedMoods);
      } else {
        alert('Failed to delete mood');
      }
    } catch (error) {
      console.error('Error deleting mood:', error);
      alert('Error deleting mood');
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="mood-merge-page">
      <div className="mood-merge-container">
        <header className="mood-merge-header">
          <button onClick={() => navigate('/dashboard')} className="merge-back-button">
            ←
          </button>
          <div className="merge-header-content">
            <h1 className="merge-title">Mood Merge</h1>
            <p className="merge-subtitle">View your mood history and see your emotional blend</p>
          </div>
        </header>

        {/* Content Area */}
        <div className="merge-content-area">
          {/* Merged Color Display */}
          <div className="merged-color-section">
            <h2 className="section-title">Your Merged Mood Color</h2>
            <div className="merged-color-display" style={{ backgroundColor: mergedColor }}>
              <div className="merged-color-info">
                <p className="merged-color-text">
                  {moods.length === 0
                    ? 'No moods logged yet'
                    : `Blend of ${moods.length} mood${moods.length !== 1 ? 's' : ''}`}
                </p>
                <p className="merged-color-code">{mergedColor.toUpperCase()}</p>
              </div>
            </div>
          </div>

          {/* Mood History */}
          <div className="mood-history-section">
            <h2 className="section-title">Mood History</h2>

            {loading ? (
              <p className="loading-text">Loading moods...</p>
            ) : moods.length === 0 ? (
              <div className="empty-state">
                <p>No moods logged yet. Start tracking your moods from the dashboard!</p>
                <button onClick={() => navigate('/log-mood')} className="log-mood-button">
                  Log Your First Mood
                </button>
              </div>
            ) : (
              <div className="mood-list">
                {moods.map((mood) => {
                  const moodKey = mood.mood.toLowerCase();
                  const emoji = MOOD_EMOJIS[moodKey] || '😊';
                  const color = MOOD_COLORS[moodKey] || '#A7C7E7';

                  return (
                    <div key={mood._id} className="mood-item">
                      <div className="mood-item-left">
                        <div
                          className="mood-item-emoji-circle"
                          style={{ backgroundColor: color }}
                        >
                          <span className="mood-item-emoji">{emoji}</span>
                        </div>
                        <div className="mood-item-info">
                          <h3 className="mood-item-label">{capitalize(mood.mood)}</h3>
                          <p className="mood-item-timestamp">
                            {formatTimestamp(mood.loggedAt)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(mood._id)}
                        className="delete-button"
                        aria-label="Delete mood"
                      >
                        🗑️
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoodMerge;
