import { config } from '@/lib/config';
import { create } from '@/widgets/Factory/create';

export const theme = create({
  cmd: "defaults read -g AppleInterfaceStyle >/dev/null 2>&1 && echo 'dark' || echo 'light'",
  refreshTimeout: config.refresh.theme,
  type: 'SET_MACOS_THEME',
  stateKey: 'theme',
});
