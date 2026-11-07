import type { Config } from '@/lib/config';
import { DiskUsage } from '@/widgets/DiskUsage/DiskUsage';
import { create } from '@/widgets/Factory/create';

export const createDiskUsage = (cfg: Config) =>
  create({
    cmd: 'df -k -t apfs',
    refreshTimeout: cfg.refresh.diskUsage,
    type: 'SET_DISK_USAGE',
    stateKey: 'disk',
    widget: DiskUsage,
  });
