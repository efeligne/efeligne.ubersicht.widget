import { run } from 'uebersicht';
import { createWidget } from '../helpers/widget-factory';
import { dispatcher } from '../helpers/dispatcher';
import { config } from '../../lib/config';

const type = 'SET_NOW_PLAYING';
const scriptPath = 'efeligne.ubersicht.widget/exec/now-playing.sh';

export default createWidget({
  refreshTimeout: config.refresh.nowPlaying,
  type,
  stateKey: 'playing',
  widget: ({ output, theme }) => {
    const track = output ? output.trim() : '';
    if (!track) return null;

    return (
      <span className={`nowPlaying ${theme}`}>
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
  },

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
});
