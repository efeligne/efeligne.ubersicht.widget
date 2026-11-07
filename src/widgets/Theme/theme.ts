import type { Config } from '@/lib/config';
import { create } from '@/widgets/Factory/create';

export const createTheme = (cfg: Config) =>
  create({
    cmd: "defaults read -g AppleInterfaceStyle >/dev/null 2>&1 && echo 'dark' || echo 'light'",
    refreshTimeout: cfg.refresh.theme,
    type: 'SET_MACOS_THEME',
    stateKey: 'theme',
  });
