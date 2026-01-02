import { useEffect, useState } from "react";
import "../styles/home.css";
import { getCycleStatus } from "../utils/cycleEngine";
import { getPartnerInsight } from "../utils/partnerInsights";

/* ---------- Helpers ---------- */

function getPhaseGreeting(phase) {
  switch (phase) {
    case "Menstrual":
      return "Take it slow today 🤍\nRest is part of healing.";
    case "Follicular":
      return "A gentle fresh start 🌸\nYour energy is slowly rising.";
    case "Ovulation":
      return "You’re glowing today ✨\nConfidence looks beautiful on you.";
    case "Luteal":
      return "Be kind to yourself 🤍\nIt’s okay to feel a little more sensitive.";
    default:
      return "I hope today treats you gently 🤍";
  }
}

function shouldAskForCycleReview() {
  const lastAsked = localStorage.getItem("cycleReviewAskedAt");
  if (!lastAsked) return true;

  const daysPassed = Math.floor(
    (new Date() - new Date(lastAsked)) / (1000 * 60 * 60 * 24)
  );
  return daysPassed >= 28;
}

function renderPhaseBar(currentPhase) {
  const phases = ["Menstrual", "Follicular", "Ovulation", "Luteal"];

  return (
    <div className="phase-bar">
      {phases.map((phase) => (
        <div
          key={phase}
          className={`phase-pill ${phase === currentPhase ? "active" : ""}`}
        >
          {phase}
        </div>
      ))}
    </div>
  );
}

/* ---------- Component ---------- */

export default function Home({ cycleData }) {
  const [dailyMessage, setDailyMessage] = useState("");
  const [dayFeeling, setDayFeeling] = useState("");
  const [showCycleReview, setShowCycleReview] = useState(false);

  // ✅ Cycle status
  const cycleStatus = getCycleStatus(cycleData);
  const hasCycleInfo = Boolean(cycleData?.lastPeriodDate);

  const partnerInsight = cycleStatus
    ? getPartnerInsight(cycleStatus.phase)
    : null;

  /* Phase-based greeting */
  useEffect(() => {
    const hour = new Date().getHours();
    let baseMessage = "";

    if (hour >= 6 && hour < 12) baseMessage = "Good morning.\n";
    else if (hour >= 23 || hour < 6) baseMessage = "Good night.\n";

    if (cycleStatus?.phase) {
      setDailyMessage(baseMessage + getPhaseGreeting(cycleStatus.phase));
    } else {
      setDailyMessage(baseMessage + "I hope today treats you gently 🤍");
    }
  }, [cycleStatus]);

  /* Monthly review prompt */
  useEffect(() => {
    if (hasCycleInfo && shouldAskForCycleReview()) {
      setShowCycleReview(true);
    }
  }, [hasCycleInfo]);

  return (
    <div className="home">
      <h2 className="greeting">ECLIPSE</h2>

      <div className="message-card">
        <p style={{ whiteSpace: "pre-line" }}>{dailyMessage}</p>
      </div>

      {/* MOOD (ONLY ONCE NOW) */}
      <div className="mood-box">
        <p className="mood-title">How are you feeling today?</p>
        <div className="moods">
          <button onClick={() => setDayFeeling("Calm")}>🌿 Calm</button>
          <button onClick={() => setDayFeeling("Low")}>🌧️ Low</button>
          <button onClick={() => setDayFeeling("Frustrated")}>🔥 Frustrated</button>
          <button onClick={() => setDayFeeling("Tired")}>🌙 Tired</button>
        </div>
      </div>

      {dayFeeling && (
        <div className="day-box">
          <p className="day-response">
            Thank you for sharing 🤍 Feeling <strong>{dayFeeling}</strong> is completely okay.
          </p>
        </div>
      )}

      {/* Cycle Card */}
      <div className="cycle-card">
        {hasCycleInfo ? (
          <>
            <p className="cycle-label">🩸 Next period in</p>
            <h1 className="cycle-days">{cycleStatus.daysToNextPeriod} Days</h1>
            <span className="cycle-phase">{cycleStatus.phase}</span>
            {renderPhaseBar(cycleStatus.phase)}
          </>
        ) : (
          <>
            <p className="cycle-label">🩸 Cycle info not set</p>
            <p className="cycle-phase">
              Tell me about your cycle so I can take better care of you 🤍
            </p>
          </>
        )}

        <button
          className="edit-cycle-link"
          onClick={() => window.dispatchEvent(new Event("openCycleSetup"))}
        >
          Edit cycle
        </button>
      </div>

      {showCycleReview && (
        <div className="cycle-review-card">
          <p>Does this cycle information still feel accurate? 🤍</p>
          <button
            onClick={() => {
              localStorage.setItem("cycleReviewAskedAt", new Date().toISOString());
              window.dispatchEvent(new Event("openCycleSetup"));
            }}
          >
            Update cycle info
          </button>
        </div>
      )}

      {/* Insights */}
      <div className="insight-card">
        {partnerInsight && (
          <div className="partner-insight">
            <p>💌 For you</p>
            <span>{partnerInsight}</span>
          </div>
        )}

        <h4>✨ Today’s Insight</h4>
        <p>{cycleStatus ? cycleStatus.phaseMessage : "Listening to your body today."}</p>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <div className="action-card" onClick={() => window.dispatchEvent(new Event("openCycleSetup"))}>
          🩸 Update period date
        </div>
        <div className="action-card" onClick={() => window.dispatchEvent(new Event("goMood"))}>
          📝 Log Mood
        </div>
        <div className="action-card" onClick={() => window.dispatchEvent(new Event("goSymptoms"))}>
          🩺 Symptoms
        </div>
        <div className="action-card" onClick={() => window.dispatchEvent(new Event("goSelfCare"))}>
          🧘 Self-Care
        </div>
      </div>

      <p className="daily-care">Be gentle with yourself today.</p>
    </div>
  );
}
