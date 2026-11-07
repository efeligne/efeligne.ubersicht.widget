import type { Config } from '@/lib/config';
import { CpuUsage } from '@/widgets/CpuUsage/CpuUsage';
import { create } from '@/widgets/Factory/create';

export const createCpuUsage = (cfg: Config) =>
  create({
    cmd: `top -l 2 -n 0 2>/dev/null | awk '/^CPU/{if(++c==2) printf "%.0f\\n", $3+$5}'`,
    refreshTimeout: cfg.refresh.cpuUsage,
    type: 'SET_CPU_USAGE',
    stateKey: 'cpu',
    widget: CpuUsage,
  });
