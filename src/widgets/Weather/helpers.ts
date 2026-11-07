import {
  CloudLightningLine,
  CloudsLine,
  DrizzleLine,
  FogLine,
  HailLine,
  HazeLine,
  HeavyRainLine,
  MoonCloudyLine,
  MoonLine,
  RainLine,
  SnowLine,
  SquareLine,
  SunCloudyLine,
  SunLine,
  ThunderstormLine,
} from '@/icons';
import type { Config } from '@/lib/config';
import type { WeatherIcons, WeatherIconSet, WeatherRules } from '@/widgets/Weather/types';

const WEATHER_RULES: WeatherRules = [
  ['clear', ['clear', 'sunny']],
  ['partlyCloudy', ['partly']],
  ['cloudy', ['cloud', 'overcast']],
  ['thunder', ['thunder', 'storm']],
  ['lightning', ['lightning']],
  ['sleet', ['sleet', 'hail']],
  ['snow', ['snow', 'blizzard']],
  ['drizzle', ['drizzle']],
  ['heavyRain', ['heavy']],
  ['rain', ['rain', 'shower']],
  ['haze', ['haze']],
  ['fog', ['fog', 'mist']],
];

const MS_IN_MINUTE = 60_000;
const UNSAFE_FILENAME_CHARS = /[^a-z0-9]+/gi;

const same = (icon: WeatherIconSet['day']): WeatherIconSet => ({ day: icon, night: icon });

const WEATHER_ICONS: WeatherIcons = {
  clear: { day: SunLine, night: MoonLine },
  partlyCloudy: { day: SunCloudyLine, night: MoonCloudyLine },
  cloudy: same(CloudsLine),
  thunder: same(ThunderstormLine),
  lightning: same(CloudLightningLine),
  sleet: same(HailLine),
  snow: same(SnowLine),
  drizzle: same(DrizzleLine),
  heavyRain: same(HeavyRainLine),
  rain: same(RainLine),
  haze: same(HazeLine),
  fog: same(FogLine),
  unknown: same(SquareLine),
};

export const TYPE = 'SET_WEATHER';

export const getWeatherIcon = (condition: string, isNight: boolean): WeatherIconSet['day'] => {
  const c = condition.toLowerCase();

  for (const [key, keywords] of WEATHER_RULES) {
    if (keywords.some((keyword) => c.includes(keyword))) {
      const icons = WEATHER_ICONS[key];

      if (isNight) {
        return icons.night;
      }

      return icons.day;
    }
  }

  return WEATHER_ICONS.unknown.day;
};

export const buildCmd = (cfg: Config) => {
  const { location, cacheFile } = cfg.weather;
  const ttlMinutes = Math.floor(cfg.refresh.weather / MS_IN_MINUTE);
  const locationCacheFile = `${cacheFile}.${location.replace(UNSAFE_FILENAME_CHARS, '_')}`;

  return [
    `WEATHER_LOCATION='${location}'`,
    `WEATHER_CACHE_FILE='${locationCacheFile}'`,
    `WEATHER_TTL='${ttlMinutes}'`,
    'efeligne.ubersicht.widget/exec/weather.sh',
  ].join(' ');
};
