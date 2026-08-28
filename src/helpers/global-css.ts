import { css } from 'uebersicht';
import { config } from '../../lib/config';

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

  .nowPlaying {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    color: ${config.colors.fg};
    font-family: 'JetBrainsMono Nerd Font', 'Courier New', monospace;
    font-size: 1rem;
    letter-spacing: 0.08rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 45vw;
    opacity: 1;
    transition: opacity 0.4s ease;
  }
  .nowPlaying.dark {
    color: ${config.colors.fgDark};
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
    height: 10px;
    margin-right: 2px;
    background: ${config.colors.fg};
    border-radius: 2px;
    transform-origin: bottom;
    animation: wave 0.5s ease-in-out infinite;
  }
  .nowPlaying.dark > ul > li {
    background: ${config.colors.fgDark};
  }

  .clock {
    color: ${config.colors.fg};
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
    color: ${config.colors.fgDark};
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
    background-color: ${config.colors.fg};
    flex-grow: 1;
    height: 2px;
    border: 0;
  }

  .clock.dark > .timeBlock > hr {
    background-color: ${config.colors.fgDark};
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
  }

  .progressBar > .track {
    position: relative;
    width: 100%;
    background: ${config.colors.track};
  }

  .progressBar.dark > .track {
    background: ${config.colors.trackDark};
  }

  .progressBar.left {
    left: 1rem;
  }

  .progressBar.right {
    right: 1rem;
  }

  .progressBar > .label {
    color: ${config.colors.fg};
    background: transparent;
    box-sizing: border-box;
    position: relative;
    padding: 0 0 0 1rem;
    text-align: right;
    font-family: 'JetBrainsMono Nerd Font';
    font-size: 1rem;
    letter-spacing: 0.12rem;
    display: flex;
    flex-direction: row-reverse;
    justify-content: start;
    align-items: center;
    gap: 1rem;
  }

  .progressBar.dark > .label {
    color: ${config.colors.fgDark};
  }

  .progressBar > .label > .icon {
    font-size: 1.25rem;
  }

  .progressBar > .label > .value {
    width: 35px;
  }

  .progressBar > .track > .bar {
    background: ${config.colors.fg};
  }

  .progressBar.dark > .track > .bar {
    background: ${config.colors.fgDark};
  }

  .weather {
    color: ${config.colors.fg};
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    font-family: 'JetBrainsMono Nerd Font', 'Courier New', monospace;
    font-size: 1rem;
    letter-spacing: 0.08rem;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .weather.dark {
    color: ${config.colors.fgDark};
  }

  .waather > .icon {
    font-size: 1.25rem;
  }
`;
