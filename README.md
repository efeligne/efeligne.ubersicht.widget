# Übersicht Widget

A macOS desktop widget for [Übersicht](https://github.com/felixhageloh/uebersicht).

<img width="1680" height="1050" alt="Screenshot 2026-07-21 at 07 59 19" src="https://github.com/user-attachments/assets/c22bcd12-a283-4d0a-b4d9-69b4a54b7bd2" />

## Widgets

| Widget | Description | Side | Refreshes |
| --- | --- | --- | --- |
| **Clock** | Day, date, and time | Center | 1s |
| **Weather** | Current condition and temperature | Top-right | 10min |
| **Now Playing** | Currently playing track | Bottom-left | 5s |
| **Disk Usage** | APFS storage usage | Left | 2min |
| **Memory Usage** | Memory pressure | Left | 5s |
| **CPU Usage** | CPU load | Left | 5s |
| **Battery Level** | Battery charge | Left | 1min |
| **Brightness Level** | Display brightness | Right | 5s |
| **Day Progress** | Percent of day elapsed | Right | 1min |
| **Volume Level** | System output volume | Right | 5s |
| **Wi-Fi Signal** | Signal strength | Right | 1min |

## Project Structure

```text
efeligne.ubersicht.widget/
├── widget.jsx              # Single Übersicht entry point
├── lib/
│   └── config.js           # User-configurable settings
├── exec/
│   ├── BrightnessCLI       # Binary for brightness detection
│   └── now-playing.sh      # Shell script for music detection
├── src/
│   ├── dispatcher.js       # Redux-like dispatch utility
│   ├── global-css.js       # Shared global styles
│   ├── progress-bar.jsx    # Reusable progress bar component
│   ├── clock.jsx
│   ├── weather.jsx
│   ├── now-playing.jsx
│   ├── disk-usage.jsx
│   ├── memory-usage.jsx
│   ├── cpu-usage.jsx
│   ├── battery-level.jsx
│   ├── brightness-level.jsx
│   ├── day-progress.jsx
│   ├── volume-level.jsx
│   └── wifi-signal.jsx
├── .eslintrc.json
├── .prettierrc
└── package.json
```

## Architecture

`widget.jsx` is the single Übersicht widget. It uses `init`/`updateState`/`render`
lifecycle with a centralized dispatcher pattern:

- **`init(dispatch)`** — starts all widget runners
- **`updateState(event, state)`** — Redux-like reducer
- **`render(state)`** — composes all widget components

Each module in `src/` exports `{ refreshTimeout, type, runner, widget }`,
decoupling data fetching from rendering.

## Configuration

Edit `lib/config.js` to customize the widget without touching source code:

- **`colors`** — `foreground` (text/bar color) and `track` (progress background)
- **`icons`** — Nerd Font icons for each widget and weather condition
- **`refresh`** — update intervals per widget (in milliseconds)
- **`weather.location`** — city for weather (format: `City,Country`)

Example:

```js
colors: {
  foreground: '#111111',  // dark for light wallpaper
  track: '#777777',       // progress bar background
}
```

## Usage Notes

- **Weather** — uses [wttr.in](https://wttr.in). Requires an internet connection.
Shows `N/A` when unavailable.
- **Now Playing** — supports Spotify, Apple Music, VLC, Swinsian, and VOX.
Only one active player is detected at a time.
- **Volume** — detected only for devices that support software volume control.
External monitors without audio control show `N/A`.
- **Brightness** — detected only for the main built-in display.
External monitors are not supported.
- **Disk** — tracks only APFS-formatted volumes. Other filesystems
(HFS+, exFAT, etc.) are not included.
- **Widgets may show `N/A`** when the underlying command fails to retrieve data
(e.g., no battery on a desktop Mac, no Wi‑Fi hardware, unsupported audio device).

## Fonts

- Snell Roundhand
- Courier New
- New York
- JetBrainsMono Nerd Font (required for icons; will not render without it)

## Development

```sh
npm run lint        # Run ESLint
npm run format      # Format with Prettier
```

After making changes, refresh Übersicht to reload the widget.
