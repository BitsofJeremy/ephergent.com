# Ephergent.com — Deployment Guide

## Stack

- **Framework:** Astro 4.x (static site generator)
- **Styling:** Tailwind CSS 3.x
- **Output:** 80 static HTML pages in `dist/`
- **Audio:** Python 3 T2A pipeline (paused — local TTS replacing Minimax)

No Node.js server needed. Pure static files served over HTTP.

---

## Deploy Steps

### Option A — Full rebuild from source (recommended)

```bash
# Pull latest code
cd /opt/sites/ephergent.com
git pull origin main

# Install dependencies
npm install

# Build static site
npm run build

# Serve dist/ as document root
# (config varies by web server — see Web Server Config below)
```

### Option B — Sync pre-built dist from repo

```bash
cd /home/debian/Documents/code_repos/ephergent.com
cp -r dist/* /var/www/ephergent.com/html/
```

Useful if build has already been run locally and pushed.

---

## Web Server Config

### Nginx

```nginx
server {
    listen 80;
    server_name ephergent.com;
    root /var/www/ephergent.com/html;
    index index.html;
    try_files $uri $uri/ =404;
}
```

### Apache (.htaccess)

Already handled — Astro outputs `dist/.htaccess` if configured.

---

## Directory Structure

```
ephergent.com/
├── dist/                    # Astro build output (what gets served)
│   ├── index.html
│   ├── transmissions/       # Episode pages
│   ├── crew/                # Character pages
│   ├── atlas/               # Lore pages
│   ├── games/               # Game embed pages
│   ├── audio/               # T2A MP3 output (future)
│   └── _astro/              # Bundled CSS/JS
├── scripts/
│   └── t2a_pipeline.py      # Audio generation (paused)
└── public/                  # Static assets
    └── audio/               # Season audio dirs (S01-S03)
```

---

## Audio Pipeline (Paused)

Local TTS app (WeirDing) replacing Minimax. When reactivated:

```bash
cd /home/debian/Documents/code_repos/ephergent.com
python3 scripts/t2a_pipeline.py --episode S01E01
```

Output → `public/audio/season01/S01E01.mp3` + manifest at `public/audio/manifest.json`.

Re-run `npm run build` after adding audio files so Astro picks them up.

---

## Gotchas

### esbuild + Unicode

Astro uses esbuild which chokes on non-ASCII bytes in `.astro` source files. If the build fails with cryptic encoding errors, the source files likely contain em-dashes (—), smart quotes, or other Unicode characters. Strip them before rebuilding.

### cp -r over rsync

rsync is not available on this VPS. Use `cp -r dist/* /destination/` instead.

### No Backend

This is a fully static site. No database, no environment variables, no secrets needed for serving. All content is baked in at build time.

---

## Build Checklist

- [ ] `npm install` (first time or after package changes)
- [ ] `npm run build`
- [ ] Verify `dist/` has ~80 HTML files
- [ ] `cp -r dist/*` to web root
- [ ] Reload web server

---

## Troubleshooting

**Build fails with esbuild error:** Source file has non-ASCII. Fix locally and push.

**404 on episode pages:** `cp -r dist/*` not run after last build, or web server root points to wrong directory.

**Audio not playing:** MP3 files exist but site wasn't rebuilt after adding them. Run `npm run build` again.

**Missing pages:** Check that `dist/transmissions/index.html` exists. If not, the transmissions index page failed to build — check for runtime errors.
