import { run } from 'uebersicht';
import defaults from './config.defaults.json';

export interface WidgetPosition {
  top: string;
  side: string;
}

export interface Config {
  colors: {
    fg: string;
    fgDark: string;
    track: string;
    trackDark: string;
  };
  refresh: Record<string, number>;
  weather: {
    location: string;
    cacheFile: string;
  };
  nowPlaying: {
    cliPath: string;
  };
  brightnessLevel: {
    cliPath: string;
  };
  positions: Record<string, WidgetPosition>;
  widgets: {
    disabled: string[];
  };
  progressBar: {
    height: string;
  };
}

type PlainObject = Record<string, unknown>;

const isPlainObject = (value: unknown): value is PlainObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const deepMerge = (base: PlainObject, override: PlainObject): PlainObject => {
  const result: PlainObject = { ...base };

  for (const key of Object.keys(override)) {
    const baseValue = base[key];
    const overrideValue = override[key];

    if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
      result[key] = deepMerge(baseValue, overrideValue);
    } else {
      result[key] = overrideValue;
    }
  }

  return result;
};

const CONFIG_PATH = 'efeligne.ubersicht.widget/config.json';

const defaultConfig = defaults as Config;

let current = defaultConfig;

export const getConfig = () => current;

export const loadConfig = async (): Promise<Config> => {
  try {
    const raw = await run(`cat ${CONFIG_PATH}`);
    const parsed: unknown = JSON.parse(raw);

    current = isPlainObject(parsed) ? (deepMerge(defaults, parsed) as Config) : defaultConfig;
  } catch (error) {
    console.error('config: failed to load config.json, using defaults', error);
    current = defaultConfig;
  }

  return current;
};
