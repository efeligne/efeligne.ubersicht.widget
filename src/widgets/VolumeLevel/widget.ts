import type { Config } from '@/lib/config';
import { create } from '@/widgets/Factory/create';
import { VolumeLevel } from '@/widgets/VolumeLevel/VolumeLevel';

export const createVolumeLevel = (cfg: Config) =>
  create({
    cmd: 'osascript -e "return output volume of (get volume settings)"',
    refreshTimeout: cfg.refresh.volumeLevel,
    type: 'SET_VOLUME_LEVEL',
    stateKey: 'volume',
    widget: VolumeLevel,
  });
