import "../styles/forHer.css";

export default function ForHer() {
  return (
    <div className="for-her">
      {/* Header */}
      <div className="for-her-header">
        <h2 className="title">For You, Amuluu 🤍</h2>
        <p className="subtitle">
          A gentle space made only for you
        </p>
      </div>

      {/* Soft intro card */}
      <div className="card soft-card">
        <p className="line">
          You are soft in your heart, strong in your soul,
          and beautifully organised in the way you live.
        </p>

        <p className="line">
          You feel deeply, love deeply, and still keep going —
          even when it gets heavy.
        </p>

        <p className="line">
          Your voice carries warmth.
          Your presence brings calm.
        </p>
      </div>

      {/* Love & personality */}
      <div className="card soft-card">
        <p className="line">
          You don’t need to be perfect.
        </p>
        <p className="line highlight">
          You are already more than enough.
        </p>
      </div>

      {/* Things she loves */}
      <div className="card soft-card">
        <h4 className="card-title">Little things you love 🤍</h4>
        <ul className="list">
          <li>🍰 Cakes, dark chocolate & sweet treats</li>
          <li>🍕 Pizza, pasta, dosa & comfort food</li>
          <li>🌷 Tulips & soft pink shades</li>
          <li>🎶 Singing, music & quiet moments</li>
          <li>📚 Books, rest & peaceful sleep</li>
          <li>🐶 Rio — your safest comfort</li>
        </ul>
      </div>

      {/* Closing note */}
      <div className="card note soft-card">
        <p className="note-text">
          This space is only for you.
          No expectations. No noise.
        </p>

        <p className="note-soft">
          Just warmth, comfort, and love 🤍
        </p>
      </div>
    </div>
  );
}
