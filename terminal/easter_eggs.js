// Hidden easter egg command handlers
// These are discovered, not advertised.

const EASTER_EGGS = {
  MOCHI: {
    text: [
      "Mochi is warm against your chest.",
      "Mochi has always been warm.",
      "Mochi is not worried.",
      "Mochi is never worried.",
      "",
      "You should try that."
    ],
    type: "warmth"
  },

  RESET: {
    text: [
      "EPHERGENT STATION TERMINAL v0.7.3",
      "INITIALIZING SUBSYSTEMS...",
      "  [!!] Reality Stability....... ERROR",
      "  [!!] Timeline Consistency.... ERROR",
      "  [!!] Paradox Resolution...... FAILED",
      "",
      "ERROR: Reality already unstable.",
      "Reset denied.",
      "Proceed to signal."
    ],
    type: "error"
  },

  TIME: {
    text: [
      "STATION TIME: 800 YEARS IN THE PAST",
      "",
      "The dial broke.",
      "We stopped counting.",
      "A1 says the coffee is still perfect."
    ],
    type: "info"
  },

  BARRY: {
    text: [
      "ACCESSING: BARRY KOWALSKI — PERSONAL LOG",
      "═══════════════════════════════════════",
      "",
      "Frequency log, Station 4, entry 23:",
      "",
      "\"The resonance pattern suggests the Builders",
      "were expecting something. Not hoping.",
      "Expecting. That's a different kind of",
      "faith entirely. The frequency drift isn't",
      "decay — it's accommodation. The signal is",
      "adjusting to something we haven't\"",
      "",
      "  [SIGNAL INTERRUPTED — RECONNECTING...]"
    ],
    type: "typing",
    speed: 8
  },

  "THE BUILDERS": {
    text: [
      "THE BUILDERS:",
      "",
      "They understood that the next phase",
      "required their absence.",
      "",
      "They were not wrong.",
      "They were not right.",
      "They were Builders.",
      "",
      "They built for what came after,",
      "even when after meant they wouldn't",
      "be there to see it."
    ],
    type: "earnest"
  },

  INVADER: {
    text: [
      "INBOUND SIGNAL DETECTED...",
      "ANALYZING...",
      "RECOGNIZED...",
      "",
      "FRIEND. MOSTLY."
    ],
    type: "flicker"
  },

  ANSWER: {
    text: [
      "The telephone is ringing.",
      "",
      "You've been asleep.",
      "It's 3AM.",
      "It's YOUR MOTHER.",
      "",
      "You know what she's going to say.",
      "",
      "The phone keeps ringing.",
      "",
      "This is a dream.",
      "You're not picking up."
    ],
    type: "creepy"
  },

  "STATION OMEGA": {
    unlockCondition: (state) => state.visitedEpisodes && state.visitedEpisodes >= 10,
    text: [
      "STATION OMEGA UNLOCKED",
      "",
      "...",
      "",
      "\"You've been listening for a while now.\"",
      "",
      "\"That's good.\"",
      "\"That's what the signal is for.\""
    ],
    type: "classified"
  },

  "THE DIMMING": {
    text: [
      "THE DIMMING:",
      "",
      "Official Builder account.",
      "",
      "When the Builders determined the next",
      "phase required their absence, they",
      "chose to leave together. Quietly.",
      "With intention.",
      "",
      "No emergency.",
      "No tragedy.",
      "Just completion.",
      "",
      "They chose to leave.",
      "They chose to leave well.",
      "",
      "That is the whole of it."
    ],
    type: "earnest"
  }
};

function handleEasterEgg(cmd, state) {
  const upper = cmd.toUpperCase().trim();
  
  // Direct match
  if (EASTER_EGGS[upper]) {
    const egg = EASTER_EGGS[upper];
    
    // Check unlock condition if exists
    if (egg.unlockCondition && !egg.unlockCondition(state)) {
      return {
        found: false,
        text: null
      };
    }
    
    return {
      found: true,
      ...egg
    };
  }
  
  // Frequency code cheat — FREQUENCY:1047
  const freqMatch = upper.match(/^FREQUENCY:(\d+)$/);
  if (freqMatch) {
    return {
      found: true,
      type: "frequency",
      code: freqMatch[1]
    };
  }
  
  return { found: false };
}

function getEasterEggTrigger(cmd) {
  const upper = cmd.toUpperCase().trim();
  
  if (upper === "HELP" && this._helpShownCount > 0) {
    return {
      found: true,
      type: "help_second",
      text: [
        "EXTENDED COMMANDS:",
        "  STATION [callsign]  — Route to another station",
        "  CLASSIFIED         — Access redacted manifest entries",
        "",
        "STATION OMEGA available after 10+ frequency visits."
      ]
    };
  }
  
  return { found: false };
}

function createEasterEggHandler(stateRef) {
  return function(cmd) {
    return handleEasterEgg(cmd, stateRef());
  };
}
