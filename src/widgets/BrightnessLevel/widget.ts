import { config } from '@/lib/config';
import { BrightnessLevel } from '@/widgets/BrightnessLevel/BrightnessLevel';
import { create } from '@/widgets/Factory/create';

export const brightnessLevel = create({
  cmd: 'efeligne.ubersicht.widget/exec/BrightnessCLI',
  refreshTimeout: config.refresh.brightnessLevel,
  type: 'SET_BRIGHTNESS_LEVEL',
  stateKey: 'brightness',
  widget: BrightnessLevel,
});
