import { HandPalm, Play } from 'phosphor-react'
import { createContext, useContext, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import {
  TaskFormFields,
  taskFormSchemaValidator,
} from '../../utils/validators/task-form-validator'
import { Countdown } from './components/countdown'
import { NewCycleForm } from './components/new-cycle-form'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

type Cycle = {
  task: string
  minuteAmount: number
  startDate: Date
  suspendedDate?: Date
  endedDate?: Date
}

type CyclesContextData = {
  cycles: Map<string, Cycle>
  activeCycle?: Cycle | null
  secondsPassed: number
  endActiveCycle: () => void
  changeSecondsPassed: (seconds: number) => void
}

const CyclesContext = createContext({} as CyclesContextData)

export const useCycles = () => useContext(CyclesContext)

export function Home() {
  const [cycles, setCycles] = useState(new Map<string, Cycle>())
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [secondsPassed, setSecondsPassed] = useState(0)

  const newCycleForm = useForm<TaskFormFields>({
    resolver: zodResolver(taskFormSchemaValidator),
  })

  const { watch, handleSubmit, reset } = newCycleForm

  const activeCycle = activeCycleId ? cycles.get(activeCycleId) : null
  const hasActiveCycle = !!activeCycle

  const isSubmitDisabled = !watch('task')

  function handleCreateNewCycle(data: TaskFormFields) {
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

  function handleStopCycle() {
    setCycles((prev) => {
      const cyclesUpdated = new Map(prev.entries())
      cyclesUpdated.set(activeCycleId!, {
        ...cyclesUpdated.get(activeCycleId!)!,
        suspendedDate: new Date(),
      })
      return cyclesUpdated
    })

    setActiveCycleId(null)
    reset()
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
    reset()
  }

  function changeSecondsPassed(seconds: number) {
    setSecondsPassed(seconds)
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider
          value={{
            cycles,
            activeCycle,
            secondsPassed,
            endActiveCycle,
            changeSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <Countdown />
        </CyclesContext.Provider>

        {hasActiveCycle ? (
          <StopCountdownButton type="button" onClick={handleStopCycle}>
            <HandPalm size={24} /> Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} /> Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
