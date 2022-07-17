import { FC } from 'react'
import { useFormContext } from 'react-hook-form'

import { useCycles } from '../../../../contexts/cycles'
import {
  TaskFormFields,
  MIN_CYCLE_MINUTES,
  MAX_CYCLE_MINUTES,
} from '../../../../utils/validators/task-form-validator'
import {
  InputContainer,
  MinuteAmountInput,
  MinuteAmountInputPickerContainer,
  NewCycleFormContainer,
  TaskInput,
} from './styles'

const MINUTES_STEP_INCREMENT_NUMBER = 5

export const NewCycleForm: FC = () => {
  const { activeCycle } = useCycles()
  const hasActiveCycle = !!activeCycle

  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<TaskFormFields>()

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

  return (
    <NewCycleFormContainer>
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
    </NewCycleFormContainer>
  )
}
