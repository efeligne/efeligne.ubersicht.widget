// eslint-disable-next-line import/no-unresolved
import { css } from 'uebersicht';
import config from '../lib/config.js';

export default css`
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  position: absolute;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

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
    background: ${config.colors.foreground};
    border-radius: 2px;
    transform-origin: bottom;
    animation: wave 0.5s ease-in-out infinite;
  }
`;
