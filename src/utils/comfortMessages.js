export function getComfortMessage(mood, pain, day) {
  if (pain === "heavy") {
    return "Please take full rest today ❤️ Warm water & calm vibes only.";
  }

  if (mood === "crampy") {
    return "I know cramps are annoying 🫂 Take it slow, I’m here.";
  }

  if (mood === "emotional") {
    return "It’s okay to feel everything 💗 You’re not alone.";
  }

  if (mood === "irritated") {
    return "Deep breaths ❤️ No pressure today.";
  }

  if (mood === "low") {
    return "Sending you a warm hug 🫶 Take care of yourself.";
  }

  if (day === 1) {
    return "First day is always tough 🌸 Please rest well.";
  }

  return "Take care today ❤️ Be gentle with yourself.";
}
