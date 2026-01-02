import "../styles/cravings.css";

export default function Cravings({ selectCraving, goBack }) {
  return (
    <div className="cravings">
      <button className="back" onClick={goBack}>← Back</button>

      <h2>What are you craving right now? 🍫</h2>

      <div className="craving-options">
        <button onClick={() => selectCraving("Dark Chocolate")}>
          🍫 Dark Chocolate
        </button>

        <button onClick={() => selectCraving("Hot Chocolate")}>
          ☕ Hot Chocolate
        </button>

        <button onClick={() => selectCraving("Strawberry Chocolate")}>
          🍓 Strawberry Chocolate
        </button>

        <button onClick={() => selectCraving("Milkshake")}>
          🥤 Milkshake
        </button>

        <button onClick={() => selectCraving("Pizza")}>
          🍕 Pizza
        </button>

        <button onClick={() => selectCraving("Pasta")}>
          🍝 Pasta
        </button>

        <button onClick={() => selectCraving("Biryani")}>
          🍛 Biryani
        </button>

        <button onClick={() => selectCraving("Parota")}>
          🫓 Parota
        </button>

        <button onClick={() => selectCraving("Dosa")}>
          🥞 Dosa
        </button>

        <button onClick={() => selectCraving("Chole")}>
          🥘 Chole
        </button>
      </div>
    </div>
  );
}
