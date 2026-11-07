import type { React } from 'uebersicht';
import type { IconProps } from '@/icons';

export type WeatherIconComponent = React.ComponentType<IconProps>;

export interface WeatherIconSet {
  day: WeatherIconComponent;
  night: WeatherIconComponent;
}

export interface WeatherIcons {
  clear: WeatherIconSet;
  partlyCloudy: WeatherIconSet;
  cloudy: WeatherIconSet;
  thunder: WeatherIconSet;
  lightning: WeatherIconSet;
  sleet: WeatherIconSet;
  snow: WeatherIconSet;
  drizzle: WeatherIconSet;
  heavyRain: WeatherIconSet;
  rain: WeatherIconSet;
  haze: WeatherIconSet;
  fog: WeatherIconSet;
  unknown: WeatherIconSet;
}

export type WeatherRules = [keyof WeatherIcons, string[]][];
