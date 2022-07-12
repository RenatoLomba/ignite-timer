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
            placeholder="Dê um nome para o seu projeto"
            type="text"
            id="task"
          />

          <label htmlFor="minuteAmount">durante</label>
          <MinuteAmountInput placeholder="00" type="number" id="minuteAmount" />

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
