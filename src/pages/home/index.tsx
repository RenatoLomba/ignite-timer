import { Play } from 'phosphor-react'

import { HomeContainer, TaskFormContainer, CountdownContainer } from './styles'

export function Home() {
  return (
    <HomeContainer>
      <form>
        <TaskFormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <input
            placeholder="Dê um nome para o seu projeto"
            type="text"
            id="task"
          />

          <label htmlFor="minuteAmount">durante</label>
          <input type="number" id="minuteAmount" />

          <span>minutos.</span>
        </TaskFormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>

          <span className="separator">:</span>

          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <button type="submit">
          <Play size={24} /> Começar
        </button>
      </form>
    </HomeContainer>
  )
}
