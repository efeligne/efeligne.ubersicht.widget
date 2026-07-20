import { ProgressBar } from './disk-usage.jsx';

export const className = `
  top: 7.5rem;
  right: 1rem;
`;

export const refreshFrequency = 5000;
export const command = `efeligne.ubersicht.widget/BrightnessCLI`;
export const render = ({ output }) => ProgressBar('󰃟', Number(output.trim()));
