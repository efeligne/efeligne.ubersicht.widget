// eslint-disable-next-line import/no-unresolved
import { React, css } from 'uebersicht';

export const refreshFrequency = 5000;

export const command = `efeligne.ubersicht.widget/now-playing.sh`;

export const className = css`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  color: #111111;
  font-family: 'JetBrainsMono Nerd Font', 'Courier New', monospace;
  font-size: 0.85rem;
  letter-spacing: 0.08rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 45vw;

  @keyframes wave {
    0%,
    100% {
      transform: scaleY(0.4);
    }
    50% {
      transform: scaleY(1.2);
    }
  }

  .bars {
    display: inline-block;
    vertical-align: middle;
    margin-right: 4px;
  }

  .bar {
    display: inline-block;
    width: 3px;
    height: 10px;
    margin-right: 2px;
    background: #111111;
    border-radius: 2px;
    transform-origin: bottom;
    animation: wave 0.5s ease-in-out infinite;
  }
`;

export const render = ({ output }) => {
  const track = output ? output.trim() : '';
  if (!track) return null;
  return (
    <span style={{ opacity: 1, transition: 'opacity 0.4s ease' }}>
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
};
