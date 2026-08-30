import { config } from '@/lib/config';
import { create } from '@/widgets/Factory/create';
import { cmd } from '@/widgets/NowPlaying/helpers';
import { NowPlaying } from '@/widgets/NowPlaying/NowPlaying';

export const nowPlaying = create({
  cmd,
  refreshTimeout: config.refresh.nowPlaying,
  type: 'SET_NOW_PLAYING',
  stateKey: 'playing',
  widget: NowPlaying,
});
