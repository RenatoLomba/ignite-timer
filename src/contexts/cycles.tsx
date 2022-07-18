import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from 'react'

type Cycle = {
  task: string
  minuteAmount: number
  startDate: Date
  suspendedDate?: Date
  endedDate?: Date
}

type CreateNewCycleParams = {
  task: string
  minuteAmount: number
}

type CyclesContextData = {
  cycles: Map<string, Cycle>
  activeCycle?: Cycle | null
  secondsPassed: number
  createNewCycle: (data: CreateNewCycleParams) => void
  changeSecondsPassed: (seconds: number) => void
  endActiveCycle: () => void
  stopCurrentCycle: () => void
}

const CyclesContext = createContext({} as CyclesContextData)

const useCycles = () => useContext(CyclesContext)

type CyclesProviderProps = {
  children: ReactNode
}

type CyclesState = {
  cycles: Map<string, Cycle>
  activeCycleId?: string | null
}

function CyclesProvider({ children }: CyclesProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case 'ADD_NEW_CYCLE':
          const { payload } = action
          const id = new Date().getTime().toString()

          return {
            ...state,
            cycles: state.cycles.set(id, payload.newCycle),
            activeCycleId: id,
          }
        case 'STOP_CURRENT_CYCLE':
          return {
            ...state,
            cycles: state.cycles.set(state.activeCycleId!, {
              ...state.cycles.get(state.activeCycleId!)!,
              suspendedDate: new Date(),
            }),
            activeCycleId: null,
          }
        case 'END_CURRENT_CYCLE':
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
    },
    {
      cycles: new Map<string, Cycle>(),
      activeCycleId: null,
    },
  )

  const [secondsPassed, setSecondsPassed] = useState(0)

  const { activeCycleId, cycles } = cyclesState

  const activeCycle = activeCycleId ? cycles.get(activeCycleId) : null

  function createNewCycle(data: CreateNewCycleParams) {
    const newCycle: Cycle = {
      task: data.task,
      minuteAmount: data.minuteAmount,
      startDate: new Date(),
    }

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })
    setSecondsPassed(0)
  }

  function stopCurrentCycle() {
    dispatch({
      type: 'STOP_CURRENT_CYCLE',
    })
  }

  function endActiveCycle() {
    dispatch({
      type: 'END_CURRENT_CYCLE',
    })
  }

  function changeSecondsPassed(seconds: number) {
    setSecondsPassed(seconds)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        secondsPassed,
        createNewCycle,
        endActiveCycle,
        stopCurrentCycle,
        changeSecondsPassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}

export { CyclesContext, CyclesProvider, useCycles }
export type { Cycle, CyclesContextData }
