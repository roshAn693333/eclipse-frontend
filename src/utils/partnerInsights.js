// src/utils/partnerInsights.js

export function getPartnerInsight(phase) {
  switch (phase) {
    case "Menstrual":
      return "She may need comfort, patience, and rest today 🤍";

    case "Follicular":
      return "A good day to encourage and motivate her 🌸";

    case "Ovulation":
      return "She might feel confident and expressive ✨";

    case "Luteal":
      return "Be gentle and understanding today 🤍";

    default:
      return null;
  }
}
