import type { Config } from '@/lib/config';
import { BrightnessLevel } from '@/widgets/BrightnessLevel/BrightnessLevel';
import { create } from '@/widgets/Factory/create';

export const createBrightnessLevel = (cfg: Config) =>
  create({
    cmd: 'efeligne.ubersicht.widget/exec/BrightnessCLI',
    refreshTimeout: cfg.refresh.brightnessLevel,
    type: 'SET_BRIGHTNESS_LEVEL',
    stateKey: 'brightness',
    widget: BrightnessLevel,
  });
