// eslint-disable-next-line import/no-unresolved
import { React, css } from 'uebersicht';

export const refreshFrequency = 120000;

export const command = 'df -k -t apfs';

export const styles = (top) => css` 
  background: transparent;
  border-radius: 1rem;
  position: absolute;
  top: ${top};
  left: 1rem;
`;

export const className = styles('5rem');

export function ProgressBar(label, percentage) {
  const progressContainer = css`
    width: 15rem;
    height: 3px;
    background: #487198;
    position: relative;
  `;

  const progressBar = (width) => css`
    background: #112c42;
    width: ${width}%;
    height: 3px;
  `;

  const progressLabel = css`
    background: transparent;
    box-sizing: border-box;
    width: 100%;
    margin-top: -1.75rem;
    padding: 0 1rem;
    position: absolute;
    text-align: right;
    color: #112c42;
    font-family: 'JetBrainsMono Nerd Font';
    letter-spacing: 0.12rem;
    display: flex;
    flex-direction: row-reverse;
    justify-content: start;
    align-items: center;
    gap: 0.5rem;
  `;

  const progressLabelIcon = css`
    font-size: 1.5rem;
  `;

  return (
    <div className={progressContainer}>
      <div className={progressLabel}>
        <span>{percentage}%</span>
        <span className={progressLabelIcon}>{label}</span>
      </div>
      <div className={progressBar(percentage)} />
    </div>
  );
}

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

  return ProgressBar('\udb80\udeca', used);
};
