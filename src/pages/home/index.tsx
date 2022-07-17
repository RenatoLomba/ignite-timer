import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useCycles } from '../../contexts/cycles'
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

export function Home() {
  const { activeCycle, createNewCycle, stopCurrentCycle } = useCycles()

  const newCycleForm = useForm<TaskFormFields>({
    resolver: zodResolver(taskFormSchemaValidator),
  })

  const { watch, handleSubmit, reset } = newCycleForm

  const hasActiveCycle = !!activeCycle

  const isSubmitDisabled = !watch('task')

  function handleCreateNewCycle(data: TaskFormFields) {
    createNewCycle(data)
    reset()
  }

  function handleStopCycle() {
    stopCurrentCycle()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

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
