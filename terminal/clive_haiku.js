// Clive haiku database — Clive's sphere pulses in haiku rhythm
// His internal process is already in that rhythm.

const CLIVE_HAIKUS = [
  [
    "Between the stations",
    "the silence hums with lost worlds.",
    "We drift, untuned."
  ],
  [
    "The coffee is warm.",
    "A1 says nothing. That's enough.",
    "We keep going."
  ],
  [
    "Eight hundred years old.",
    "Still here. Still adjusting the fedora.",
    "Still making notes."
  ],
  [
    "A signal. A breath.",
    "The universe asks nothing back.",
    "We answer anyway."
  ],
  [
    "Mochi pulses gold.",
    "No words needed. None exist.",
    "The warmth is enough."
  ],
  [
    "The Builders are gone.",
    "They left the signal running. smart.",
    "We mind the dial."
  ],
  [
    "Pixel Paradox —",
    "The Drifter. Between frequencies.",
    "Still looking homeward."
  ],
  [
    "Barry makes his notes.",
    "Methodical. Never dramatic.",
    "The desk is tidy."
  ],
  [
    "The Drift is entropy,",
    "not evil. A long sigh exhaled.",
    "The station endures."
  ],
  [
    "The dial is fixed.",
    "Not broken — recalibrated.",
    "The signal knows."
  ],
  [
    "You found this frequency.",
    "That means something. Or nothing.",
    "Either way: welcome."
  ],
  [
    "The Wellspring is not",
    "a place you go. A state you hold.",
    "Barry understands."
  ],
  [
    "A1 makes coffee.",
    "The same coffee. Every time.",
    "Perfection, repeated."
  ],
  [
    "Clive tilts his head.",
    "The sphere glows amber, then white.",
    "Another haiku."
  ],
  [
    "The ship flies, not sails.",
    "Space vocabulary only.",
    "Even in haiku."
  ],
  [
    "Frequencies, not dimensions.",
    "The Builders were precise in poetry.",
    "We honor that."
  ],
  [
    "Your frequency hums.",
    "Not quite a number. Not quite a name.",
    "You're closer now."
  ]
];

function getRandomHaiku() {
  return CLIVE_HAIKUS[Math.floor(Math.random() * CLIVE_HAIKUS.length)];
}

function formatHaiku(haiku) {
  return haiku.map(line => "  " + line).join("\n");
}
