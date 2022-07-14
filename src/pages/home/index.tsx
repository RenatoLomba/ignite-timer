import { Play } from 'phosphor-react'
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

export function Home() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<TaskFormFields>({
    resolver: zodResolver(taskFormSchemaValidator),
  })

  function increment() {
    const currentMinuteAmountValue = getValues('minuteAmount') || 0
    setValue('minuteAmount', currentMinuteAmountValue + 5)
  }

  function decrement() {
    const currentMinuteAmountValue = getValues('minuteAmount') || 0
    setValue('minuteAmount', currentMinuteAmountValue - 5)
  }

  function handleCreateNewCycle(data: TaskFormFields) {
    console.log(data)
  }

  const isSubmitDisabled = !watch('task')

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
          <span>0</span>
          <span>0</span>

          <span className="separator">:</span>

          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <CountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} /> Começar
        </CountdownButton>
      </form>
    </HomeContainer>
  )
}
