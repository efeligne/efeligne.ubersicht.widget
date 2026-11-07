import { useTheme } from '@/helpers/context';
import type { InputWidget } from '@/widgets/Factory/types';

const NOTHING_PLAYING = 'Nothing playing';
const NULL_VALUE = 'null';
const PLAYING_RATE = '1';
const LINE_BREAK = /\r?\n/;

export const NowPlaying: InputWidget = ({ output }) => {
  const theme = useTheme();
  const [rate = '', rawTitle = '', rawArtist = ''] = (output ?? '').split(LINE_BREAK);
  const title = rawTitle.trim();
  const artist = rawArtist.trim();
  const hasTrack = title !== '' && title !== NULL_VALUE;

  const classes = ['nowPlaying', theme];

  if (hasTrack && rate.trim() === PLAYING_RATE) {
    classes.push('playing');
  }

  let track = NOTHING_PLAYING;

  if (hasTrack) {
    track = `${title}  —  ${artist}`;
  }

  return (
    <span className={classes.join(' ')}>
      <ul>
        <li style={{ animationDelay: '0s' }} />
        <li style={{ animationDelay: '0.1s' }} />
        <li style={{ animationDelay: '0.2s' }} />
        <li style={{ animationDelay: '0.3s' }} />
        <li style={{ animationDelay: '0.4s' }} />
        <li style={{ animationDelay: '0.5s' }} />
      </ul>
      {track}
    </span>
  );
};
