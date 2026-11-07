import type { Config } from '@/lib/config';
import { create } from '@/widgets/Factory/create';
import { WifiSignal } from '@/widgets/WifiSignal/WifiSignal';

export const createWifiSignal = (cfg: Config) =>
  create({
    cmd: "system_profiler SPAirPortDataType -detailLevel 0 | grep Signal | awk '{print $4}'",
    refreshTimeout: cfg.refresh.wifiSignal,
    type: 'SET_WIFI_SIGNAL',
    stateKey: 'wifi',
    widget: WifiSignal,
  });
