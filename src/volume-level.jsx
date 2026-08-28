import createWidget from './widget-factory.jsx';
import ProgressBar from './progress-bar.jsx';
import config from '../lib/config.js';

const { icons, refresh, positions } = config;
const { top, side } = positions.volume;

export default createWidget({
  cmd: 'osascript -e "return output volume of (get volume settings)"',
  refreshTimeout: refresh.volumeLevel,
  type: 'SET_VOLUME_LEVEL',
  stateKey: 'volume',
  widget: ({ output, theme }) => {
    const vol = output ? Number(output.trim()) : NaN;
    const percentage = Number.isNaN(vol) ? 'N/A' : vol;

    return (
      <ProgressBar
        label={icons.volume}
        percentage={percentage}
        top={top}
        side={side}
        theme={theme}
      />
    );
  },
});
