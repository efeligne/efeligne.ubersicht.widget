#!/bin/bash

# Spotify
RESULT=$(osascript -e '
try
  tell application "Spotify"
    if it is running and player state is playing then
      return " " & name of current track & "  —  " & artist of current track
    end if
  end tell
end try
return ""
' 2>/dev/null)
[[ -n "$RESULT" ]] && echo "$RESULT" && exit 0

# Music (Apple)
RESULT=$(osascript -e '
try
  if application "Music" is running then
    tell application "Music"
      if player state is playing then
        return " " & name of current track & "  —  " & artist of current track
      end if
    end tell
  end if
end try
return ""
' 2>/dev/null)
[[ -n "$RESULT" ]] && echo "$RESULT" && exit 0

# VLC
if pgrep -x "VLC" > /dev/null 2>&1; then
  RESULT=$(osascript -e '
    try
      tell application "VLC"
        if playing then
          set trackName to name of current item
          if trackName is not "" then
            return "󰕼 " & trackName
          end if
        end if
      end tell
    end try
    return ""
  ' 2>/dev/null)
  [[ -n "$RESULT" ]] && echo "$RESULT" && exit 0
fi

# Swinsian
RESULT=$(osascript -e '
try
  tell application "Swinsian"
    if it is running and player state is playing then
      return " " & name of current track & "  —  " & artist of current track
    end if
  end tell
end try
return ""
' 2>/dev/null)
[[ -n "$RESULT" ]] && echo "$RESULT" && exit 0

# VOX
RESULT=$(osascript -e '
try
  tell application "VOX"
    if it is running and player state is playing then
      set trackName to name of current track
      set trackArtist to artist of current track
      return " " & trackName & "  —  " & trackArtist
    end if
  end tell
end try
return ""
' 2>/dev/null)
[[ -n "$RESULT" ]] && echo "$RESULT" && exit 0

# Nothing playing
echo ""
