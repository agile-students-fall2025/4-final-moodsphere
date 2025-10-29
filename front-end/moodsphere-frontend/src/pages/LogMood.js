import { useState } from "react";

const MOODS = [
  { key: "ecstatic", label: "Ecstatic", emoji: "🤩" },
  { key: "happy",    label: "Happy",    emoji: "😊" },
  { key: "calm",     label: "Calm",     emoji: "😌" },
  { key: "meh",      label: "Meh",      emoji: "😐" },
  { key: "sad",      label: "Sad",      emoji: "😔" },
  { key: "angry",    label: "Angry",    emoji: "😠" },
];

export default function LogMood() {
  const [mood, setMood] = useState(null);
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: replace with real API call
    console.log("SAVE MOOD", { mood, note, at: new Date().toISOString() });
    alert("Mood saved!");
  };

  return (
    <div className="page-wrap">
      <h1 className="page-title">Log Mood</h1>

      <form onSubmit={handleSubmit} className="card">
        <div className="mood-grid">
          {MOODS.map(m => (
            <button
              key={m.key}
              type="button"
              className={`mood ${mood === m.key ? "active" : ""}`}
              onClick={() => setMood(m.key)}
              aria-pressed={mood === m.key}
            >
              <span className="emoji" aria-hidden>{m.emoji}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        <label className="block">
          <span className="label">Notes (optional)</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            placeholder="Add a quick reflection…"
            className="input"
          />
        </label>

        <div className="actions">
          <button disabled={!mood} className="primary">Save</button>
        </div>
      </form>
    </div>
  );
}
