import "../styles/feeling.css";

export default function Feeling({ selectFeeling, goBack }) {
  return (
    <div className="feeling">
      <button className="back" onClick={goBack}>← Back</button>

      <h2>How are you feeling right now?</h2>

      <div className="feeling-options">
        <button onClick={() => selectFeeling("pain")}>😣 Pain is bad</button>
        <button onClick={() => selectFeeling("low")}>😔 Feeling low</button>
        <button onClick={() => selectFeeling("irritated")}>😤 Irritated</button>
        <button onClick={() => selectFeeling("tired")}>😴 Very tired</button>
        <button onClick={() => selectFeeling("okay")}>🙂 Doing okay</button>
      </div>
    </div>
  );
}
