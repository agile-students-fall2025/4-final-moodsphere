import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JournalEditor.css";

export default function JournalEditor() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const journalData = {
      title: title || 'Untitled',
      content: body,
      createdAt: date + 'T12:00:00.000Z' // Convert YYYY-MM-DD to ISO format
    };

    try {
      const response = await fetch('http://localhost:5001/api/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(journalData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save journal entry');
      }

      console.log("✅ JOURNAL SAVED TO BACKEND:", data);
      alert("Journal entry saved! Check your calendar 📅");
      navigate("/dashboard");
    } catch (error) {
      console.error('❌ Error saving journal:', error);
      alert(`Error: ${error.message}`);
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
            <h1 className="journal-editor-title">New Journal Entry</h1>
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
              <button type="submit" className="btn-save">
                Save Entry
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
