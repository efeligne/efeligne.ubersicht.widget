export interface WeatherIcons {
  clear: string;
  cloudy: string;
  rain: string;
  snow: string;
  thunder: string;
  fog: string;
  unknown: string;
}

export type WeatherRules = [keyof WeatherIcons, string[]][];
