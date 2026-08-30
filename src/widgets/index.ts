import { batteryLevel } from '@/widgets/BatteryLevel/widget';
import { brightnessLevel } from '@/widgets/BrightnessLevel/widget';
import { clock } from '@/widgets/Clock/widget';
import { cpuUsage } from '@/widgets/CpuUsage/widget';
import { dayProgress } from '@/widgets/DayProgress/widget';
import { diskUsage } from '@/widgets/DiskUsage/widget';
import type { WidgetOut } from '@/widgets/Factory/types';
import { memoryUsage } from '@/widgets/MemoryUsage/widget';
import { nowPlaying } from '@/widgets/NowPlaying/widget';
import { theme } from '@/widgets/Theme/theme';
import { volumeLevel } from '@/widgets/VolumeLevel/widget';
import { weather } from '@/widgets/Weather/widget';
import { wifiSignal } from '@/widgets/WifiSignal/widget';

export const widgets = [
  batteryLevel,
  brightnessLevel,
  clock,
  cpuUsage,
  dayProgress,
  diskUsage,
  memoryUsage,
  nowPlaying,
  volumeLevel,
  weather,
  wifiSignal,
  theme,
] as const satisfies WidgetOut[];
