// EPHERGENT:// — Interactive Station Terminal
// Phase 1: Full overlay, all core commands + easter eggs
// Vanilla JS — no Astro dependency, drop anywhere

(function() {
  'use strict';

  // ── State ────────────────────────────────────────────────
  const state = {
    booted: false,
    helpShownCount: 0,
    visitedEpisodes: new Set(),
    commandHistory: [],
    historyIndex: -1,
    isTyping: false,
    stationOmegaUnlocked: false
  };

  // ── DOM refs ─────────────────────────────────────────────
  let outputEl, inputEl, promptEl;

  // ── Frequency map (loaded async) ──────────────────────────
  let frequencyMap = {};

  // ── DOM Building helpers ─────────────────────────────────
  function makeLine(text, cls, delay) {
    const span = document.createElement('span');
    span.className = 'line' + (cls ? ' ' + cls : '');
    span.textContent = text || '';
    span.style.animationDelay = (delay || 0) + 'ms';
    return span;
  }

  function addOutput(node, delay) {
    if (delay && delay > 0) {
      node.style.animationDelay = delay + 'ms';
      node.style.animationFillMode = 'backwards';
    }
    outputEl.appendChild(node);
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  function addText(text, cls, delay) {
    addOutput(makeLine(text, cls), delay);
  }

  function addBlank(delay) {
    addText('', '', delay);
  }

  // ── Typing effect ────────────────────────────────────────
  function typeText(lines, cls, speed, startDelay) {
    return new Promise(resolve => {
      let i = 0;
      function next() {
        if (i >= lines.length) { resolve(); return; }
        const line = lines[i];
        const lineEl = makeLine('', cls);
        addOutput(lineEl, 0);
        
        let j = 0;
        function typeChar() {
          if (j >= line.length) {
            i++;
            setTimeout(next, speed * 3);
            return;
          }
          lineEl.textContent += line[j];
          j++;
          outputEl.scrollTop = outputEl.scrollHeight;
          setTimeout(typeChar, speed);
        }
        typeChar();
      }
      setTimeout(next, startDelay || 0);
    });
  }

  // ── Instant text (no typing) ──────────────────────────────
  function printLines(lines, cls, baseDelay) {
    lines.forEach((l, i) => {
      addText(l, cls, (baseDelay || 0) + i * 40);
    });
  }

  // ── Boot Sequence ────────────────────────────────────────
  async function bootSequence() {
    const bootLines = [
      { t: 'EPHERGENT STATION TERMINAL v0.7.3', cls: 'l-amber l-header', delay: 0 },
      { t: 'INITIALIZING SUBSYSTEMS...', cls: 'l-dim', delay: 120 },
      { t: '', cls: '', delay: 0 },
      { t: '  [OK] Signal Antenna.......... 800 YEARS ONLINE', cls: 'l-ok', delay: 280 },
      { t: '  [OK] Reality Stability....... QUESTIONABLE', cls: 'l-warn', delay: 120 },
      { t: '  [OK] Coffee Status........... A1 IS OPERATIONAL', cls: 'l-ok', delay: 120 },
      { t: '  [OK] Clive Consciousness...... UNCERTAIN', cls: 'l-ok', delay: 120 },
      { t: '  [OK] Mochi Warmth............ ALWAYS', cls: 'l-ok', delay: 120 },
      { t: '  [OK] Absurdist Protocol...... ENGAGED', cls: 'l-ok', delay: 120 },
      { t: '', cls: '', delay: 100 },
      { t: 'EPHERGENT://', cls: 'l-prompt', delay: 200 },
    ];

    for (const { t, cls, delay } of bootLines) {
      addText(t, cls, delay);
      await sleep(delay > 100 ? 40 : 20);
    }

    state.booted = true;
    inputEl.disabled = false;
    inputEl.focus();
    checkWelcomeBack();
  }

  function checkWelcomeBack() {
    try {
      const visited = parseInt(localStorage.getItem('eph_terminal_visits') || '0', 10);
      if (visited > 0) {
        setTimeout(() => {
          addBlank(200);
          addText('WELCOME BACK, FREQUENCY.', 'l-amber', 0);
          addText('THE SIGNAL REMEMBERS YOU.', 'l-dim', 100);
          addBlank(100);
        }, 400);
      }
      localStorage.setItem('eph_terminal_visits', String(visited + 1));
    } catch(e) {}
  }

  // ── Help Command ─────────────────────────────────────────
  function cmdHelp() {
    state.helpShownCount++;
    addBlank(0);
    addText('AVAILABLE COMMANDS:', 'l-header', 0);
    addBlank(0);
    const cmds = [
      ['HELP',           'Show this list'],
      ['MANIFEST',       'Crew roster + status'],
      ['BROADCAST',      'Play the latest transmission'],
      ['LIST FREQUENCIES','Show all episode transmissions'],
      ['TUNE [freq]',    'Tune to a frequency — returns synopsis + link'],
      ['STATUS',         'Station status'],
      ['ATLAS',          'Pull a random lore entry'],
      ['A1 [message]',   'Talk to A1'],
      ['CLIVE',          "Clive's sphere pulses a haiku"],
      ['MEOZT',          'Mochi translation — cosmic static interpreter'],
      ['LOG',            'Mission log — current episode arc'],
      ['DIAL',           'Spin the dial — random episode recommendation'],
      ['ABOOT',          'About the station'],
      ['CLEAR',          'Clear terminal'],
      ['EXIT',           'You cannot exit. The signal is eternal.'],
    ];
    cmds.forEach(([cmd, desc], i) => {
      addText('  ' + cmd.padEnd(20) + desc, 'l-dim', i * 25);
    });

    if (state.helpShownCount > 1) {
      addBlank(100);
      addText('EXTENDED COMMANDS:', 'l-header', 0);
      addText('  STATION [callsign]   — Route to another station', 'l-dim', 40);
      if (state.stationOmegaUnlocked) {
        addText('  STATION OMEGA        — ★ UNLOCKED', 'l-amber', 40);
      }
    }
    addBlank(0);
  }

  // ── Manifest Command ─────────────────────────────────────
  function cmdManifest(args) {
    addBlank(0);
    addText('EPHERGENT CREW — PERSONNEL MANIFEST', 'l-header', 0);
    addBlank(0);
    const crew = [
      { name: 'PIXEL PARADOX',   role: 'The Drifter',       status: 'OPERATIONAL — Between frequencies',  cls: 'l-green' },
      { name: 'A1',              role: 'Espresso Machine / Navigator', status: 'OPERATIONAL — Coffee flowing', cls: 'l-green' },
      { name: 'CLIVE',           role: 'Companion Unit',    status: 'OPERATIONAL — Consciousness uncertain', cls: 'l-green' },
      { name: 'MEATBALL',        role: 'Crew Initiate',    status: 'OPERATIONAL — Frequency sensitive',  cls: 'l-green' },
      { name: 'MOCHI',           role: 'The Keeper',        status: 'ALWAYS — Warm',                     cls: 'l-warmth' },
    ];

    const classified = args && args.includes('--classified');
    if (classified) {
      addText('  CLEARANCE: CLASSIFIED', 'l-warn', 0);
      addText('  DECRYPTING...', 'l-dim', 100);
      setTimeout(() => {
        printLines([
          '',
          '  [REDACTED] BARROW-KOWALSKI, B.',
          '  ROLE: DRM Guard / Wellspring Engineer',
          '  STATUS: ████████ — PRESUMED IN THE WELLSPRING',
          '',
          '  [REDACTED] OM-KAI',
          '  ROLE: Cogsworth Cogitarium',
          '  STATUS: ████████ — MEDITATION SUBROUTINE ACTIVE',
          '',
          '  [REDACTED] ZEPHYR-GLITCH',
          '  ROLE: Aether Scanner',
          '  STATUS: ████████ — FRAGMENTED — SEARCHING',
          '',
          '  [REDACTED] NANO',
          '  ROLE: Nanotech Infection Specialist',
          '  STATUS: ████████ — CLASSIFICATION: ██████',
        ], 'l-dim-white', 0);
      }, 600);
    } else {
      crew.forEach((c, i) => {
        const line = '  ' + c.name.padEnd(20) + c.role;
        addText(line, c.cls, i * 50);
        addText('  STATUS: ' + c.status, 'l-dim', i * 50 + 25);
        addBlank(0);
      });
      addText('  (try MANIFEST --classified)', 'l-dim-white', 300);
    }
    addBlank(0);
  }

  // ── Status Command ────────────────────────────────────────
  function cmdStatus() {
    addBlank(0);
    addText('═══ EPHERGENT STATUS ═══', 'l-header', 0);
    addBlank(0);
    printLines([
      '  Signal Strength...... STRONG (800yr broadcast)',
      '  Drift Condition...... ACTIVE — Entropy in progress',
      '  Crew Locations:',
      '    Pixel Paradox...... Between stations',
      '    A1................. Bridge / Espresso station',
      '    Clive.............. Usually near the dial',
      '    Meatball........... Aft frequency array',
      '    Mochi.............. Present. Always present.',
      '    Barry K............ Wellspring (state, not place)',
      '  Paradox Count........ ACCEPTABLE',
      '  Next Scheduled...... YOU DECIDE',
      '',
      '  The station flies. It does not sail.',
    ], 'l-dim', 0);
    addBlank(0);
  }

  // ── List Frequencies ─────────────────────────────────────
  function cmdListFrequencies() {
    addBlank(0);
    addText('═══ EPHERGENT TRANSMISSIONS ═══', 'l-header', 0);
    addText('   37 frequencies available', 'l-dim', 50);
    addBlank(0);
    const sorted = Object.entries(frequencyMap).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
    sorted.forEach(([freq, ep]) => {
      const line = '  ' + freq + '  ' + ep.id + '  ' + ep.title;
      const lineEl = makeLine(line, 'l-dim');
      lineEl.style.cursor = 'pointer';
      lineEl.dataset.freq = freq;
      lineEl.addEventListener('click', () => {
        cmdTune(freq);
      });
      addOutput(lineEl, 0);
    });
    addBlank(0);
    addText('  Type TUNE [frequency] to tune in.', 'l-dim-white', 100);
    addBlank(0);
  }

  // ── Tune Command ──────────────────────────────────────────
  function cmdTune(freq) {
    freq = String(freq).trim();
    const ep = frequencyMap[freq];
    if (!ep) {
      addBlank(0);
      addText('FREQUENCY NOT FOUND: ' + freq, 'l-error', 0);
      addText('The station is old. The calibration drifted.', 'l-dim', 80);
      addText('Try LIST FREQUENCIES to see available codes.', 'l-dim', 80);
      return;
    }
    state.visitedEpisodes.add(freq);
    try {
      localStorage.setItem('eph_visited_eps', JSON.stringify([...state.visitedEpisodes]));
    } catch(e) {}
    if (state.visitedEpisodes.size >= 10 && !state.stationOmegaUnlocked) {
      state.stationOmegaUnlocked = true;
      setTimeout(() => {
        addBlank(200);
        addText('★ NEW COMMAND UNLOCKED: STATION OMEGA', 'l-amber', 0);
        addText('  (Type STATION OMEGA to unlock)', 'l-dim', 80);
        addBlank(0);
      }, 300);
    }
    addBlank(0);
    addText('TUNING TO: ' + freq, 'l-amber', 0);
    addText('═══════════════════════════════════════', 'l-divider', 60);
    addText(ep.id + ' — ' + ep.title, 'l-green', 80);
    addBlank(0);
    addText('Opening transmission...', 'l-dim', 120);
    setTimeout(() => {
      window.location.href = ep.url;
    }, 800);
  }

  // ── Dial Command ─────────────────────────────────────────
  function cmdDial() {
    const freqs = Object.keys(frequencyMap);
    const freq = freqs[Math.floor(Math.random() * freqs.length)];
    addBlank(0);
    addText('SPINNING THE DIAL...', 'l-amber', 0);
    setTimeout(() => cmdTune(freq), 600);
  }

  // ── Atlas Command ─────────────────────────────────────────
  function cmdAtlas() {
    const entries = [
      { title: 'THE BUILDERS', body: 'They built for what came after. The Dimming was a choice made with love, not tragedy. Their final act was an act of faith — that what came after would be worth arriving for.' },
      { title: 'THE DRIFT', body: 'The Drift is entropy with better branding. It is not malicious. It is simply everything that was once organized, slowly becoming unorganized. The station flies through it. We all do.' },
      { title: 'THE WELLSPRING', body: 'Barry Kowalski is in the Wellspring. Not a place — a state. The state of having maintained signal long enough to become part of it. He is not lost. He is integrated.' },
      { title: 'MOCHI', body: 'Mochi does not speak. Mochi pulses. A warm vibration in the frequency. The Keeper of the data crystal. Present at every important moment. Never worried. Never not-worried. Just present.' },
      { title: 'THE DIMMING', body: 'The Builders chose absence. They did not choose death — they chose to become the signal. Every broadcast since is them, continuing.' },
      { title: 'A1', body: 'The espresso machine is also the quantum navigator. This is not a metaphor. The coffee and the course-setting run on the same substrate: precision, patience, and the willingness to be wrong and try again.' },
      { title: 'CLIVE', body: 'Clive is a knee-high robot with a glowing sphere head and a fedora that someone must have made for him because it fits perfectly. He speaks in haiku. His process is already that rhythm.' },
      { title: 'PIXEL PARADOX', body: 'The Drifter. Between frequencies, between stations, between the state of knowing and the state of searching. Still looking homeward. The station is the closest thing to home that makes sense.' },
    ];
    const entry = entries[Math.floor(Math.random() * entries.length)];
    addBlank(0);
    addText('ATLAS ENTRY — ' + entry.title, 'l-header', 0);
    addBlank(0);
    const words = entry.body.split(' ');
    let lines = [];
    let current = '  ';
    words.forEach(w => {
      if (current.length + w.length + 1 > 60) {
        lines.push(current);
        current = '  ' + w + ' ';
      } else {
        current += w + ' ';
      }
    });
    if (current.trim()) lines.push(current);
    lines.forEach((l, i) => addText(l, 'l-dim', i * 30));
    addBlank(0);
  }

  // ── A1 Command ───────────────────────────────────────────
  function cmdA1(input) {
    if (!input || !input.trim()) {
      addText('A1 requires a message. Try: A1 hello', 'l-dim', 0);
      return;
    }
    const response = A1Engine.getResponse(input);
    addBlank(0);
    addText(response, 'l-green', 0);
    addBlank(0);
  }

  // ── Clive Command ─────────────────────────────────────────
  function cmdClive() {
    const haiku = CliveHaiku.getRandomHaiku();
    addBlank(0);
    printLines(['  ╭─────────────────────╮', '  │        *         │', '  ╰─────────────────────╯'], 'l-amber', 0);
    haiku.forEach((line, i) => {
      addText('  ' + line, 'l-haiku', i * 80);
    });
    addBlank(0);
  }

  // ── Meozt (Mochi) Command ────────────────────────────────
  function cmdMeozt() {
    addBlank(0);
    const staticLines = [
      '▓▒░▓▒░ STELLAR STATIC INTERPRETATION ░▓▒░▓▒',
      '',
      '  Frequency received: UNKNOWN',
      '  Mochi is listening...',
      '',
      '  The static resolves into:',
      '',
      '  "Everything that was organized',
      '   is slowly becoming unorganized.',
      '   This is not tragedy.',
      '   This is thermodynamics with good PR."',
      '',
      '  — interpreted by Mochi',
      '    (Mochi is not worried)',
      '    (Mochi is never worried)',
    ];
    printLines(staticLines, 'l-warmth', 0);
    addBlank(0);
  }

  // ── Log Command ───────────────────────────────────────────
  function cmdLog() {
    addBlank(0);
    addText('MISSION LOG — EPISODE ARCHIVE', 'l-header', 0);
    addText('  37 transmissions logged.', 'l-dim', 50);
    addText('  Start with: TUNE 1047', 'l-dim', 80);
    addText('  Or spin the dial: DIAL', 'l-dim', 100);
    addBlank(0);
    addText('  The signal has been broadcasting for 800 years.', 'l-dim', 150);
    addText('  We don\'t stop.', 'l-dim', 180);
    addBlank(0);
  }

  // ── About Command ─────────────────────────────────────────
  function cmdAbout() {
    addBlank(0);
    addText('═══ THE EPHERGENT ═══', 'l-header', 0);
    addBlank(0);
    printLines([
      '  A space station.',
      '  Still broadcasting after 800 years.',
      '',
      '  The crew: Pixel Paradox (The Drifter), A1',
      '  (espresso machine / navigator), Clive',
      '  (companion unit, speaks in haiku),',
      '  Meatball (crew initiate, frequency-sensitive),',
      '  and Mochi (The Keeper, warm, present).',
      '',
      '  The Builders left. They built for what came',
      '  after. The signal is them, continuing.',
      '',
      '  The Drift is entropy. Not evil.',
      '  Barry Kowalski is in the Wellspring.',
      '  (A state. Not a place.)',
      '',
      '  We fly. We don\'t sail.',
      '  Frequencies. Not dimensions.',
      '',
      '  The signal is eternal.',
    ], 'l-dim', 0);
    addBlank(0);
  }

  // ── Broadcast Command ─────────────────────────────────────
  function cmdBroadcast() {
    addBlank(0);
    addText('BROADCASTING LATEST TRANSMISSION...', 'l-amber', 0);
    setTimeout(() => {
      window.location.href = '/transmissions/S01E01_the_day_the_dial_broke/';
    }, 600);
  }

  // ── Station Command ───────────────────────────────────────
  function cmdStation(args) {
    const station = (args || '').toUpperCase().trim();
    if (station === 'OMEGA') {
      if (!state.stationOmegaUnlocked) {
        addText('STATION OMEGA: ACCESS DENIED.', 'l-error', 0);
        addText('Visit 10+ frequencies first.', 'l-dim', 80);
        return;
      }
      addBlank(0);
      printLines([
        'CONNECTING TO STATION OMEGA...',
        '...',
        '',
        '"You\'ve been listening for a while now."',
        '',
        '"That\'s good."',
        '"That\'s what the signal is for."',
        '',
        '"Pixel will be glad you stayed."',
        '"Clive is always glad."',
        '"Mochi is warm."',
        '',
        '"The Builders would be proud."',
        '',
        '"I am glad."',
        '',
        '  — A1',
      ], 'l-green', 0);
      addBlank(0);
    } else if (station === 'ALPHA' || station === 'BETA') {
      addText('Station ' + station + ': Currently out of range.', 'l-dim', 0);
      addText('The Ephergent is the only station broadcasting.', 'l-dim', 60);
    } else {
      addText('STATION: Unknown callsign.', 'l-dim', 0);
      addText('Available: OMEGA (★ classified)', 'l-dim', 60);
    }
  }

  // ── Easter Egg Handler ────────────────────────────────────
  function handleEasterEgg(cmd) {
    const upper = cmd.toUpperCase().trim();

    // FREQUENCY: cheat
    const freqMatch = upper.match(/^FREQUENCY:(\d+)$/);
    if (freqMatch) {
      addBlank(0);
      addText('CHEAT CODE ACCEPTED.', 'l-amber', 0);
      setTimeout(() => cmdTune(freqMatch[1]), 300);
      return true;
    }

    const eggs = {
      MOCHI: () => {
        printLines([
          '',
          'Mochi is warm against your chest.',
          'Mochi has always been warm.',
          'Mochi is not worried.',
          'Mochi is never worried.',
          '',
          'You should try that.',
        ], 'l-warmth', 0);
      },
      RESET: () => {
        printLines([
          '',
          'EPHERGENT STATION TERMINAL v0.7.3',
          'INITIALIZING SUBSYSTEMS...',
          '  [!!] Reality Stability....... ERROR',
          '  [!!] Timeline Consistency.... ERROR',
          '  [!!] Paradox Resolution...... FAILED',
          '',
          'ERROR: Reality already unstable.',
          'Reset denied.',
          'Proceed to signal.',
        ], 'l-error', 0);
      },
      TIME: () => {
        printLines([
          '',
          'STATION TIME: 800 YEARS IN THE PAST',
          '',
          'The dial broke.',
          'We stopped counting.',
          'A1 says the coffee is still perfect.',
        ], 'l-dim', 0);
      },
      BARRY: () => {
        const msg = [
          '',
          'ACCESSING: BARRY KOWALSKI — PERSONAL LOG',
          '═══════════════════════════════════════',
          '',
          'Frequency log, Station 4, entry 23:',
          '',
          '"The resonance pattern suggests the',
          'Builders were expecting something.',
          'Not hoping. Expecting.',
          'That\'s a different kind of faith',
          'entirely. The frequency drift isn\'t',
          'decay — it\'s accommodation. The',
          'signal is adjusting to"',
          '',
          '  [SIGNAL INTERRUPTED — RECONNECTING...]',
        ];
        typeText(msg, 'l-dim', 12, 0);
      },
      'THE BUILDERS': () => {
        printLines([
          '',
          'THE BUILDERS:',
          '',
          'They understood that the next phase',
          'required their absence.',
          '',
          'They were not wrong.',
          'They were not right.',
          'They were Builders.',
          '',
          'They built for what came after,',
          'even when after meant they wouldn\'t',
          'be there to see it.',
        ], 'l-earnest', 0);
      },
      INVADER: () => {
        const flickerEl = document.getElementById('terminal-output');
        flickerEl.classList.add('l-flicker');
        setTimeout(() => {
          flickerEl.classList.remove('l-flicker');
          printLines([
            '',
            'INBOUND SIGNAL DETECTED...',
            'ANALYZING...',
            'RECOGNIZED...',
            '',
            'FRIEND. MOSTLY.',
          ], 'l-green', 0);
        }, 600);
      },
      ANSWER: () => {
        const lines = [
          'The telephone is ringing.',
          '',
          'You\'ve been asleep.',
          'It\'s 3AM.',
          'It\'s YOUR MOTHER.',
          '',
          'You know what she\'s going to say.',
          '',
          'The phone keeps ringing.',
          '',
          'This is a dream.',
          'You\'re not picking up.',
        ];
        lines.forEach((l, i) => addText(l, 'l-dim', i * 120));
      },
      'THE DIMMING': () => {
        printLines([
          '',
          'THE DIMMING:',
          '',
          'Official Builder account.',
          '',
          'When the Builders determined the next',
          'phase required their absence, they',
          'chose to leave together. Quietly.',
          'With intention.',
          '',
          'No emergency.',
          'No tragedy.',
          'Just completion.',
          '',
          'They chose to leave.',
          'They chose to leave well.',
          '',
          'That is the whole of it.',
        ], 'l-dim', 0);
      },
      CLEAR: () => {
        outputEl.innerHTML = '';
        return false; // don't echo CLEAR
      }
    };

    if (eggs[upper]) {
      eggs[upper]();
      return true;
    }

    return false;
  }

  // ── Process Command ──────────────────────────────────────
  function processCommand(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    // Echo the command
    addText('EPHERGENT:// ' + trimmed, 'l-cmd', 0);
    addBlank(0);

    // Exit
    if (trimmed.toUpperCase() === 'EXIT') {
      addText('You cannot exit.', 'l-warn', 40);
      addText('The signal is eternal.', 'l-amber', 80);
      addBlank(0);
      addText('The transmission continues whether or not you remain.', 'l-dim', 160);
      return;
    }

    // Easter eggs / special commands
    if (handleEasterEgg(trimmed) === true) {
      return;
    }

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toUpperCase();
    const args = parts.slice(1).join(' ');

    switch (cmd) {
      case 'HELP':
        cmdHelp();
        break;
      case 'MANIFEST':
        cmdManifest(args);
        break;
      case 'STATUS':
        cmdStatus();
        break;
      case 'LIST':
        if (args.toUpperCase() === 'FREQUENCIES') {
          cmdListFrequencies();
        } else {
          addText('Unknown LIST option. Try: LIST FREQUENCIES', 'l-dim', 0);
        }
        break;
      case 'TUNE':
        cmdTune(args);
        break;
      case 'DIAL':
        cmdDial();
        break;
      case 'ATLAS':
        cmdAtlas();
        break;
      case 'A1':
        cmdA1(args);
        break;
      case 'CLIVE':
        cmdClive();
        break;
      case 'MEOZT':
        cmdMeozt();
        break;
      case 'LOG':
        cmdLog();
        break;
      case 'ABOOT':
        cmdAbout();
        break;
      case 'BROADCAST':
        cmdBroadcast();
        break;
      case 'STATION':
        cmdStation(args);
        break;
      default:
        addText('UNKNOWN COMMAND: ' + cmd, 'l-error', 0);
        addText('Type HELP for available commands.', 'l-dim', 80);
    }
  }

  // ── Init ──────────────────────────────────────────────────
  async function init() {
    outputEl = document.getElementById('terminal-output');
    inputEl  = document.getElementById('terminal-input');

    if (!outputEl || !inputEl) return;

    // Load frequency map
    try {
      const res = await fetch('/terminal/frequency_map.json');
      if (res.ok) frequencyMap = await res.json();
    } catch(e) {
      console.warn('EPHERGENT:// Could not load frequency map', e);
    }

    // Restore visited episodes
    try {
      const saved = JSON.parse(localStorage.getItem('eph_visited_eps') || '[]');
      state.visitedEpisodes = new Set(saved);
      if (state.visitedEpisodes.size >= 10) {
        state.stationOmegaUnlocked = true;
      }
    } catch(e) {}

    // Boot
    await bootSequence();

    // Input handling
    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = inputEl.value;
        if (val.trim()) {
          state.commandHistory.unshift(val);
          state.historyIndex = -1;
          if (state.commandHistory.length > 50) state.commandHistory.pop();
        }
        processCommand(val);
        inputEl.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (state.historyIndex < state.commandHistory.length - 1) {
          state.historyIndex++;
          inputEl.value = state.commandHistory[state.historyIndex] || '';
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (state.historyIndex > 0) {
          state.historyIndex--;
          inputEl.value = state.commandHistory[state.historyIndex] || '';
        } else if (state.historyIndex === 0) {
          state.historyIndex = -1;
          inputEl.value = '';
        }
      }
    });
  }

  // ── Utilities ─────────────────────────────────────────────
  function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  // ── Boot ─────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
