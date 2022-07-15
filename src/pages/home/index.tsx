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
  id: string
  task: string
  minuteAmount: number
  startDate: Date
  suspendedDate?: Date
  endedDate?: Date
}

type CyclesContextData = {
  cycles: Cycle[]
  activeCycle?: Cycle
  secondsPassed: number
  endActiveCycle: () => void
  changeSecondsPassed: (seconds: number) => void
}

const CyclesContext = createContext({} as CyclesContextData)

export const useCycles = () => useContext(CyclesContext)

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [secondsPassed, setSecondsPassed] = useState(0)

  const newCycleForm = useForm<TaskFormFields>({
    resolver: zodResolver(taskFormSchemaValidator),
  })

  const { watch, handleSubmit, reset } = newCycleForm

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const hasActiveCycle = !!activeCycle

  const isSubmitDisabled = !watch('task')

  function handleCreateNewCycle(data: TaskFormFields) {
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minuteAmount: data.minuteAmount,
      startDate: new Date(),
    }

    setCycles((prev) => [newCycle, ...prev])
    setActiveCycleId(newCycle.id)
    setSecondsPassed(0)
  }

  function handleStopCycle() {
    setCycles((prev) =>
      prev.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, suspendedDate: new Date() }
        }

        return cycle
      }),
    )

    setActiveCycleId(null)
    reset()
  }

  function endActiveCycle() {
    setCycles((prev) =>
      prev.map((cycle) => {
        if (cycle.id === activeCycle?.id) {
          return { ...cycle, endedDate: new Date() }
        }

        return cycle
      }),
    )

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
