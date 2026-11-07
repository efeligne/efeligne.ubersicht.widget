import { run } from 'uebersicht';
import type { Dispatch } from '@/helpers/dispatcher';
import type { Config } from '@/lib/config';
import { create } from '@/widgets/Factory/create';

const CMD = 'defaults read com.apple.dock';
const TYPE = 'SET_DOCK';
const ORIENTATION_KEY = 'orientation';

const runner = (dispatch: Dispatch) => {
  run(CMD).then((output) => {
    if (output.includes(ORIENTATION_KEY)) {
      dispatch({ type: TYPE, data: output.trim() });
    }
  });
};

export const createDock = (cfg: Config) =>
  create({
    cmd: CMD,
    refreshTimeout: cfg.refresh.docksSize,
    type: TYPE,
    stateKey: 'dock',
    runner,
  });
