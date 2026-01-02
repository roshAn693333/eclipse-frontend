export function getSelfCareSuggestion(phase) {
  switch (phase) {
    case "Menstrual":
      return "Rest, warm drinks, and gentle care can really help today 🤍";
    case "Follicular":
      return "A nice time to organize thoughts and do something creative 🌸";
    case "Ovulation":
      return "You may feel confident today — connect, smile, and enjoy ✨";
    case "Luteal":
      return "Slow down a little. Comfort and patience matter now 🤍";
    default:
      return "Listen to your body and take care of yourself 🤍";
  }
}
