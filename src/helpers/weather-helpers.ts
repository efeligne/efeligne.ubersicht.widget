interface WeatherIcons {
  clear: string;
  cloudy: string;
  rain: string;
  snow: string;
  thunder: string;
  fog: string;
  unknown: string;
}

export const getWeatherIcon = (
  condition: string,
  { clear, cloudy, rain, snow, thunder, fog, unknown }: WeatherIcons,
) => {
  const c = condition.toLowerCase();

  const isClear = c.includes('clear') || c.includes('sunny');
  const isCloudy = c.includes('cloud') || c.includes('overcast');
  const isRain = c.includes('rain') || c.includes('drizzle') || c.includes('shower');
  const isSnow = c.includes('snow') || c.includes('sleet') || c.includes('blizzard');
  const isThunder = c.includes('thunder') || c.includes('storm');
  const isFog = c.includes('fog') || c.includes('mist') || c.includes('haze');

  if (isClear) return clear;
  if (isCloudy) return cloudy;
  if (isRain) return rain;
  if (isSnow) return snow;
  if (isThunder) return thunder;
  if (isFog) return fog;

  return unknown;
};
