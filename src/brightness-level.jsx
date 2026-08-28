import ProgressBar from './progress-bar.jsx';
import createWidget from './widget-factory.jsx';
import config from '../lib/config.js';

const { icons, refresh, positions } = config;
const { top, side } = positions.brightness;

export default createWidget({
  cmd: 'efeligne.ubersicht.widget/exec/BrightnessCLI',
  refreshTimeout: refresh.brightnessLevel,
  type: 'SET_BRIGHTNESS_LEVEL',
  stateKey: 'brightness',
  widget: ({ output, theme }) => {
    const trimmed = output?.trim();
    const percentage = trimmed ? Number(trimmed) : NaN;

    return (
      <ProgressBar
        label={icons.brightness}
        percentage={Number.isNaN(percentage) ? 'N/A' : percentage}
        top={top}
        side={side}
        theme={theme}
      />
    );
  },
});
