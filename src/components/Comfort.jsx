import "../styles/comfort.css";

export default function Comfort({ feeling, goHome }) {
  const messages = {
    pain: `I know the pain can feel overwhelming 🤍
You don’t have to push yourself today.
Rest as much as you need — I’m right here with you.`,

    low: `It’s okay to feel low.
You don’t need to fix anything right now.
You’re loved exactly as you are 🤍`,

    irritated: `It’s okay if everything feels annoying right now.
Take a deep breath with me.
We’ll get through this together 🤍`,

    tired: `You’ve been so strong.
It’s okay to slow down now.
Let your body rest, love 🌙`,

    okay: `I’m really glad you’re feeling okay 🤍
Even on normal days, I’m always here for you.`


  };

  return (
    <div className="comfort">
      <p className="comfort-text">{messages[feeling]}</p>
      <button className="home-btn" onClick={goHome}>
        Back to Home 🤍
      </button>
    </div>
  );
}
