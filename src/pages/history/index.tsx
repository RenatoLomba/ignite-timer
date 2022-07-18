import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { StatusBadge } from '../../components/status-badge'
import { useCycles } from '../../contexts/cycles'
import { HistoryContainer, HistoryListWrapper } from './styles'

export function History() {
  const { cycles } = useCycles()

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryListWrapper>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[...cycles.entries()].map(([key, cycle]) => (
              <tr key={key}>
                <td>{cycle.task}</td>
                <td>{cycle.minuteAmount} minutos</td>
                <td>
                  {formatDistanceToNow(cycle.startDate, {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  <StatusBadge
                    status={
                      cycle.endedDate
                        ? 'done'
                        : cycle.suspendedDate
                        ? 'suspended'
                        : 'in-progress'
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryListWrapper>
    </HistoryContainer>
  )
}
