import { produce } from 'immer'

import { CyclesActionTypes } from './actions'

type Cycle = {
  id: string
  task: string
  minuteAmount: number
  startDate: Date
  suspendedDate?: Date
  endedDate?: Date
}

type CyclesState = {
  cycles: Cycle[]
  activeCycleId?: string | null
}

type NewCycle = {
  task: string
  minuteAmount: number
}

type CyclesAction =
  | {
      type: CyclesActionTypes.ADD_NEW_CYCLE
      payload: {
        newCycle: NewCycle
      }
    }
  | {
      type: CyclesActionTypes.STOP_CURRENT_CYCLE
    }
  | {
      type: CyclesActionTypes.END_CURRENT_CYCLE
    }

const cyclesReducerInitialState: CyclesState = {
  cycles: [],
  activeCycleId: null,
}

const cyclesReducer = (state: CyclesState, action: CyclesAction) => {
  switch (action.type) {
    case CyclesActionTypes.ADD_NEW_CYCLE: {
      const { payload } = action
      const id = new Date().getTime().toString()

      return produce(state, (draft) => {
        draft.activeCycleId = id
        draft.cycles.push({ id, startDate: new Date(), ...payload.newCycle })
      })
    }
    case CyclesActionTypes.STOP_CURRENT_CYCLE: {
      return produce(state, (draft) => {
        const currentCycleIndex = state.cycles.findIndex(
          (cycle) => cycle.id === state.activeCycleId,
        )

        draft.cycles[currentCycleIndex].suspendedDate = new Date()
        draft.activeCycleId = null
      })
    }
    case CyclesActionTypes.END_CURRENT_CYCLE: {
      return produce(state, (draft) => {
        const currentCycleIndex = state.cycles.findIndex(
          (cycle) => cycle.id === state.activeCycleId,
        )

        draft.cycles[currentCycleIndex].endedDate = new Date()
        draft.activeCycleId = null
      })
    }
    default:
      return state
  }
}

export { cyclesReducer, cyclesReducerInitialState }

export type { Cycle, CyclesState, CyclesAction, NewCycle }
