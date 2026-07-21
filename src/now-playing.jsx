// eslint-disable-next-line import/no-unresolved
import { React, run } from 'uebersicht';
import dispatcher from './dispatcher';

const cmd = 'efeligne.ubersicht.widget/src/now-playing.sh';
const type = 'SET_NOW_PLAYING';

const parentBlockStyle = {
  position: 'absolute',
  bottom: '1rem',
  left: '1rem',
  color: '#111111',
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
  refreshTimeout: 5000,
  type,
  runner: (dispatch) => () => {
    run(cmd).then(dispatcher(type, dispatch));
  },
  widget: React.memo(widget),
};
