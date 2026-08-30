import { config } from '@/lib/config';

const { spotify, music, vlc, swinsian, vox } = config.icons.players;

export const cmd = [
  `ICON_SPOTIFY='${spotify}'`,
  `ICON_MUSIC='${music}'`,
  `ICON_VLC='${vlc}'`,
  `ICON_SWINSIAN='${swinsian}'`,
  `ICON_VOX='${vox}'`,
  'efeligne.ubersicht.widget/exec/now-playing.sh',
].join(' ');
