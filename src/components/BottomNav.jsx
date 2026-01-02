import "../styles/bottomNav.css";

export default function BottomNav({ setScreen }) {
  return (
    <div className="bottom-nav">
      <div className="nav-item" onClick={() => setScreen("home")}>
        <span>🏠</span>
        <p>Home</p>
      </div>

      <div className="nav-item" onClick={() => setScreen("period")}>
        <span>🩸</span>
        <p>Care</p>
      </div>

      <div className="nav-item" onClick={() => setScreen("letters")}>
        <span>💌</span>
        <p>Letters</p>
      </div>

      <div className="nav-item" onClick={() => setScreen("message")}>
        <span>📝</span>
        <p>Write</p>
      </div>

      <div className="nav-item" onClick={() => setScreen("forHer")}>
        <span>🤍</span>
        <p>You</p>
      </div>
    </div>
  );
}
