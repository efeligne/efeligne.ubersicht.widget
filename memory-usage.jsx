// eslint-disable-next-line import/no-unresolved
import { React, css } from 'uebersicht';

export const refreshFrequency = 1000; // ms

export const command = 'memory_pressure | grep System-wide';

export const className = css` 
  background: transparent;
  border-radius: 1rem;
  position: absolute;
  top: calc(40% + 75px);
  right: calc(50% - 320px);
`;

const progressContainer = css`
  width: 640px;
  height: 25px;
  background: rgba(251, 251, 253, .1);
  position: relative;
  border-radius: 1rem;
`;

const progressBar = (width) => css`
  background: rgba(251, 251, 253, .2);
  width: ${width}%;
  height: 100%;
  border-radius: 1rem;
`;

const progressLabel = css`
  background: transparent;
  width: 100%;
  height: 100%;
  position: absolute;
  color: white;
  font-family: Courier New;
  font-variant: small-caps;
  letter-spacing: 0.12rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const render = ({ output }) => {
  const used = 100 - (output.split(':')[1]?.split('%')[0] ?? 0);
  return (
    <div className={progressContainer}>
      <div className={progressLabel}>Memory usage: {used}%</div>
      <div className={progressBar(used)} />
    </div>
  );
};
