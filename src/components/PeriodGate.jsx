import { useEffect, useState } from "react";
import PeriodCare from "./PeriodCare";
import PeriodSetup from "../pages/PeriodSetup";

export default function PeriodGate({ setScreen }) {
  const [configured, setConfigured] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/period/status")
      .then(res => res.json())
      .then(data => setConfigured(data.configured));
  }, []);

  if (configured === null) return <p>Loading…</p>;

  return configured ? (
    <PeriodCare />
  ) : (
    <PeriodSetup onDone={() => setScreen("period")} />
  );
}
