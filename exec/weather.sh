#!/bin/bash

WEATHER_LOCATION="${WEATHER_LOCATION:-Saint_Petersburg,Russia}"
WEATHER_CACHE_FILE="${WEATHER_CACHE_FILE:-/tmp/weather.cache}"
WEATHER_TTL="${WEATHER_TTL:-10}"

if [ -f "$WEATHER_CACHE_FILE" ] && [ -z "$(find "$WEATHER_CACHE_FILE" -mmin +"$WEATHER_TTL")" ]; then
  cat "$WEATHER_CACHE_FILE"
  exit 0
fi

TMP_FILE="${WEATHER_CACHE_FILE}.tmp"

if curl -fsS "wttr.in/$WEATHER_LOCATION?format=%C|%t" 2>/dev/null >"$TMP_FILE" && [ -s "$TMP_FILE" ]; then
  mv "$TMP_FILE" "$WEATHER_CACHE_FILE"
  cat "$WEATHER_CACHE_FILE"
else
  rm -f "$TMP_FILE"

  if [ -f "$WEATHER_CACHE_FILE" ]; then
    cat "$WEATHER_CACHE_FILE"
  else
    echo "N/A|N/A"
  fi
fi
