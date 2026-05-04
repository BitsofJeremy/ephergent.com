---
name: ephergent.com
description: The living broadcast log of The Ephergent Signal — a CRT-phosphor terminal aesthetic for sci-fi world explorers
colors:
  # Primary accents
  phosphor-amber: "#ffb020"
  station-cyan: "#00d4ff"
  status-green: "#00e676"
  alert-red: "#ff4444"
  # Surfaces
  void-ink: "#08080d"
  terminal-bg: "#121219"
  surface-raised: "#1a1a24"
  # Borders and dividers
  border-subtle: "#2a2a3a"
  border-glow: "#3a3a50"
  # Text hierarchy
  text-primary: "#e8e8f0"
  text-secondary: "#9090b0"
  text-dimmed: "#606080"
  # Semantic variants
  warn-amber: "#ff6644"
  label-magenta: "#e040fb"
  label-orange: "#f97316"
  label-violet: "#a78bfa"
typography:
  display:
    fontFamily: "'Space Grotesk', system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "'Space Grotesk', system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "'Space Grotesk', system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    maxLineLength: "72ch"
  mono:
    fontFamily: "'JetBrains Mono', 'Courier New', monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  none: "0"
  sm: "4px"
  md: "8px"
  lg: "12px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  "2xl": "3rem"
  "3xl": "4rem"
components:
  nav-link:
    textColor: "{colors.text-secondary}"
    hoverTextColor: "{colors.station-cyan}"
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    transition: "color 0.3s ease"
  nav-link-active:
    textColor: "{colors.text-primary}"
  nav-terminal-btn:
    textColor: "{colors.phosphor-amber}"
    borderColor: "{colors.border-subtle}"
    hoverBorderColor: "{colors.station-cyan}"
    fontSize: "0.875rem"
    fontWeight: 500
  card-crew:
    backgroundColor: "rgba(18, 18, 25, 0.3)"
    borderColor: "{colors.border-subtle}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
    hoverBorderColor: "{colors.station-cyan}"
  card-lore:
    backgroundColor: "rgba(18, 18, 25, 0.4)"
    borderColor: "{colors.border-subtle}"
    rounded: "{rounded.lg}"
    padding: "1rem"
    hoverBorderColor: "{colors.station-cyan}"
    hoverTransform: "translateY(-2px)"
  btn-ghost:
    backgroundColor: "transparent"
    borderColor: "{colors.border-subtle}"
    textColor: "{colors.text-primary}"
    hoverBorderColor: "{colors.station-cyan}"
    hoverTextColor: "{colors.station-cyan}"
    transition: "all 0.3s ease"
  btn-primary:
    backgroundColor: "{colors.station-cyan}"
    textColor: "{colors.void-ink}"
    fontWeight: 600
    fontSize: "0.875rem"
    hoverBackgroundColor: "{colors.label-magenta}"
    hoverTextColor: "#ffffff"
  chip-tag:
    backgroundColor: "rgba(0, 212, 255, 0.1)"
    textColor: "{colors.station-cyan}"
    fontSize: "0.75rem"
    padding: "0.125rem 0.5rem"
    rounded: "{rounded.sm}"
---

# Design System: ephergent.com

## 1. Overview

**Creative North Star: "The Frequency Archive"**

Ephergent.com is a living broadcast log from a station that has been transmitting for 800 years into an ocean of impossible light. The interface should feel like equipment that has been running long past its intended lifespan, still functional, still reaching outward. Not sleek, not corporate, not futuristic in the generic sense. A deep-space radio telescope crossed with an IBM 3270 mainframe.

The dual-accent phosphor palette (amber and cyan against void black) is not decorative. It reflects two frequencies: the warm amber of a station still trying, the cold cyan of the signal it sends. The terminal aesthetic is the point, not a skin applied to a generic layout. Every component earns its place by reinforcing the fiction that a crew lives here and a station is broadcasting.

The universe is vast and strange. The crew is small and specific. Design serves both.

**Key Characteristics:**
- Deep-space CRT phosphor aesthetic with purposeful dual-accent color system
- No shadows at rest; depth through tonal layering and colored borders
- Terminal-inspired typography (JetBrains Mono for output, Space Grotesk for display)
- Atmospheric status messaging in footers and boot sequences reinforces world-building
- Cards and chips use restrained hover states; no dramatic elevation or bounce

## 2. Colors: The Phosphor Palette

The system uses a dual-accent strategy against a near-black void. Amber carries warmth and status; cyan carries interactivity and signal. Green confirms; red alerts. The palette is small by necessity, not by default.

