import { config } from '@/lib/config';
import { DiskUsage } from '@/widgets/DiskUsage/DiskUsage';
import { create } from '@/widgets/Factory/create';

export const diskUsage = create({
  cmd: 'df -k -t apfs',
  refreshTimeout: config.refresh.diskUsage,
  type: 'SET_DISK_USAGE',
  stateKey: 'disk',
  widget: DiskUsage,
});
