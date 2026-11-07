# efeligne.ubersicht.widget

A macOS desktop widget for [Übersicht](https://github.com/felixhageloh/uebersicht): clock, weather, now playing, system monitors — with automatic dark/light theming and Dock-aware positioning.

https://github.com/user-attachments/assets/251d2d97-c816-47be-adeb-20ece293ca01

## Widgets

| Widget | Description | Position | Refresh |
| --- | --- | --- | --- |
| **Clock** | Date and time | Top center | 1 s |
| **Weather** | Condition icon (day/night aware) and temperature | Bottom right | 10 min |
| **Now Playing** | Current track with an animated equalizer; falls back to idle text when nothing plays | Bottom left | 5 s |
| **Disk Usage** | APFS storage usage | Left side | 2 min |
| **Memory Usage** | Free memory | Left side | 5 s |
| **CPU Usage** | Processor load | Left side | 5 s |
| **Battery Level** | Charge percentage | Left side | 1 min |
| **Brightness Level** | Built-in display brightness | Right side | 5 s |
| **Day Progress** | Day elapsed, % | Right side | 1 min |
| **Volume Level** | Output volume | Right side | 5 s |
| **Wi-Fi Signal** | Signal strength | Right side | 1 min |

Invisible service widgets:

- **Theme** — tracks the macOS appearance (dark/light) and restyles every widget on switch.
- **Dock** — tracks the Dock position (bottom/left/right), size and auto-hide, and shifts the widgets so they never sit under the Dock. Nothing to do when the Dock auto-hides.

## Installation

1. Install [Übersicht](https://github.com/felixhageloh/uebersicht).
2. Download the release archive and unpack it so that the widget folder is named exactly:

   ```text
   ~/Library/Application Support/Übersicht/widgets/efeligne.ubersicht.widget/
   ```

   The folder name is fixed — the widget resolves `config.json` and its helper scripts relative to it.

   The folder must contain:

   ```text
   efeligne.ubersicht.widget/
   ├── widget.jsx      # the widget
   ├── config.json     # your settings
   └── exec/
       ├── BrightnessCLI
       └── weather.sh
   ```

3. For **Now Playing**, install [nowplaying-cli](https://github.com/kirtan-shah/nowplaying-cli):

   ```bash
   brew install nowplaying-cli
   ```

   On Apple Silicon the binary lives at `/opt/homebrew/bin/nowplaying-cli` (the default in `config.json`); on Intel Macs set `nowPlaying.cliPath` to `/usr/local/bin/nowplaying-cli`.

4. Enable the widget in the Übersicht menu.

## Configuration

All settings live in `config.json` next to `widget.jsx`. Edit the file and press **Refresh** in Übersicht — no rebuild needed. The file must be valid JSON; if it is missing or malformed, built-in defaults are used.

### `colors`

Text and progress bar colors for the light and dark appearances.

```json
"colors": {
  "fg": "#111111",
  "fgDark": "#BBD2E7",
  "track": "#777777",
  "trackDark": "#777777"
}
```

- `fg` / `fgDark` — text, icons and bar fill (`fgDark` is used in dark mode);
- `track` / `trackDark` — the progress bar background.

### `refresh`

Update intervals in milliseconds. Defaults: `clock` 1000, `weather` 600000 (10 min), `nowPlaying` 5000, `batteryLevel` 60000, `brightnessLevel` 5000, `cpuUsage` 5000, `dayProgress` 60000, `diskUsage` 120000, `theme` 10000, `memoryUsage` 5000, `volumeLevel` 5000, `wifiSignal` 60000, `docksSize` 5000.

### `weather`

```json
"weather": {
  "location": "Saint_Petersburg,Russia",
  "cacheFile": "/tmp/weather.cache"
}
```

- `location` — any [wttr.in](https://wttr.in) location (`City`, `City,Country`, `~latitude,longitude`).
- `cacheFile` — weather cache base path. The actual cache file is derived from it and the location, so changing `location` never serves stale weather.

### `nowPlaying`

```json
"nowPlaying": {
  "cliPath": "/opt/homebrew/bin/nowplaying-cli"
}
```

Path to the `nowplaying-cli` binary (see Installation).

### `positions`

Vertical placement of the progress bar widgets, in CSS units. Each entry is `{ "top": "…", "side": "left" | "right" }`. Keys: `disk` (5 rem left), `volume` (5 rem right), `memory` (7.5 rem left), `brightness` (7.5 rem right), `cpu` (10 rem left), `wifi` (10 rem right), `battery` (12.5 rem left), `dayProgress` (12.5 rem right).

### `progressBar`

```json
"progressBar": { "height": "2px" }
```

Thickness of the progress bar track.

### Disabling widgets

Any widget can be turned off in `config.json` — it stops polling and disappears from the screen:

```json
"widgets": {
  "disabled": ["nowPlaying", "diskUsage"]
}
```

Use the exact names from the table below (copy them carefully — the file is strict JSON, names are case-sensitive):

| Name | What it is |
| --- | --- |
| `batteryLevel` | Battery charge indicator |
| `brightnessLevel` | Display brightness indicator |
| `clock` | Clock and date |
| `cpuUsage` | CPU load indicator |
| `dayProgress` | Day elapsed indicator |
| `diskUsage` | Disk usage indicator |
| `dock` | Dock tracking (position/size/auto-hide). Disabling it turns off the Dock-avoidance shifts |
| `memoryUsage` | Memory indicator |
| `nowPlaying` | Now playing widget |
| `volumeLevel` | Volume indicator |
| `weather` | Weather widget |
| `wifiSignal` | Wi-Fi signal indicator |
| `theme` | macOS appearance tracking. Disabling it pins every widget to the light appearance |

## Behavior notes

- **Weather** queries [wttr.in](https://wttr.in) and caches the response for `refresh.weather` minutes. When offline it keeps showing the last successful reading; without any cache it shows `N/A`.
- **Now Playing** reads the system-wide now playing info, so it works with any player (Music, Spotify, browsers, …). While playing it shows the track and animates the equalizer; on pause or silence it shows `Nothing playing` with idle bars. Change that text in `src/widgets/NowPlaying/NowPlaying.tsx` (`NOTHING_PLAYING`) and rebuild.
- **N/A** appears when a command cannot produce a value (desktop Mac without a battery, external display without brightness or volume, unsupported Wi-Fi, …).
- **Dock**: widgets keep a 1 rem margin from the screen edge; when the Dock is visible on the left/right/bottom, the widgets on that side shift by the Dock size (`tilesize` plus padding). With auto-hide enabled nothing shifts.

## Development

Source lives in `src/` (TypeScript) and is bundled into `widget.jsx`:

```bash
cd src
npm install
npm run build   # bundles to ../widget.jsx, creates ../config.json if missing
npm run lint    # Biome
```

After building, refresh Übersicht.

Pushing a `v*` tag (e.g. `v1.2.0`) triggers the release workflow: it installs dependencies, builds and assembles the distribution (`widget.jsx` + `config.json` + `exec/`), packs it into `efeligne.ubersicht.widget.zip` and attaches the archive to a GitHub Release.

Layout: `src/widgets/` holds one folder per widget — each exposes a small `createX(config)` factory; `src/widgets/index.ts` is the registry (names used in `widgets.disabled`); `src/helpers/` contains the state store, the async bootstrap (config loading → widget registration → runners) and the theme context.

## Fonts

- **Snell Roundhand** and **New York** — built into macOS, used by the clock.
- Monospace text uses **JetBrainsMono Nerd Font** when installed and falls back to **Courier New** otherwise — no font installation is required for icons (they are inline SVG).
