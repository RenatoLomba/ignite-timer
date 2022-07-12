import { Play } from 'phosphor-react'

import {
  HomeContainer,
  TaskFormContainer,
  CountdownContainer,
  CountdownButton,
  TaskInput,
  MinuteAmountInput,
} from './styles'

export function Home() {
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
          <MinuteAmountInput
            placeholder="00"
            type="number"
            id="minuteAmount"
            step={5}
            min={0}
            max={60}
          />

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
