# My Übersicht Widget

See: [felixhageloh/uebersicht](https://github.com/felixhageloh/uebersicht)

<img width="3360" height="2100" alt="tg_image_1228996188" src="https://github.com/user-attachments/assets/5e880f74-80ab-4237-aaf7-f8943b36044f" />

**The following fonts are used in the widget:**

- Snell Roundhand
- Courier New
- New York
- JetBrainsMono Nerd Font (required for icons; will not render without it)

## Usage Notes

- **Weather** — location is configured via the `location` variable in `weather.jsx`. Change it to your city before use.
- **Now Playing** — supports Spotify, Apple Music, VLC, Swinsian, and VOX. Only one active player is detected at a time.
- **Volume** — detected only for devices that support software volume control. External monitors without audio control show `N/A`.
- **Weather (online)** — uses [wttr.in](https://wttr.in). Requires an internet connection. Shows `N/A` when unavailable.
- **Brightness** — detected only for the main built-in display. External monitors are not supported.
- **Disk** — tracks only APFS-formatted volumes. Other filesystems (HFS+, exFAT, etc.) are not included.
- **Widgets may show `N/A`** when the underlying command fails to retrieve data (e.g., no battery on a desktop Mac, no Wi-Fi hardware, unsupported audio device).
