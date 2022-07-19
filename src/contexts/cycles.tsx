import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from 'react'

import {
  cyclesReducer,
  Cycle,
  cyclesReducerInitialState,
  NewCycle,
} from '../reducers/cycles'
import {
  addNewCycleAction,
  endCurrentCycleAction,
  stopCurrentCycleAction,
} from '../reducers/cycles/actions'

type CyclesContextData = {
  cycles: Cycle[]
  activeCycle?: Cycle | null
  secondsPassed: number
  createNewCycle: (data: NewCycle) => void
  changeSecondsPassed: (seconds: number) => void
  endActiveCycle: () => void
  stopCurrentCycle: () => void
}

const CyclesContext = createContext({} as CyclesContextData)

const useCycles = () => useContext(CyclesContext)

type CyclesProviderProps = {
  children: ReactNode
}

function CyclesProvider({ children }: CyclesProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    cyclesReducerInitialState,
  )

  const [secondsPassed, setSecondsPassed] = useState(0)

  const { activeCycleId, cycles } = cyclesState

  const activeCycle = activeCycleId
    ? cycles.find((cycle) => cycle.id === activeCycleId)
    : null

  function createNewCycle(data: NewCycle) {
    dispatch(addNewCycleAction(data))
    setSecondsPassed(0)
  }

  function stopCurrentCycle() {
    dispatch(stopCurrentCycleAction())
  }

  function endActiveCycle() {
    dispatch(endCurrentCycleAction())
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
