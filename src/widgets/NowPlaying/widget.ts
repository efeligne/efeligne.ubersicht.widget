import type { Config } from '@/lib/config';
import { create } from '@/widgets/Factory/create';
import { NowPlaying } from '@/widgets/NowPlaying/NowPlaying';

export const createNowPlaying = (cfg: Config) =>
  create({
    cmd: `${cfg.nowPlaying.cliPath} get playbackRate title artist`,
    refreshTimeout: cfg.refresh.nowPlaying,
    type: 'SET_NOW_PLAYING',
    stateKey: 'playing',
    widget: NowPlaying,
  });
