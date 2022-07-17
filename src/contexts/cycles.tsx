import { createContext, ReactNode, useContext, useState } from 'react'

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

function CyclesProvider({ children }: CyclesProviderProps) {
  const [cycles, setCycles] = useState(new Map<string, Cycle>())
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [secondsPassed, setSecondsPassed] = useState(0)

  const activeCycle = activeCycleId ? cycles.get(activeCycleId) : null

  function createNewCycle(data: CreateNewCycleParams) {
    const id = new Date().getTime().toString()

    const newCycle: Cycle = {
      task: data.task,
      minuteAmount: data.minuteAmount,
      startDate: new Date(),
    }

    setCycles((prev) => {
      const updatedCycles = new Map(prev.entries())
      updatedCycles.set(id, newCycle)
      return updatedCycles
    })
    setActiveCycleId(id)
    setSecondsPassed(0)
  }

  function stopCurrentCycle() {
    setCycles((prev) => {
      const cyclesUpdated = new Map(prev.entries())
      cyclesUpdated.set(activeCycleId!, {
        ...cyclesUpdated.get(activeCycleId!)!,
        suspendedDate: new Date(),
      })
      return cyclesUpdated
    })

    setActiveCycleId(null)
  }

  function endActiveCycle() {
    setCycles((prev) => {
      const cyclesUpdated = new Map(prev.entries())
      cyclesUpdated.set(activeCycleId!, {
        ...cyclesUpdated.get(activeCycleId!)!,
        endedDate: new Date(),
      })
      return cyclesUpdated
    })

    setActiveCycleId(null)
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
