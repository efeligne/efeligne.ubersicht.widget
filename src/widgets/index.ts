import type { Config } from '@/lib/config';
import { createBatteryLevel } from '@/widgets/BatteryLevel/widget';
import { createBrightnessLevel } from '@/widgets/BrightnessLevel/widget';
import { createClock } from '@/widgets/Clock/widget';
import { createCpuUsage } from '@/widgets/CpuUsage/widget';
import { createDayProgress } from '@/widgets/DayProgress/widget';
import { createDiskUsage } from '@/widgets/DiskUsage/widget';
import { createDock } from '@/widgets/Dock/dock';
import type { WidgetOut } from '@/widgets/Factory/types';
import { createMemoryUsage } from '@/widgets/MemoryUsage/widget';
import { createNowPlaying } from '@/widgets/NowPlaying/widget';
import { createTheme } from '@/widgets/Theme/theme';
import { createVolumeLevel } from '@/widgets/VolumeLevel/widget';
import { createWeather } from '@/widgets/Weather/widget';
import { createWifiSignal } from '@/widgets/WifiSignal/widget';

const registry: [string, (cfg: Config) => WidgetOut][] = [
  ['batteryLevel', createBatteryLevel],
  ['brightnessLevel', createBrightnessLevel],
  ['clock', createClock],
  ['cpuUsage', createCpuUsage],
  ['dayProgress', createDayProgress],
  ['diskUsage', createDiskUsage],
  ['dock', createDock],
  ['memoryUsage', createMemoryUsage],
  ['nowPlaying', createNowPlaying],
  ['volumeLevel', createVolumeLevel],
  ['weather', createWeather],
  ['wifiSignal', createWifiSignal],
  ['theme', createTheme],
];

let widgets: WidgetOut[] = [];

export const getWidgets = () => widgets;

export const registerWidgets = (cfg: Config) => {
  widgets = registry
    .filter(([name]) => !cfg.widgets.disabled.includes(name))
    .map(([, create]) => create(cfg));
};
