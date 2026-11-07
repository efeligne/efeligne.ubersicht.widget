import { css } from 'uebersicht';

export const styles = css`
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

  .nowPlaying {
    position: absolute;
    bottom: calc(1rem + var(--dock-bottom-extra, 0px));
    left: calc(1rem + var(--dock-left-extra, 0px));
    color: var(--fg);
    font-family: 'JetBrainsMono Nerd Font', 'Courier New', monospace;
    font-size: 1rem;
    letter-spacing: 0.08rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 45vw;
    opacity: 1;
    transition:
      opacity 0.4s ease,
      bottom 0.3s ease,
      left 0.3s ease;
  }
  .nowPlaying.dark {
    color: var(--fg-dark);
  }

  .nowPlaying > ul {
    display: inline-block;
    vertical-align: middle;
    padding: 0;
    margin: 0 4px 0 0;
    list-style: none;
  }

  .nowPlaying > ul > li {
    display: inline-block;
    width: 3px;
    height: 2px;
    margin-right: 2px;
    background: var(--fg);
    border-radius: 2px;
    transform-origin: bottom;
  }
  .nowPlaying.playing > ul > li {
    height: 10px;
    animation: wave 0.5s ease-in-out infinite;
  }
  .nowPlaying.dark > ul > li {
    background: var(--fg-dark);
  }

  .clock {
    color: var(--fg);
    font-family: 'Snell Roundhand';
    font-size: 2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 26rem;
    height: 15rem;
    top: 2rem;
    left: calc(50% - 13.05rem);
    border-radius: 1rem;
  }

  .clock.dark {
    color: var(--fg-dark);
  }

  .clock > .dayName {
    letter-spacing: 0.25rem;
    font-size: 4rem;
    font-family: 'New York';
    padding-left: 0.3rem;
  }

  .clock > .timeBlock {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    gap: 1rem;
    margin-top: 0.5rem;
    font-family: 'Courier New';
  }

  .clock > .timeBlock > hr {
    background-color: var(--fg);
    flex-grow: 1;
    height: 2px;
    border: 0;
  }

  .clock.dark > .timeBlock > hr {
    background-color: var(--fg-dark);
  }

  .clock > .timeBlock .colon {
    font-family: 'Courier New';
    animation: blink 1s linear infinite;
  }

  .progressBar {
    border-radius: 1rem;
    position: absolute;
    width: 15rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: auto;
    gap: 1rem;
    transition:
      left 0.3s ease,
      right 0.3s ease;
  }

  .progressBar > .track {
    position: relative;
    width: 100%;
    background: var(--track);
  }

  .progressBar.dark > .track {
    background: var(--track-dark);
  }

  .progressBar.left {
    left: calc(1rem + var(--dock-left-extra, 0px));
  }

  .progressBar.right {
    right: calc(1rem + var(--dock-right-extra, 0px));
  }

  .progressBar > .label {
    color: var(--fg);
    background: transparent;
    box-sizing: border-box;
    position: relative;
    text-align: right;
    font-family: 'JetBrainsMono Nerd Font';
    font-size: 1rem;
    letter-spacing: 0.12rem;
    display: flex;
    flex-direction: row-reverse;
    justify-content: start;
    align-items: center;
    gap: 0.75rem;
  }

  .progressBar.dark > .label {
    color: var(--fg-dark);
  }

  .progressBar > .label > .icon {
    display: flex;
    align-items: center;
  }

  .progressBar > .label > .icon > svg {
    display: block;
    width: 1.25rem;
    height: 1.25rem;
  }

  .progressBar > .label > .value {
    width: 35px;
  }

  .progressBar > .track > .bar {
    background: var(--fg);
  }

  .progressBar.dark > .track > .bar {
    background: var(--fg-dark);
  }

  .weather {
    color: var(--fg);
    position: absolute;
    bottom: calc(1rem + var(--dock-bottom-extra, 0px));
    right: calc(1rem + var(--dock-right-extra, 0px));
    font-family: 'JetBrainsMono Nerd Font', 'Courier New', monospace;
    font-size: 1rem;
    letter-spacing: 0.08rem;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    transition:
      bottom 0.3s ease,
      right 0.3s ease;
  }

  .weather.dark {
    color: var(--fg-dark);
  }

  .weather > .icon {
    display: flex;
    align-items: center;
  }

  .weather > .icon > svg {
    display: block;
    width: 1.25rem;
    height: 1.25rem;
  }
`;
