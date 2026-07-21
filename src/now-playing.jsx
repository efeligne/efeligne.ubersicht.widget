// eslint-disable-next-line import/no-unresolved
import { React, run } from 'uebersicht';
import dispatcher from './dispatcher';
import config from '../lib/config.js';

const scriptPath = 'efeligne.ubersicht.widget/exec/now-playing.sh';
const type = 'SET_NOW_PLAYING';

const parentBlockStyle = {
  position: 'absolute',
  bottom: '1rem',
  left: '1rem',
  color: config.colors.foreground,
  fontFamily: "'JetBrainsMono Nerd Font', 'Courier New', monospace",
  fontSize: '0.85rem',
  letterSpacing: '0.08rem',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '45vw',
  opacity: 1,
  transition: 'opacity 0.4s ease',
};

function widget({ output }) {
  const track = output ? output.trim() : '';
  if (!track) return null;
  return (
    <span style={parentBlockStyle}>
      <span className="bars">
        <span className="bar" style={{ animationDelay: '0s' }} />
        <span className="bar" style={{ animationDelay: '0.1s' }} />
        <span className="bar" style={{ animationDelay: '0.2s' }} />
        <span className="bar" style={{ animationDelay: '0.3s' }} />
        <span className="bar" style={{ animationDelay: '0.4s' }} />
      </span>
      {track}
    </span>
  );
}

export default {
  refreshTimeout: config.refresh.nowPlaying,
  type,
  runner: (dispatch) => () => {
    const cmd = [
      `ICON_SPOTIFY='${config.icons.players.spotify} '`,
      `ICON_MUSIC='${config.icons.players.music} '`,
      `ICON_VLC='${config.icons.players.vlc} '`,
      `ICON_SWINSIAN='${config.icons.players.swinsian} '`,
      `ICON_VOX='${config.icons.players.vox} '`,
      scriptPath,
    ].join(' ');
    run(cmd).then(dispatcher(type, dispatch));
  },
  widget: React.memo(widget),
};
