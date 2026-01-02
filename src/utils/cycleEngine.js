// src/utils/cycleEngine.js

/**
 * Core cycle calculation engine
 * Date-only logic (no time issues)
 */

// Normalize date to midnight
function normalizeDate(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Difference in full days (safe)
function daysBetween(start, end) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round((end - start) / oneDay);
}

/**
 * Main engine function
 */
export function getCycleStatus(cycleData) {
  if (!cycleData?.lastPeriodDate) {
    return null;
  }

  const {
    lastPeriodDate,
    cycleLength = 28,
    periodLength = 5,
  } = cycleData;

  const today = normalizeDate(new Date());
  const lastPeriod = normalizeDate(lastPeriodDate);

  // Day count since last period started
  const daysSinceStart = daysBetween(lastPeriod, today);

  // Day inside cycle (1 → cycleLength)
  const dayInCycle =
    ((daysSinceStart % cycleLength) + cycleLength) % cycleLength + 1;

  const ovulationDay = cycleLength - 14;

  let phase = "";
  let phaseMessage = "";

  if (dayInCycle <= periodLength) {
    phase = "Menstrual";
    phaseMessage =
      "Your body is resting and renewing. Be gentle with yourself.";
  } else if (dayInCycle < ovulationDay) {
    phase = "Follicular";
    phaseMessage =
      "Energy is slowly rising. A good time for clarity and focus.";
  } else if (dayInCycle === ovulationDay) {
    phase = "Ovulation";
    phaseMessage =
      "You may feel more confident and expressive today.";
  } else {
    phase = "Luteal";
    phaseMessage =
      "Your body is preparing for rest. Emotional sensitivity is normal.";
  }

  // Days until next period (always positive)
  const daysToNextPeriod =
    dayInCycle <= periodLength
      ? periodLength - dayInCycle
      : cycleLength - dayInCycle + 1;

  return {
    phase,
    dayInCycle,
    daysToNextPeriod,
    ovulationDay,
    phaseMessage,
  };
}
