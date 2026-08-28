import createWidget from './widget-factory.jsx';
import ProgressBar from './progress-bar.jsx';
import config from '../lib/config.js';

const { refresh, positions, icons } = config;
const { top, side } = positions.cpu;

export default createWidget({
  cmd: 'top -l 2 -n 0 2>/dev/null | awk \'/^CPU/{if(++c==2) printf "%.0f\\n", $3+$5}\'',
  refreshTimeout: refresh.cpuUsage,
  type: 'SET_CPU_USAGE',
  stateKey: 'cpu',
  widget: ({ output, theme }) => {
    const val = output ? Number(output.trim()) : NaN;
    const percentage = Number.isNaN(val) ? 'N/A' : Math.round(val);

    return (
      <ProgressBar label={icons.cpu} percentage={percentage} side={side} top={top} theme={theme} />
    );
  },
});
