import { differenceInSeconds } from 'date-fns'
import { Play } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import {
  TaskFormFields,
  taskFormSchemaValidator,
} from '../../utils/validators/task-form-validator'
import {
  HomeContainer,
  TaskFormContainer,
  CountdownContainer,
  CountdownButton,
  TaskInput,
  MinuteAmountInput,
  MinuteAmountInputPickerContainer,
  InputContainer,
} from './styles'

type Cycle = {
  id: string
  task: string
  minuteAmount: number
  startDate: Date
}

let countdownInterval: number | null = null

export function Home() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm<TaskFormFields>({
    resolver: zodResolver(taskFormSchemaValidator),
  })

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [secondsPassed, setSecondsPassed] = useState(0)

  const isSubmitDisabled = !watch('task')

  function increment() {
    const currentMinuteAmountValue = getValues('minuteAmount') || 0
    setValue('minuteAmount', currentMinuteAmountValue + 5)
  }

  function decrement() {
    const currentMinuteAmountValue = getValues('minuteAmount') || 0
    setValue('minuteAmount', currentMinuteAmountValue - 5)
  }

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

    if (countdownInterval) {
      clearInterval(countdownInterval)
    }

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minuteAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - secondsPassed : 0

  const minuteAmount = Math.floor(currentSeconds / 60)
  const secondAmount = (currentSeconds % 60).toString().padStart(2, '0')

  const countdownMinutes = String(minuteAmount).padStart(2, '0')
  const countdownSeconds = String(secondAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      countdownInterval = setInterval(() => {
        const secondsPassedBetweenNowAndStartDate = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        setSecondsPassed(secondsPassedBetweenNowAndStartDate)
      }, 1000)
    }
  }, [activeCycle])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <TaskFormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <InputContainer>
            <TaskInput
              isError={!!errors.task}
              {...register('task', { required: true })}
              list="task-suggestions"
              placeholder="Dê um nome para o seu projeto"
              type="text"
              id="task"
            />
            {errors.task && <small>{errors.task.message}</small>}
          </InputContainer>

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Banana" />
          </datalist>

          <label htmlFor="minuteAmount">durante</label>

          <InputContainer>
            <MinuteAmountInputPickerContainer>
              <button onClick={decrement} className="left" type="button">
                -
              </button>
              <MinuteAmountInput
                isError={!!errors.minuteAmount}
                {...register('minuteAmount', {
                  required: true,
                  valueAsNumber: true,
                })}
                placeholder="00"
                type="number"
                id="minuteAmount"
                step={5}
                min={0}
                max={60}
              />
              <button onClick={increment} className="right" type="button">
                +
              </button>
            </MinuteAmountInputPickerContainer>
            {errors.minuteAmount && (
              <small>
                {errors.minuteAmount.type === 'invalid_type'
                  ? 'Obrigatório'
                  : errors.minuteAmount.message}
              </small>
            )}
          </InputContainer>

          <span>minutos.</span>
        </TaskFormContainer>

        <CountdownContainer>
          <span>{countdownMinutes[0]}</span>
          <span>{countdownMinutes[1]}</span>

          <span className="separator">:</span>

          <span>{countdownSeconds[0]}</span>
          <span>{countdownSeconds[1]}</span>
        </CountdownContainer>

        <CountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} /> Começar
        </CountdownButton>
      </form>
    </HomeContainer>
  )
}
