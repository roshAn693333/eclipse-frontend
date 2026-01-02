import { useState, useEffect, useMemo } from "react";

import Home from "./components/Home";
import PeriodCare from "./components/PeriodCare";
import Letters from "./components/Letters";
import LetterView from "./pages/LetterView";
import Feeling from "./components/Feeling";
import Comfort from "./components/Comfort";
import Cravings from "./components/Cravings";
import BottomNav from "./components/BottomNav";
import ForHer from "./components/ForHer";
import CycleSetup from "./components/CycleSetup";
import Message from "./components/Message";


import { getSmartLetter } from "./utils/smartLetters";
import { getCycleStatus } from "./utils/cycleEngine";


function App() {
  const [screen, setScreen] = useState("home");
  const [currentLetter, setCurrentLetter] = useState(null);
  const [feeling, setFeeling] = useState(null);

  // 🩸 GLOBAL CYCLE DATA (single source of truth)
  const [cycleData, setCycleData] = useState(() => {
    const saved = localStorage.getItem("cycleData");
    return saved
      ? JSON.parse(saved)
      : {
          lastPeriodDate: "",
          cycleLength: 28,
          periodLength: 5,
          regularity: "regular",
        };
  });

  // 🩸 Log period as today
  const logPeriodToday = () => {
    const today = new Date().toISOString().split("T")[0];
    setCycleData((prev) => ({
      ...prev,
      lastPeriodDate: today,
    }));
    setScreen("period");
  };

  // 🔔 Notification listener (unchanged logic)
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://localhost:5000/notify-latest");
        const data = await res.json();

        if (data?.title) {
          new Notification(data.title, { body: data.body });
        }
      } catch (err) {
        console.error("Notification listener error", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 🔹 Global open cycle setup
  useEffect(() => {
    const openSetup = () => setScreen("setup");
    window.addEventListener("openCycleSetup", openSetup);
    return () =>
      window.removeEventListener("openCycleSetup", openSetup);
  }, []);

  // 🔹 Global quick actions
  useEffect(() => {
    const goPeriod = () => logPeriodToday();
    const goMood = () => setScreen("feeling");
    const goSymptoms = () => setScreen("period");
    const goSelfCare = () => setScreen("comfort");

    window.addEventListener("goPeriod", goPeriod);
    window.addEventListener("goMood", goMood);
    window.addEventListener("goSymptoms", goSymptoms);
    window.addEventListener("goSelfCare", goSelfCare);

    return () => {
      window.removeEventListener("goPeriod", goPeriod);
      window.removeEventListener("goMood", goMood);
      window.removeEventListener("goSymptoms", goSymptoms);
      window.removeEventListener("goSelfCare", goSelfCare);
    };
  }, []);

  // 💾 Persist cycle data
  useEffect(() => {
    if (cycleData?.lastPeriodDate) {
      localStorage.setItem("cycleData", JSON.stringify(cycleData));
    }
  }, [cycleData]);

  // 🧠 Derived logic (memoized for stability)
  const cycleStatus = useMemo(
    () => getCycleStatus(cycleData),
    [cycleData]
  );

  const letterSuggestion = useMemo(
    () => getSmartLetter(cycleStatus),
    [cycleStatus]
  );

  return (
    <div className="app-container">
      {screen === "home" && <Home cycleData={cycleData} />}

      {screen === "period" && (
        <PeriodCare
          cycleData={cycleData}
          openFeeling={() => setScreen("feeling")}
          openLetters={() => setScreen("letters")}
          openCravings={() => setScreen("cravings")}
        />
      )}


      {screen === "letters" && (
        <Letters
          suggestion={letterSuggestion}
          openLetter={(type) => {
            setCurrentLetter(type);
            setScreen("letterView");
          }}
        />
      )}
{screen === "message" && (
  <Message goBack={() => setScreen("home")} />
)}

      {screen === "letterView" && (
        <LetterView
          type={currentLetter}
          goBack={() => setScreen("letters")}
        />
      )}

      {screen === "forHer" && <ForHer />}

      {screen === "feeling" && (
        <Feeling
          selectFeeling={(type) => {
            setFeeling(type);
            setScreen("comfort");
          }}
          goBack={() => setScreen("period")}
        />
      )}

      {screen === "comfort" && (
        <Comfort
          feeling={feeling}
          goHome={() => setScreen("home")}
        />
      )}

      {screen === "cravings" && (
        <Cravings
          selectCraving={() => setScreen("home")}
          goBack={() => setScreen("period")}
        />
      )}

      {screen === "setup" && (
        <CycleSetup
          cycleData={cycleData}
          onSave={(data) => {
            setCycleData(data);
            setScreen("home");
          }}
          goBack={() => setScreen("home")}
        />
      )}

      <BottomNav setScreen={setScreen} />
    </div>
  );
}

export default App;
