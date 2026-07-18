# Zman

A configurable interval timer for workouts, built as a lightweight single-page app. "Zman" means "time" in Hebrew.

**[Live demo](https://ayal.github.io/zman)**

## Features

- Configurable schedule via URL query parameter
- Visual countdown with audio beeps in the final seconds
- Auto-advance through segments with progress bar
- Skip-to-next and play/pause controls
- Screen wake lock (keeps device awake during a session)
- Mobile-first dark UI

## Schedule Format

The timer schedule is configured via the `?set=` query parameter.

Format: sections separated by `|`. Each section is `repeat,labels,times`:

| Part | Description |
|------|-------------|
| `repeat` | Number of full cycles for this section |
| `labels` | Slash-separated segment names (e.g. `Work/Rest`) |
| `times` | Slash-separated durations in seconds (e.g. `30/10`) |

### Examples

**Default** — 3 rounds of upper-body + core, then legs/cardio finishers (30s work / 10s rest, ~8 min):

3× Push-ups, Superman, Sit-ups → Jumping Jacks, Plank, Tricep Dips.

**Tabata** (8 rounds of 20s work / 10s rest):

```
?set=1,Get ready,5|8,Work/Rest,20/10
```

**Simple countdown** (60 seconds):

```
?set=1,Timer,60
```

**Custom warmup + workout + cooldown**:

```
?set=1,Warm up,30|5,Work/Rest,45/15|1,Cool down,60
```

## Development

```bash
npm install
npm run dev        # http://localhost:5173/zman/
```

## Build & Deploy

```bash
npm run build      # outputs to dist/
npm run deploy     # deploys to GitHub Pages
```

## Tech Stack

- [React 19](https://react.dev/) + TypeScript
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) for icons
- [NoSleep.js](https://github.com/richtr/NoSleep.js) for wake lock
