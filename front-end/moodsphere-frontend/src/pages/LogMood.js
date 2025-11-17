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
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood) return;

    setIsSaving(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5001/api/moods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mood,
          loggedAt: new Date().toISOString(), // send timestamp
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save mood");
      }

      const data = await response.json();
      console.log("✅ MOOD SAVED TO BACKEND:", data);

      alert("Mood saved! Check your dashboard");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Something went wrong saving your mood. Please try again.");
    } finally {
      setIsSaving(false);
    }
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
                {MOODS.map((m) => (
                  <button
                    key={m.key}
                    type="button"
                    className={`mood-choice-btn ${
                      mood === m.key ? "mood-choice-selected" : ""
                    }`}
                    onClick={() => setMood(m.key)}
                    aria-pressed={mood === m.key}
                  >
                    <span className="mood-choice-emoji">{m.emoji}</span>
                    <span className="mood-choice-label">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="mood-error">{error}</p>}

            {/* Action Buttons */}
            <div className="mood-actions">
              <button
                type="button"
                onClick={handleBack}
                className="mood-btn-cancel"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!mood || isSaving}
                className="mood-btn-save"
              >
                {isSaving ? "Saving..." : "Save Mood"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
