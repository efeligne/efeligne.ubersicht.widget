import { createWidget } from './widget-factory';
import { config } from '../../lib/config';

export default createWidget({
  cmd: "defaults read -g AppleInterfaceStyle >/dev/null 2>&1 && echo 'dark' || echo 'light'",
  refreshTimeout: config.refresh.theme,
  type: 'SET_MACOS_THEME',
  stateKey: 'theme',
});
