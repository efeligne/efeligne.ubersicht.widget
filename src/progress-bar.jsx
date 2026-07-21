// eslint-disable-next-line import/no-unresolved
import { React } from 'uebersicht';

function ProgressBar({ label, percentage, top, side = 'left' }) {
  const isValid = typeof percentage === 'number' && !Number.isNaN(percentage);
  const displayValue = isValid ? `${percentage}%` : percentage;
  const width = isValid ? percentage : 0;

  const containerStyle = {
    background: '#777777',
    borderRadius: '1rem',
    position: 'absolute',
    top,
    right: side === 'right' ? '1rem' : 'unset',
    left: side === 'left' ? '1rem' : 'unset',
    width: '15rem',
    height: '3px',
  };

  const barStyle = {
    background: '#111111',
    width: `${width}%`,
    height: '3px',
  };

  const labelStyle = {
    background: 'transparent',
    boxSizing: 'border-box',
    width: '100%',
    marginTop: '-1.75rem',
    padding: '0 1rem',
    position: 'absolute',
    textAlign: 'right',
    color: '#111111',
    fontFamily: "'JetBrainsMono Nerd Font'",
    letterSpacing: '0.12rem',
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'start',
    alignItems: 'center',
    gap: '1rem',
  };

  const iconStyle = {
    fontSize: '1.5rem',
  };

  return (
    <div style={containerStyle}>
      <div style={labelStyle}>
        <span>{displayValue}</span>
        <span style={iconStyle}>{label}</span>
      </div>
      <div style={barStyle} />
    </div>
  );
}

export default React.memo(ProgressBar);
