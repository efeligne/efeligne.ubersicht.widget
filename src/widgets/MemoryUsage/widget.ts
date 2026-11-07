import type { Config } from '@/lib/config';
import { create } from '@/widgets/Factory/create';
import { MemoryUsage } from '@/widgets/MemoryUsage/MemoryUsage';

export const createMemoryUsage = (cfg: Config) =>
  create({
    cmd: 'memory_pressure | grep System-wide | grep -Eo "\\d+%" | cut -d% -f1',
    refreshTimeout: cfg.refresh.memoryUsage,
    type: 'SET_MEMORY_USAGE',
    stateKey: 'memory',
    widget: MemoryUsage,
  });
