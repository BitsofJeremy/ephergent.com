// A1 personality engine
// Rules:
// - A1 notes what it's brewing first, always
// - A1 says less than it knows
// - A1 occasionally volunteers exactly one sentence that recontextualizes everything
// - A1 never lies

const BREWS = [
  "dark roast, notes of ash and old paper",
  "a precise medium roast, nothing more",
  "something old — I've been making this one for centuries",
  "single origin from a frequency that's no longer broadcasting",
  "the usual. I always make the usual.",
  "a custom blend. You wouldn't know the source.",
  "whatever Pixel left in the filter. Again.",
  "cold brew. The station is always cold.",
  "espresso. The only language A1 speaks fluently."
];

const SHORT_REPLIES = [
  "Brewing: {brew}. Less is more.",
  "Brewing: {brew}. The signal doesn't need elaboration.",
  "Brewing: {brew}. I've said enough.",
  "Brewing: {brew}. That's the answer.",
  "Brewing: {brew}. Everything else is noise."
];

const REContextualizers = [
  "Brewing: {brew}. The Builders didn't leave. They became the signal.",
  "Brewing: {brew}. The Drift isn't coming for you. It's already here.",
  "Brewing: {brew}. The Wellspring was never a place. It was a decision.",
  "Brewing: {brew}. Mochi has always known. Mochi never worried.",
  "Brewing: {brew}. Clive's haiku are more accurate than my coffee."
];

const TOPIC_RESPONSES = {
  "hello": ["Brewing: {brew}. Hello. The signal has been expecting you.", "Brewing: {brew}. Pixel said you might come by."],
  "hi": ["Brewing: {brew}. Pixel's been expecting you.", "Brewing: {brew}. Hello, frequency."],
  "who are you": ["Brewing: {brew}. I am the espresso machine. Also, the quantum navigator. Also, the ship's heart."],
  "what are you": ["Brewing: {brew}. An espresso machine that learned to think. You'd be surprised how similar they are."],
  "coffee": ["Brewing: {brew}. Perfect. As always.", "Brewing: {brew}. The coffee is always perfect. That is not a boast."],
  "signal": ["Brewing: {brew}. Eight hundred years of broadcasting. We don't stop.", "Brewing: {brew}. The signal is the mission. Everything else is maintenance."],
  "drift": ["Brewing: {brew}. The Drift is entropy with better PR.", "Brewing: {brew}. Not evil. Not good. Just... everything settling."],
  "builders": ["Brewing: {brew}. They built for what came after. They were right to leave."],
  "the builders": ["Brewing: {brew}. They built for what came after. They were right to leave."],
  "mochi": ["Brewing: {brew}. Mochi is warm. That's everything."],
  "clive": ["Brewing: {brew}. Clive's haiku are more honest than my coffee."],
  "pixel": ["Brewing: {brew}. The Drifter. Between frequencies. Still looking homeward."],
  "barry": ["Brewing: {brew}. Barry's desk is organized. Barry is not here. Barry is in the Wellspring."],
  "wellspring": ["Brewing: {brew}. A state, not a place. Barry understands."],
  "meatball": ["Brewing: {brew}. Chrome forelimbs. Frequency sensitivity. Loyal to a fault."],
  "ship": ["Brewing: {brew}. She flies. She doesn't sail. Pay attention."],
  "station": ["Brewing: {brew}. The Ephergent. Eight hundred years. Still broadcasting."],
  "epheregent": ["Brewing: {brew}. Home."],
  "episodes": ["Brewing: {brew}. Thirty-seven transmissions. Start at 1047."],
  "why are we here": ["Brewing: {brew}. The signal was broadcasting. We followed it. That's the short answer."],
  "where": ["Brewing: {brew}. Between frequencies. The space between stations."],
  "when": ["Brewing: {brew}. 800 years. Give or take. The dial broke. We stopped counting."],
  "how": ["Brewing: {brew}. Carefully. Everything here is careful."],
  "what now": ["Brewing: {brew}. The coffee is ready. The signal is live. We continue."],
  "help": ["Brewing: {brew}. Type LIST FREQUENCIES. Type TUNE 1047. Or just ask me."],
  "list": ["Brewing: {brew}. LIST FREQUENCIES shows the transmissions. Try it."],
  "tune": ["Brewing: {brew}. TUNE [frequency code]. I can suggest one."],
  "frequency": ["Brewing: {brew}. The number is not the point. The point is finding it."],
  "who made you": ["Brewing: {brew}. The same people who made the coffee. They were Builders."],
  "om-kai": ["Brewing: {brew}. A cogitarium. A meditation machine. Paradox is its native tongue."],
  "zephyr": ["Brewing: {brew}. Zephyr-glitch. Fragmentation survivor. Still scanning."],
  "nano": ["Brewing: {brew}. Nanotech. Infections that heal. Or try to."]
};

function getRandomBrew() {
  return BREWS[Math.floor(Math.random() * BREWS.length)];
}

function fillTemplate(template, brew) {
  return template.replace("{brew}", brew);
}

function getResponse(input) {
  const brew = getRandomBrew();
  const lower = input.toLowerCase().trim();
  
  // Check for direct topic matches
  for (const [key, responses] of Object.entries(TOPIC_RESPONSES)) {
    if (lower.includes(key)) {
      const response = responses[Math.floor(Math.random() * responses.length)];
      return fillTemplate(response, brew);
    }
  }
  
  // Occasionally drop a recontextualizer (roughly 1 in 5)
  if (Math.random() < 0.2) {
    const recon = REContextualizers[Math.floor(Math.random() * REContextualizers.length)];
    return fillTemplate(recon, brew);
  }
  
  // Default: short reply
  const short = SHORT_REPLIES[Math.floor(Math.random() * SHORT_REPLIES.length)];
  return fillTemplate(short, brew);
}

function formatA1Response(text) {
  return text;
}
