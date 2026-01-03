import { useState } from "react";
import "../styles/message.css";

export default function Message({ goBack }) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  const sendMessage = async () => {
    if (!message.trim()) return;

    setStatus("sending");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/send-message`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );

      if (!res.ok) throw new Error("Failed");

      setMessage("");
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="message-page">
      <button className="back-btn" onClick={goBack}>← Back</button>

      <h2 className="title">Write to me 🤍</h2>

      <div className="intro-card">
        <p>
          This space is for moments when you don’t know what to say,
          or when you can’t text me directly.
        </p>

        <p>
          You don’t have to think too much here.
          Write exactly what you feel
          even if it’s messy, even if it’s small.
        </p>

        <p>
          If something is bothering you,
          or if you need me to know something important,
          you can tell me here.
        </p>

        <p className="intro-soft">
          I’ll read everything 🤍
        </p>
      </div>

      <textarea
        placeholder="Type anything you feel..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button className="send-btn thick" onClick={sendMessage}>
        {status === "sending" ? "Sending…" : "Send 🤍"}
      </button>

      {status === "sent" && (
        <p className="status success">
          Your message reached me 🤍
        </p>
      )}

      {status === "error" && (
        <p className="status error">
          Something went wrong. Try again later.
        </p>
      )}
    </div>
  );
}
