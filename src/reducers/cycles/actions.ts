import type { CyclesAction, NewCycle } from '.'

export enum CyclesActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  STOP_CURRENT_CYCLE = 'STOP_CURRENT_CYCLE',
  END_CURRENT_CYCLE = 'END_CURRENT_CYCLE',
}

export function addNewCycleAction(newCycle: NewCycle): CyclesAction {
  return {
    type: CyclesActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function stopCurrentCycleAction(): CyclesAction {
  return {
    type: CyclesActionTypes.STOP_CURRENT_CYCLE,
  }
}

export function endCurrentCycleAction(): CyclesAction {
  return {
    type: CyclesActionTypes.END_CURRENT_CYCLE,
  }
}
