export function getSuggestedLetter(phase) {
  switch (phase) {
    case "Menstrual":
      return {
        type: "periods",
        label: "🩸 When you’re on your periods",
        reason: "Your body may need extra care today 🤍",
      };

    case "Luteal":
      return {
        type: "low",
        label: "😔 When you feel low",
        reason: "Emotions can feel heavier during this phase",
      };

    case "Ovulation":
      return {
        type: "miss",
        label: "🤍 When you miss me",
        reason: "You may feel more emotionally connected today",
      };

    case "Follicular":
      return {
        type: "sleep",
        label: "🌙 When you need encouragement",
        reason: "A good time for reassurance and motivation",
      };

    default:
      return null;
  }
}
export function getSmartLetter(cycleStatus) {
  if (!cycleStatus) return null;

  if (cycleStatus.phase === "Menstrual") {
    return {
      type: "periods",
      title: "When you’re on your periods",
      icon: "🩸",
      subtitle: "Your body may need extra care today 🤍",
    };
  }

  if (cycleStatus.phase === "Luteal") {
    return {
      type: "low",
      title: "When you feel low",
      icon: "😔",
    };
  }

  return null;
}

