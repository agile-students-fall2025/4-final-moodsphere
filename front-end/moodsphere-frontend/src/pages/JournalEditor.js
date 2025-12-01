import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./JournalEditor.css";

export default function JournalEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      const fetchEntry = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch('http://localhost:5001/api/entries', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          const data = await response.json();

          if (response.ok) {
            const entry = data.entries.find(e => e._id === id);
            if (entry) {
              setTitle(entry.title);
              setBody(entry.content);
              setDate(new Date(entry.createdAt).toISOString().slice(0, 10));
            }
          }
        } catch (error) {
          console.error('Error fetching entry:', error);
        }
      };

      fetchEntry();
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const journalData = {
      title: title || 'Untitled',
      content: body,
    };

    if (!isEditMode) {
      journalData.createdAt = date + 'T12:00:00.000Z';
    }

    try {
      const token = localStorage.getItem('token');

      const url = isEditMode
        ? `http://localhost:5001/api/entries/${id}`
        : 'http://localhost:5001/api/entries';

      const method = isEditMode ? 'PUT' : 'POST';

      console.log('Submitting:', { url, method, journalData, id });

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(journalData),
      });

      let data;
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Server returned an error. Please check backend logs.');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save journal entry');
      }

      console.log("✅ JOURNAL SAVED TO BACKEND:", data);
      const message = isEditMode
        ? "Journal entry updated successfully!"
        : "Journal entry saved! Check your calendar 📅";
      alert(message);
      navigate("/view-entry");
    } catch (error) {
      console.error('❌ Error saving journal:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="journal-editor-page">
      <div className="journal-editor-container">
        {/* Header Section */}
        <header className="journal-editor-header">
          <button className="journal-back-button" onClick={handleBack}>
            ←
          </button>
          <div className="journal-header-content">
            <h1 className="journal-editor-title">
              {isEditMode ? 'Edit Journal Entry' : 'New Journal Entry'}
            </h1>
            <p className="journal-editor-subtitle">Document your thoughts and feelings</p>
          </div>
        </header>

        {/* Main Form Area */}
        <div className="journal-content-area">
          <form onSubmit={handleSubmit} className="journal-form">
            {/* Date and Title Section */}
            <div className="journal-section">
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="entry-date" className="form-label">Date</label>
                  <input
                    id="entry-date"
                    type="date"
                    value={date}
                    onChange={e=>setDate(e.target.value)}
                    className="form-input"
                    disabled={isEditMode}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="entry-title" className="form-label">
                    Title <span className="optional-text">(optional)</span>
                  </label>
                  <input
                    id="entry-title"
                    type="text"
                    value={title}
                    onChange={e=>setTitle(e.target.value)}
                    placeholder="Today's reflection"
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Journal Entry Section */}
            <div className="journal-section">
              <label htmlFor="entry-body" className="section-title">Your Entry</label>
              <textarea
                id="entry-body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Start writing... Share your thoughts, feelings, and experiences from today."
                className="journal-textarea-input"
                required
              />
              <div className="char-count">
                {body.length} characters
              </div>
            </div>

            {/* Action Buttons */}
            <div className="journal-actions">
              <button type="button" onClick={handleBack} className="btn-cancel">
                Cancel
              </button>
              <button type="submit" className="btn-save" disabled={loading}>
                {loading ? 'Saving...' : (isEditMode ? 'Update Entry' : 'Save Entry')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
