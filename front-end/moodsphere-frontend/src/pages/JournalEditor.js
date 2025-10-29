import { useState } from "react";

export default function JournalEditor() {
  const [date, setDate]   = useState(new Date().toISOString().slice(0,10));
  const [title, setTitle] = useState("");
  const [body, setBody]   = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: replace with your real API call
    console.log("SAVE JOURNAL", { date, title, body });
    alert("Journal entry saved!");
  };

  return (
    <div className="page-wrap">
      <h1 className="page-title">New Journal Entry</h1>

      <form onSubmit={handleSubmit} className="card">
        <div className="grid2">
          <label className="block">
            <span className="label">Date</span>
            <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="input"/>
          </label>
          <label className="block">
            <span className="label">Title (optional)</span>
            <input type="text" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Today’s reflection" className="input"/>
          </label>
        </div>

        <label className="block">
          <span className="label">Entry</span>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={18}
            placeholder="Start journaling…"
            className="input notebook"
          />
        </label>

        <div className="actions">
          <button className="primary">Save</button>
        </div>
      </form>
    </div>
  );
}
