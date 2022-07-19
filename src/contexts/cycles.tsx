import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import superjson from 'superjson'

import {
  cyclesReducer,
  Cycle,
  cyclesReducerInitialState,
  NewCycle,
  CyclesState,
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
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return superjson.parse<CyclesState>(storedStateAsJSON)
      }

      return cyclesReducerInitialState
    },
  )

  const { activeCycleId, cycles } = cyclesState

  const activeCycle = activeCycleId
    ? cycles.find((cycle) => cycle.id === activeCycleId)
    : null

  const [secondsPassed, setSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), activeCycle.startDate)
    }

    return 0
  })

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

  useEffect(() => {
    const cyclesStateJson = superjson.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', cyclesStateJson)
  }, [cyclesState])

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
