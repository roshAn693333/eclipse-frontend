import lettersData from "../data/lettersData";
import "../styles/letterView.css";

export default function LetterView({ type, goBack }) {
  const letter = lettersData[type];

  if (!letter) {
    return (
      <div className="letter-view">
        <button className="back-btn" onClick={goBack}>
          ← Back
        </button>
        <p className="letter-missing">
          This letter isn’t available right now 🤍
        </p>
      </div>
    );
  }

  return (
    <div className="letter-view">
      <button className="back-btn" onClick={goBack}>
        ← Back
      </button>

      <div className="letter-box">
        <h2 className="letter-title">{letter.title}</h2>

        <p className="letter-content">
          {letter.content}
        </p>

        <div className="letter-footer">
          <span>Take a deep breath 🤍</span>
        </div>
      </div>
    </div>
  );
}
