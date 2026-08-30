# efeligne.ubersicht.widget

A macOS desktop widget for [Übersicht](https://github.com/felixhageloh/uebersicht).

<img width="1680" height="1050" alt="Screenshot 2026-08-28 at 14 46 46" src="https://github.com/user-attachments/assets/4eeab486-5231-411e-8bab-3bd08dd84ffa" />

<img width="1680" height="1050" alt="Screenshot 2026-08-28 at 14 45 51" src="https://github.com/user-attachments/assets/c2ec9408-28e6-4b81-bee7-dfda5683160a" />


## Installation

### Prerequisites

- [Übersicht](https://github.com/felixhageloh/uebersicht) — install from official website
- [JetBrainsMono Nerd Font](https://github.com/ryanoasis/nerd-fonts) — required for widget icons

### Setup

1. **Clone or copy** the widget to your Übersicht widgets directory:

   ```bash
   cp -r efeligne.ubersicht.widget ~/Library/'Application Support'/Übersicht/widgets/
   ```

2. **Navigate to the source directory** and install dependencies:

   ```bash
   cd ~/Library/'Application Support'/Übersicht/widgets/efeligne.ubersicht.widget/src
   npm install
   ```

3. **Build** the widget:

   ```bash
   npm run build
   ```

4. **Refresh Übersicht** — the widget should appear in the sidebar, click to activate

## Widgets

| Widget | Description | Position | Refresh |
| --- | --- | --- | --- |
| **Clock** | Current time with date | Center | 1s |
| **Weather** | Temperature and conditions | Bottom-right | 10min |
| **Now Playing** | Current track with animated equalizer | Bottom-left | 5s |
| **Disk Usage** | APFS storage usage | Left side | 2min |
| **Memory Usage** | Available memory | Left side | 5s |
| **CPU Usage** | Processor load | Left side | 5s |
| **Battery Level** | Charge percentage | Left side | 1min |
| **Brightness Level** | Display brightness | Right side | 5s |
| **Day Progress** | Day elapsed | Right side | 1min |
| **Volume Level** | Output volume | Right side | 5s |
| **Wi-Fi Signal** | Network strength | Right side | 1min |

## Project Structure

```
efeligne.ubersicht.widget/
├── widget.jsx              # Compiled output (do not edit)
├── lib/
│   └── config.js           # User-configurable settings
├── exec/
│   ├── BrightnessCLI       # Brightness detection binary
│   └── now-playing.sh      # Music players detection script
└── src/
    ├── widget.tsx          # Main entry point
    ├── build.js            # Build script
    ├── tsconfig.json       # TypeScript configuration
    ├── biome.json          # Biome linter configuration
    ├── package.json         # Dependencies and scripts
    ├── uebersicht.d.ts     # TypeScript declarations for Übersicht
    ├── helpers/            # Shared utilities
    │   ├── const.ts        # Constants (MAX_PERCENTAGE, etc.)
    │   ├── dispatcher.ts   # Redux-like dispatch utilities
    │   ├── getPercentage.ts # Parse percentage from command output
    │   ├── init.ts         # Widget initialization
    │   ├── state.ts        # State management
    │   ├── styles.ts       # Global CSS styles
    │   └── toGb.ts         # KB to GB conversion
    └── widgets/            # Widget implementations
        ├── index.ts         # Widget registry
        ├── Factory/         # Widget factory pattern
        │   ├── create.tsx   # Factory function
        │   ├── helpers.ts   # Factory utilities
        │   └── types.ts     # TypeScript interfaces
        ├── BatteryLevel/
        ├── BrightnessLevel/
        ├── Clock/           # DateLine, TimeLine, helpers, types
        ├── CpuUsage/
        ├── DayProgress/
        ├── DiskUsage/
        ├── MemoryUsage/
        ├── NowPlaying/
        ├── ProgressBar/     # Shared progress bar component
        ├── Theme/           # Dark/light mode detection
        ├── VolumeLevel/
        ├── Weather/
        └── WifiSignal/
```

## Architecture

The widget uses a centralized architecture with widget registry:

```
┌────────────────────────────────────────────────────┐
│                      widget.tsx                    │
│  ┌─────────────────────────────────────────────┐   │
│  │ init.ts — runs all runners, sets intervals  │   │
│  │ state.ts — centralized state + reducers     │   │
│  │ dispatcher.ts — safe dispatch utilities     │   │
│  └─────────────────────────────────────────────┘   │
│                         │                          │
│                         ▼                          │
│  ┌─────────────────────────────────────────────┐   │
│  │           widgets/index.ts                  │   │
│  │     [widget1, widget2, widget3, ...]        │   │
│  └─────────────────────────────────────────────┘   │
│                         │                          │
│         ┌───────────────┼───────────────┐          │
│         ▼               ▼               ▼          │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐    │
│  │  Battery   │  │   Clock    │  │   Weather  │    │
│  │  Widget    │  │   Widget   │  │   Widget   │    │
│  └────────────┘  └────────────┘  └────────────┘    │
└────────────────────────────────────────────────────┘
```

### Widget Interface

Each widget exports an object created via the `create` factory:

```typescript
{
  refreshTimeout,  // Update interval in milliseconds
  type,            // Event type for the dispatcher
  stateKey,        // Key in global state object
  runner,          // Optional custom data fetcher
  reducer,         // Auto-generated by factory
  widget           // React component
}
```

### Custom Runners

Some widgets use custom runners for special behavior:

- **Weather** — caches last successful result for offline use
- **DayProgress** — calculates progress via JavaScript (no shell command)
- **Theme** — uses custom command for macOS appearance detection

## Configuration

Edit `lib/config.js` to customize the widget:

```javascript
export const config = {
  colors: {
    fg: '#111111',       // Text color (light mode)
    fgDark: '#BBD2E7',   // Text color (dark mode)
    track: '#777777',     // Progress bar background
    trackDark: '#777777',
  },
  icons: {
    // Nerd Font icon codes for each widget
    battery: '\uF240',
    brightness: '\uF042',
    cpu: '\uF2DB',
    // ... more icons
    players: {
      spotify: '\uF1BC',
      music: '\uF001',
      vlc: '\uF008',
      swinsian: '\uF025',
      vox: '\uF025',
    },
  },
  refresh: {
    clock: 1000,          // 1 second
    weather: 600000,      // 10 minutes
    nowPlaying: 5000,
    // ... more intervals (in ms)
  },
  positions: {
    disk: { top: '5rem', side: 'left' },
    volume: { top: '5rem', side: 'right' },
    memory: { top: '7.5rem', side: 'left' },
    // ... widget positions
  },
  weather: {
    location: 'Saint_Petersburg,Russia',  // wttr.in format
  },
};
```

## Usage Notes

- **Weather** — queries [wttr.in](https://wttr.in). Requires internet.
  Shows cached data when offline, `N/A` when unavailable.

- **Now Playing** — supports Spotify, Apple Music, VLC, Swinsian, VOX.
  Only one active player is detected at a time.

- **Volume** — requires software volume control. External monitors
  without audio support show `N/A`.

- **Brightness** — detects only built-in display brightness.
  External monitors are not supported.

- **Disk** — tracks only APFS volumes. Other filesystems (HFS+,
  exFAT, etc.) are ignored.

- Widgets may display `N/A` when underlying commands fail
  (no battery on desktop Mac, unsupported audio device, etc.).

## Development

Source TypeScript is in `src/` and must be built to `widget.jsx`:

```bash
cd src
npm install          # Install dependencies
npm run build        # Production build
npm run check        # Lint + format + fix (Biome)
npm run format       # Format only (Biome)
```

After building, refresh Übersicht to reload the widget.

## Fonts

Required fonts (install via Homebrew or download):

```bash
brew install font-jetbrains-nerd-font font-snell-roundhand font-new-york
```

- **JetBrainsMono Nerd Font** — widget icons
- **Snell Roundhand** — clock display
- **New York** — day name
- **Courier New** — time digits
