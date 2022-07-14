import { differenceInSeconds } from 'date-fns'
import { HandPalm, Play } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import {
  TaskFormFields,
  taskFormSchemaValidator,
  MIN_CYCLE_MINUTES,
  MAX_CYCLE_MINUTES,
} from '../../utils/validators/task-form-validator'
import {
  StopCountdownButton,
  StartCountdownButton,
} from './components/countdown-button'
import {
  HomeContainer,
  TaskFormContainer,
  CountdownContainer,
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
  suspendedDate?: Date
  endedDate?: Date
}

const SECONDS_ON_A_MINUTE = 60
const MINUTES_STEP_INCREMENT_NUMBER = 5

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
    setValue(
      'minuteAmount',
      currentMinuteAmountValue + MINUTES_STEP_INCREMENT_NUMBER,
    )
  }

  function decrement() {
    const currentMinuteAmountValue = getValues('minuteAmount') || 0
    setValue(
      'minuteAmount',
      currentMinuteAmountValue - MINUTES_STEP_INCREMENT_NUMBER,
    )
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

    reset()
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
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const hasActiveCycle = !!activeCycle

  const totalSeconds = hasActiveCycle
    ? activeCycle.minuteAmount * SECONDS_ON_A_MINUTE
    : 0
  const currentSeconds = hasActiveCycle ? totalSeconds - secondsPassed : 0

  const minuteAmount = Math.floor(currentSeconds / SECONDS_ON_A_MINUTE)
  const secondAmount = (currentSeconds % SECONDS_ON_A_MINUTE)
    .toString()
    .padStart(2, '0')

  const countdownMinutes = String(minuteAmount).padStart(2, '0')
  const countdownSeconds = String(secondAmount).padStart(2, '0')

  useEffect(() => {
    let countdownInterval: number

    if (activeCycle) {
      countdownInterval = setInterval(() => {
        const secondsPassedFromStart = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsPassedFromStart >= totalSeconds) {
          setCycles((prev) =>
            prev.map((cycle) => {
              if (cycle.id === activeCycle.id) {
                return { ...cycle, endedDate: new Date() }
              }

              return cycle
            }),
          )

          setActiveCycleId(null)
        } else {
          setSecondsPassed(secondsPassedFromStart)
        }
      }, 1000)
    }

    return () => {
      clearInterval(countdownInterval!)
    }
  }, [activeCycle, totalSeconds])

  useEffect(() => {
    if (!activeCycle) return

    document.title = `${countdownMinutes}:${countdownSeconds} - ${activeCycle.task} | Ignite Timer`

    return () => {
      document.title = 'Ignite Timer'
    }
  }, [countdownMinutes, countdownSeconds, activeCycle])

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
              disabled={hasActiveCycle}
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
              {!hasActiveCycle && (
                <button onClick={decrement} className="left" type="button">
                  -
                </button>
              )}
              <MinuteAmountInput
                isError={!!errors.minuteAmount}
                {...register('minuteAmount', {
                  valueAsNumber: true,
                })}
                placeholder="00"
                disabled={hasActiveCycle}
                type="number"
                id="minuteAmount"
                step={MINUTES_STEP_INCREMENT_NUMBER}
                min={MIN_CYCLE_MINUTES}
                max={MAX_CYCLE_MINUTES}
              />
              {!hasActiveCycle && (
                <button onClick={increment} className="right" type="button">
                  +
                </button>
              )}
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
