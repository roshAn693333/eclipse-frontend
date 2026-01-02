import { useState } from "react";

export default function PeriodSetup({ onSave }) {
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [regularity, setRegularity] = useState("regular");

  const handleSubmit = () => {
    if (!lastPeriodDate) {
      alert("Please select your last period date");
      return;
    }

    const cycleData = {
      lastPeriodDate,
      cycleLength,
      periodLength,
      regularity,
    };

    onSave(cycleData);
  };

  return (
    <div className="setup">

      <h2>Let’s understand your cycle</h2>
      <p>This helps us care for you better.</p>

      {/* Last period date */}
      <label>Last period start date</label>
      <input
        type="date"
        value={lastPeriodDate}
        onChange={(e) => setLastPeriodDate(e.target.value)}
      />

      {/* Cycle length */}
      <label>Average cycle length (days)</label>
      <input
        type="number"
        min="20"
        max="40"
        value={cycleLength}
        onChange={(e) => setCycleLength(Number(e.target.value))}
      />

      {/* Period length */}
      <label>Period length (days)</label>
      <input
        type="number"
        min="2"
        max="10"
        value={periodLength}
        onChange={(e) => setPeriodLength(Number(e.target.value))}
      />

      {/* Regularity */}
      <label>Is your cycle regular?</label>
      <select
        value={regularity}
        onChange={(e) => setRegularity(e.target.value)}
      >
        <option value="regular">Regular</option>
        <option value="irregular">Irregular</option>
      </select>

      <button onClick={handleSubmit}>
        Save & Continue
      </button>

    </div>
  );
}
