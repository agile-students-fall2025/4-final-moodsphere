import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LogMood.css";

const MOODS = [
  { key: "happy", label: "Happy", emoji: "😊" },
  { key: "excited", label: "Excited", emoji: "🤩" },
  { key: "calm", label: "Calm", emoji: "😌" },
  { key: "grateful", label: "Grateful", emoji: "🙏" },
  { key: "sad", label: "Sad", emoji: "😢" },
  { key: "anxious", label: "Anxious", emoji: "😰" },
  { key: "angry", label: "Angry", emoji: "😠" },
  { key: "tired", label: "Tired", emoji: "😴" },
];

export default function LogMood() {
  const navigate = useNavigate();
  const [mood, setMood] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: replace with real API call
    console.log("SAVE MOOD", { mood, at: new Date().toISOString() });
    alert("Mood saved!");
    navigate("/dashboard");
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="log-mood-page">
      <div className="log-mood-container">
        {/* Header Section */}
        <header className="log-mood-header">
          <button className="mood-back-button" onClick={handleBack}>
            ←
          </button>
          <div className="mood-header-content">
            <h1 className="log-mood-title">Log Mood</h1>
            <p className="log-mood-subtitle">How are you feeling right now?</p>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="log-mood-content-area">
          <form onSubmit={handleSubmit} className="mood-form">
            {/* Mood Selection Section */}
            <div className="mood-section">
              <h3 className="mood-section-title">Select your mood</h3>
              <div className="mood-selection-grid">
                {MOODS.map(m => (
                  <button
                    key={m.key}
                    type="button"
                    className={`mood-choice-btn ${mood === m.key ? "mood-choice-selected" : ""}`}
                    onClick={() => setMood(m.key)}
                    aria-pressed={mood === m.key}
                  >
                    <span className="mood-choice-emoji">{m.emoji}</span>
                    <span className="mood-choice-label">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mood-actions">
              <button type="button" onClick={handleBack} className="mood-btn-cancel">
                Cancel
              </button>
              <button type="submit" disabled={!mood} className="mood-btn-save">
                Save Mood
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