### Primary Accents
- **Phosphor Amber** (#ffb020 / `#ffb020`): Station labels, navigation callouts, section headers, boot sequence prompts. The color of something still powered on. Used on hover borders, active nav states, and atmospheric copy throughout.

- **Station Cyan** (#00d4ff / `#00d4ff`): Interactive elements, links, focus rings, ok status indicators, section labels. The color of the outgoing signal. Applied to borders on hover, text links, and focus-visible states.

- **Status Green** (#00e676 / `#00e676`): Confirmation states, online indicators, boot [OK] markers. Not used decoratively — only when the station is reporting that something is working.

### Secondary Accents
- **Alert Red** (#ff4444 / `#ff4444`): Error states, flicker animations. Paired with `error-flicker` keyframe animation.
- **Label Magenta** (#e040fb / `#e040fb`): Hover states on primary buttons, occasional crew card accents.
- **Warn Amber** (#ff6644 / `#ff6644`): Warning states in the terminal, softer than Alert Red.

### Neutrals
- **Void Ink** (#08080d / `#08080d`): Primary background. The darkness between stations.
- **Terminal BG** (#121219 / `#121219`): Card surfaces, raised containers. Slightly lighter than Void Ink to create tonal layering without shadow.
- **Surface Raised** (#1a1a24 / `#1a1a24`): Mobile menu backdrop, hover backgrounds.
- **Border Subtle** (#2a2a3a / `#2a2a3a`): Default borders on cards, inputs, dividers. Visible but not loud.
- **Border Glow** (#3a3a50 / `#3a3a50`): Lighter border variant for focus states.
- **Text Primary** (#e8e8f0 / `#e8e8f0`): Near-white body text. Never pure white — always tinted.
- **Text Secondary** (#9090b0 / `#9090b0`): Dim labels, metadata, footers.
- **Text Dimmed** (#606080 / `#606080`): Placeholders, inactive states, decorative separators.

### Named Rules
**The Dual Frequency Rule.** Amber and cyan carry equal weight but different jobs. Amber marks the station's voice (labels, headers, status). Cyan marks the user's voice (links, interactive, signal). They never swap roles.

**The Near-Black Background Rule.** The primary surface is #08080d, not #000. Tint every neutral toward the brand hue by 0.005-0.01 chroma. No pure blacks.

## 3. Typography

**Display Font:** Space Grotesk (with Inter fallback) — geometric sans with personality, used for headlines and the station name logo.

**Body Font:** Inter (with system-ui fallback) — clean and readable for episode descriptions, lore entries, crew bios.

**Mono Font:** JetBrains Mono (with Courier New fallback) — terminal output, boot sequences, station status, code-like UI elements.

**Character:** Three fonts with distinct jobs. Space Grotesk is confident and slightly quirky. Inter is neutral and readable. JetBrains Mono evokes CRT terminals without being a costume font. Together they create a hierarchy where the station speaks (mono), the crew is introduced (display), and the universe is described (body).

### Hierarchy
- **Display** (Space Grotesk, 700, clamp(2.25rem, 5vw, 3.75rem), 1.1 line-height): Page titles, episode names, major section headers.
- **Headline** (Space Grotesk, 700, 1.875rem, 1.2 line-height): Card titles, crew names, lore entry headings.
- **Title** (Space Grotesk, 600, 1.25rem, 1.3 line-height): Subsection headers, navigation labels.
- **Body** (Inter, 400, 1rem, 1.625 line-height, max 72ch): Episode descriptions, lore text, crew bios. Capped at 72ch for readability.
- **Mono** (JetBrains Mono, 400, 0.875rem, 1.6 line-height): Terminal output, boot sequences, status footers, station logs.

### Named Rules
**The Scale Ratio Rule.** Display-to-headline ratio is approximately 2:1. Never use a flat scale where every heading is the same weight and size. Hierarchy is earned.

**The Mono Voice Rule.** JetBrains Mono is reserved for station-generated content (boot sequences, status logs, terminal output). It is not used decoratively on body text or for general UI labels.

## 4. Elevation

This is a flat system. Depth is conveyed through tonal layering (backgrounds get lighter as surfaces stack), not shadows. The station is not floating — it is solid, grounded.

No shadows at rest. Hover states use border color shifts and subtle translate transforms (2px lift). Focus states use cyan focus rings (2px solid, offset 2px). Nothing casts a shadow.

### Shadow Vocabulary
The system does not use box shadows. If a component feels like it needs a shadow for depth, reconsider the background tonal layering instead.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Borders and background color shifts replace shadows as the depth signal. When hovering a card, the border color changes before any transform.

**The Scanline Effect Rule.** Scanlines are applied via CSS `repeating-linear-gradient` at 1px / 2px intervals with 15% black opacity. This is the CRT effect — not a shadow, not glass blur. It is applied as a pseudo-element overlay and is non-interactive (`pointer-events: none`).

## 5. Components

### Navigation
- **Style:** Fixed header, 73px top padding for fixed nav, blurred glass backdrop (`backdrop-blur-sm`), subtle border-bottom.
- **Logo:** Space Grotesk bold, tracks toward the left.
- **Desktop links:** Inter medium, text-secondary at rest, station-cyan on hover. No underlines.
- **Terminal CTA:** Amber text, 1px border, subtle hover that shifts border to cyan. Visually distinct from other nav links.
- **Mobile:** Hamburger with three animated spans (translate to X on open). Slide-in panel from right with staggered link animations (80ms delays). Backdrop blur overlay.
- **Skip link:** Visually hidden until focused; becomes fixed cyan pill on focus.

### Crew Cards
- **Corner Style:** 12px radius.
- **Background:** `rgba(18, 18, 25, 0.3)` — translucent surface over void.
- **Border:** 1px solid `#2a2a3a`. Shifts to cyan on hover.
- **Accent bar:** 4px top border in a crew-specific color (cyan, magenta, amber, etc.) per character.
- **Internal Padding:** 1.5rem.
- **Hover:** `translateY(-2px)` with 0.3s ease transition. Border color shift to cyan.
- **Quote:** Italic, 2px left border in amber at 50% opacity.

### Lore Cards
- **Corner Style:** 12px radius.
- **Background:** `rgba(18, 18, 25, 0.4)` — slightly more opaque than crew cards.
- **Border:** 1px solid `#2a2a3a`. Shifts to cyan on hover.
- **Internal Padding:** 1rem.
- **Hover:** `translateY(-2px)` with 0.2s ease. Same lift treatment as crew cards but slightly faster.
- **Spoiler chips:** Small rounded pills indicating season spoiler level (green = safe, amber = S1-S2, red = S3+).

### Chips / Tags
- **Background:** `rgba(0, 212, 255, 0.1)` — translucent cyan tint.
- **Text:** Station cyan, 0.75rem, no border.
- **Padding:** 0.125rem 0.5rem.
- **Radius:** 4px.

### Buttons
- **Ghost:** Transparent background, 1px border in border-subtle. Text in text-primary. On hover: border shifts to cyan, text shifts to cyan. Transition: all 0.3s ease.
- **Primary:** Solid cyan background, void-ink text, font-weight 600. On hover: magenta background, white text. Transition: all 0.3s ease.
- **Focus:** 2px cyan focus ring, 2px offset. Never remove focus indicators.

### Terminal Overlay (root index.html)
- **Full-screen fixed overlay** with scanlines pseudo-element.
- **Vignette** via radial-gradient from transparent center to 50% black at edges.
- **Input row:** Fixed at bottom, prompt label (EPHERGENT://) in amber, input field in dim text.
- **Output area:** Scrollable, JetBrains Mono, float-in animation on new lines.

### Footer Status Bar
- **Layout:** Flex wrap, small text (0.75rem), text-secondary color.
- **Separators:** Pipe character `|` between status items.
- **Status indicators:** Online/nominal states in status-green. Warning states in phosphor-amber.
- **Links:** Station cyan, no underline at rest, underline on hover.

### Cursor Dot
- **Desktop only** (`pointer: fine` media query). Hidden on touch devices.
- **Appearance:** 8x8px cyan circle, mix-blend-mode: difference.
- **Hover state:** Expands to 40x40px, 50% opacity.
- **Implementation:** CSS transition on width/height/opacity, JS mousemove handler.

## 6. Do's and Don'ts

### Do:
- **Do** use the dual-accent system: amber for station voice (labels, headers, status), cyan for user voice (links, interactive).
- **Do** apply scanlines as a fixed-position pseudo-element with `pointer-events: none` — this is the CRT phosphor effect and it is appropriate for the terminal page.
- **Do** use status-green (#00e676) only for confirmation states: [OK] markers, online indicators, ARCHIVE ONLINE footers.
- **Do** use JetBrains Mono exclusively for station-generated content: boot sequences, status logs, terminal output.
- **Do** use `rgba(18, 18, 25, 0.3)` as the crew card surface with a 4px colored accent top border per crew character.
- **Do** use `backdrop-blur-xl` on the mobile menu panel and `backdrop-blur-sm` on the fixed header.
- **Do** use the grain texture (`opacity: 0.04` on `body::after`) sparingly — it is atmospheric, not structural.

### Don't:
- **Don't** use pure black (#000) or pure white (#fff) anywhere. Tint every neutral toward the brand hue.
- **Don't** use `border-left` greater than 1px as a colored accent stripe on cards, list items, callouts, or alerts. Use a full top or bottom border, or a background tint, or a leading icon.
- **Don't** use `background-clip: text` with gradient backgrounds for decorative text. Use a single solid color. Emphasis via weight or size.
- **Don't** use glassmorphism (backdrop-blur + translucent background) as a decorative card treatment. The mobile menu and fixed header use it for functional reasons (overlap and readability), not for aesthetics.
- **Don't** use the hero-metric template: big number, small label, supporting stats, gradient accent. This is a SaaS cliché. The site is not a SaaS product.
- **Don't** use identical card grids with no differentiation. Each crew card has a unique accent color. Lore cards differentiate by spoiler level.
- **Don't** use modals as a first solution. Exhaust inline, progressive, or inline-alert alternatives before reaching for a modal.
- **Don't** use generic sci-fi color palettes (dark blue + neon green, purple gradients on black). The amber/cyan phosphor palette is specific to this project.
- **Don't** use em dashes in UI copy. Use commas, colons, semicolons, periods, or parentheses. Not `--` either.
