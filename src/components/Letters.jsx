import lettersData from "../data/lettersData";
import "../styles/letters.css";

export default function Letters({ openLetter, suggestion }) {
  return (
    <div className="letters-page">
      <h2 className="letters-heading">Letters for you 🤍</h2>
      <p className="letters-subheading">
        Choose what you need right now
      </p>

      <div className="letters-container">
        {Object.entries(lettersData).map(([key, letter]) => (
          <div
            key={key}
            className="letter-card"
            onClick={() => openLetter(key)}
          >
            <h3>{letter.title}</h3>

            {/* Optional suggestion highlight */}
            {suggestion === key && (
              <span style={{ color: "#c47aa0", fontSize: "0.8rem" }}>
                Suggested for you 🤍
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
