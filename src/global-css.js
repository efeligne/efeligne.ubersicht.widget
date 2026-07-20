// eslint-disable-next-line import/no-unresolved
import { css } from 'uebersicht';

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
`;
