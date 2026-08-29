import type { InputWidget } from '@/widgets/Factory/types';

export const NowPlaying: InputWidget = ({ output, theme }) => {
  let track = '';

  if (output) {
    track = output.trim();
  }

  return (
    <span className={`nowPlaying ${theme}`}>
      {track !== '' && (
        <ul>
          <li style={{ animationDelay: '0s' }} />
          <li style={{ animationDelay: '0.1s' }} />
          <li style={{ animationDelay: '0.2s' }} />
          <li style={{ animationDelay: '0.3s' }} />
          <li style={{ animationDelay: '0.4s' }} />
          <li style={{ animationDelay: '0.5s' }} />
        </ul>
      )}
      {track}
    </span>
  );
};
