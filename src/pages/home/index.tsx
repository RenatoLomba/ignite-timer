import { Play } from 'phosphor-react'
import { useRef } from 'react'

import {
  HomeContainer,
  TaskFormContainer,
  CountdownContainer,
  CountdownButton,
  TaskInput,
  MinuteAmountInput,
  MinuteAmountInputPickerContainer,
} from './styles'

export function Home() {
  const minuteAmountInputRef = useRef<HTMLInputElement>(null)

  function increment() {
    minuteAmountInputRef.current?.stepUp()
  }

  function decrement() {
    minuteAmountInputRef.current?.stepDown()
  }

  function handleChangeMinuteAmountInput(currentAmount: number) {
    if (!minuteAmountInputRef.current) return

    if (currentAmount < 0) {
      minuteAmountInputRef.current.value = '0'
    }

    if (currentAmount > 60) {
      minuteAmountInputRef.current.value = '60'
    }
  }

  return (
    <HomeContainer>
      <form>
        <TaskFormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            type="text"
            id="task"
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Banana" />
          </datalist>

          <label htmlFor="minuteAmount">durante</label>

          <MinuteAmountInputPickerContainer>
            <button onClick={decrement} className="left" type="button">
              -
            </button>
            <MinuteAmountInput
              onChange={(e) =>
                handleChangeMinuteAmountInput(Number(e.target.value))
              }
              ref={minuteAmountInputRef}
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

          <span>minutos.</span>
        </TaskFormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>

          <span className="separator">:</span>

          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <CountdownButton type="submit">
          <Play size={24} /> Começar
        </CountdownButton>
      </form>
    </HomeContainer>
  )
}
