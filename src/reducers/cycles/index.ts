import { CyclesActionTypes } from './actions'

type Cycle = {
  task: string
  minuteAmount: number
  startDate: Date
  suspendedDate?: Date
  endedDate?: Date
}

type CyclesState = {
  cycles: Map<string, Cycle>
  activeCycleId?: string | null
}

type CyclesAction =
  | {
      type: CyclesActionTypes.ADD_NEW_CYCLE
      payload: {
        newCycle: Cycle
      }
    }
  | {
      type: CyclesActionTypes.STOP_CURRENT_CYCLE
    }
  | {
      type: CyclesActionTypes.END_CURRENT_CYCLE
    }

const cyclesReducerInitialState: CyclesState = {
  cycles: new Map<string, Cycle>(),
  activeCycleId: null,
}

const cyclesReducer = (state: CyclesState, action: CyclesAction) => {
  switch (action.type) {
    case CyclesActionTypes.ADD_NEW_CYCLE:
      const { payload } = action
      const id = new Date().getTime().toString()

      return {
        ...state,
        cycles: state.cycles.set(id, payload.newCycle),
        activeCycleId: id,
      }
    case CyclesActionTypes.STOP_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.set(state.activeCycleId!, {
          ...state.cycles.get(state.activeCycleId!)!,
          suspendedDate: new Date(),
        }),
        activeCycleId: null,
      }
    case CyclesActionTypes.END_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.set(state.activeCycleId!, {
          ...state.cycles.get(state.activeCycleId!)!,
          endedDate: new Date(),
        }),
        activeCycleId: null,
      }
    default:
      return state
  }
}

export { cyclesReducer, cyclesReducerInitialState }

export type { Cycle, CyclesState, CyclesAction }
