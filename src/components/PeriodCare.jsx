import { useState, useEffect, useRef } from "react";
import { getComfortMessage } from "../utils/comfortMessages";
import { getCycleStatus } from "../utils/cycleEngine";
import "../styles/period.css";
import { getSelfCareSuggestion } from "../utils/selfCareSuggestions";
import emailjs from "emailjs-com";

export default function PeriodCare({ cycleData }) {
  const [mood, setMood] = useState("");
  const [pain, setPain] = useState("");
  const [craving, setCraving] = useState("");
  const [notified, setNotified] = useState(false);

  const alertSentRef = useRef(false); // 🔒 prevents duplicate sends

  const cycleStatus = getCycleStatus(cycleData);
  const selfCareText = cycleStatus
    ? getSelfCareSuggestion(cycleStatus.phase)
    : null;

  /* 🔔 PERIOD NEAR / TODAY EMAIL ALERT (ONCE PER DAY) */
  useEffect(() => {
    if (!cycleStatus || alertSentRef.current) return;

    const today = new Date().toDateString();
    const lastAlert = localStorage.getItem("periodAlertSentAt");

    if (lastAlert === today) return;

    let alertMessage = "";

    if (cycleStatus.daysToNextPeriod === 0) {
      alertMessage = "Her period starts today 🩸 Please take extra care 🤍";
    } else if (cycleStatus.daysToNextPeriod === 2) {
      alertMessage = "Her period is near (in 2 days) 🩸 Just a heads-up 🤍";
    }

    if (!alertMessage) return;

    emailjs
      .send(
        "service_li74czo",
        "template_3a3tdat",
        { message: alertMessage },
        "8Jbj_zioBOBsP8tdc"
      )
      .then(() => {
        console.log("✅ Period alert email sent");
        localStorage.setItem("periodAlertSentAt", today);
        alertSentRef.current = true;
      })
      .catch((err) => {
        console.error("❌ Period alert email failed:", err);
      });
  }, [cycleStatus]);

  if (!cycleStatus) {
    return (
      <div className="period-container">
        <p className="center">Tell me about your cycle first 🤍</p>
      </div>
    );
  }

  const isMenstrual = cycleStatus.phase === "Menstrual";

  const comfortText = getComfortMessage(
    mood,
    pain,
    cycleStatus.dayInCycle
  );

  const saveLog = () => {
    alert("Saved 🤍");
  };

  /* 🍕 CRAVINGS → EMAIL WITH DAY + PAIN */
  const saveCraving = async (item) => {
    setCraving(item);

    const day = cycleStatus?.dayInCycle ?? "Unknown";
    const painLevel = pain || "Not shared";

    const emailMessage = `She is craving ${item} 🤍

Cycle Day: ${day}
Pain: ${painLevel}`;

    try {
      await emailjs.send(
        "service_li74czo",
        "template_3a3tdat",
        { message: emailMessage },
        "8Jbj_zioBOBsP8tdc"
      );

      setNotified(true);
    } catch (error) {
      console.error("❌ Craving email failed:", error);
    }
  };

  return (
    <div className="period-container">
      {isMenstrual ? (
        <>
          <div className="period-header">
            <h2 style={{ color: "#C94A7C" }}>
              Day {cycleStatus.dayInCycle}
            </h2>
            <p className="subtitle">I’m here with you 🤍</p>
          </div>

          <div className="period-section">
            <p className="comfort-text">{comfortText}</p>
          </div>

          <div className="period-section">
            <label>Mood</label>
            <select value={mood} onChange={(e) => setMood(e.target.value)}>
              <option value="">Select</option>
              <option value="low">Low</option>
              <option value="crampy">Crampy</option>
              <option value="irritated">Irritated</option>
              <option value="emotional">Emotional</option>
              <option value="okay">Okay</option>
            </select>

            <label>Pain</label>
            <select value={pain} onChange={(e) => setPain(e.target.value)}>
              <option value="">Select</option>
              <option value="none">None</option>
              <option value="mild">Mild</option>
              <option value="medium">Medium</option>
              <option value="heavy">Heavy</option>
            </select>

            <button onClick={saveLog}>Save Today</button>
          </div>

          <div className="period-section">
            <h3 style={{ color: "#C94A7C" }}>Cravings</h3>

            <div className="cravings-grid">
              {["Chocolate", "Pizza", "Fries", "Ice Cream", "Comfort Food"].map(
                (item) => (
                  <button
                    key={item}
                    className={craving === item ? "active" : ""}
                    onClick={() => saveCraving(item)}
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            {craving && (
              <p className="craving-text">
                You want <strong>{craving}</strong> 🤍
              </p>
            )}

            {notified && (
              <p className="notify-text">He’s been notified 🤍</p>
            )}
          </div>
        </>
      ) : (
        <div className="period-header">
          <h2 style={{ color: "#C94A7C" }}>{cycleStatus.phase}</h2>
          <p className="subtitle">
            Next period in{" "}
            <strong>{cycleStatus.daysToNextPeriod} days</strong>
          </p>

          <div className="period-section">
            <p className="comfort-text">
              You’re not on your period today 🤍  
              I’m still here whenever you need care.
            </p>
          </div>
        </div>
      )}

      {selfCareText && (
        <div className="period-section">
          <h3 style={{ color: "#C94A7C" }}>Today’s Care</h3>
          <p className="comfort-text">{selfCareText}</p>
        </div>
      )}
    </div>
  );
}
