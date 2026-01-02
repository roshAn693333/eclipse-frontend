export default function PeriodLog({ cycleData, setCycleData, goBack }) {
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleConfirm = () => {
    setCycleData({
      ...cycleData,
      lastPeriodDate: date,
    });
    goBack();
  };

  return (
    <div className="period-log">
      <h2>🩸 Log Period</h2>
      <p>When did your period start?</p>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={handleConfirm}>
        Confirm
      </button>

      <button onClick={goBack}>
        Cancel
      </button>
    </div>
  );
}
