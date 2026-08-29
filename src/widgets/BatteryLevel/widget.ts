import { config } from '@/lib/config';
import { BatteryLevel } from '@/widgets/BatteryLevel/BatteryLevel';
import { create } from '@/widgets/Factory/create';

export const batteryLevel = create({
  cmd: 'pmset -g batt | grep -Eo "\\d+%" | cut -d% -f1',
  refreshTimeout: config.refresh.batteryLevel,
  type: 'SET_BATTERY_LEVEL',
  stateKey: 'battery',
  widget: BatteryLevel,
});
