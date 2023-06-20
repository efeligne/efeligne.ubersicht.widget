// eslint-disable-next-line import/no-unresolved
import { React, css } from 'uebersicht';

export const refreshFrequency = 120000; // ms

export const command = 'df -k -t  apfs';

export const className = css` 
  background: transparent;
  border-radius: 1rem;
  position: absolute;
  top: calc(40% - 200px);
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

const toGB = (kb) => Math.round(kb / 1024 ** 2);

export const render = ({ output }) => {
  const outputLines = output?.split(/\r?\n/).slice(1).filter(Boolean);
  const size = outputLines[0] ?? '';
  const sizeGB = toGB(+size.split(' ').filter(Boolean)[1]);

  const totalUsed = outputLines.reduce((accumulator, current) => {
    const [,, used] = current.split(' ').filter(Boolean);
    return accumulator + +used;
  }, 0);

  const used = Math.round((toGB(totalUsed) * 100) / sizeGB);

  return (
    <div className={progressContainer}>
      <div className={progressLabel}>Disk usage: {used}%</div>
      <div className={progressBar(used)} />
    </div>
  );
};
