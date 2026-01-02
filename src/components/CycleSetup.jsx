import { useState } from "react";
import "../styles/setup.css";


export default function CycleSetup({ cycleData, onSave, goBack }) {
  const [lastPeriodDate, setLastPeriodDate] = useState(
    cycleData.lastPeriodDate || ""
  );
  const [cycleLength, setCycleLength] = useState(
    cycleData.cycleLength || 28
  );
  const [periodLength, setPeriodLength] = useState(
    cycleData.periodLength || 5
  );
  const [regularity, setRegularity] = useState(
    cycleData.regularity || "regular"
  );

  const handleSave = () => {
    if (!lastPeriodDate) {
      alert("Please select your last period start date 🤍");
      return;
    }

    onSave({
      lastPeriodDate,
      cycleLength,
      periodLength,
      regularity,
    });
  };

  return (
    <div className="setup-container">
      <h2 style={{ color: "#C94A7C" }}>Your Cycle</h2>
      <p className="subtitle">
        This helps me understand your body better 🤍  
        You can update this anytime.
      </p>

      <label>Last period start date</label>
      <input
        type="date"
        value={lastPeriodDate}
        onChange={(e) => setLastPeriodDate(e.target.value)}
      />

      <label>Average cycle length (days)</label>
      <input
        type="number"
        min="20"
        max="40"
        value={cycleLength}
        onChange={(e) => setCycleLength(Number(e.target.value))}
      />

      <label>Period length (days)</label>
      <input
        type="number"
        min="2"
        max="10"
        value={periodLength}
        onChange={(e) => setPeriodLength(Number(e.target.value))}
      />

      <label>Cycle regularity</label>
      <select
        value={regularity}
        onChange={(e) => setRegularity(e.target.value)}
      >
        <option value="regular">Regular</option>
        <option value="irregular">Irregular</option>
      </select>

      <div style={{ marginTop: 24 }}>
        <button onClick={handleSave}>
          Save changes
        </button>

        <button
          onClick={goBack}
          style={{ marginLeft: 12 }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
