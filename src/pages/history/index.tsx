import { StatusBadge } from '../../components/status-badge'
// import { useCycles } from '../../contexts/cycles'
import { HistoryContainer, HistoryListWrapper } from './styles'

export function History() {
  // const { cycles } = useCycles()

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
            <tr>
              <td>Conserto de débitos técnicos</td>
              <td>25 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <StatusBadge status="done" />
              </td>
            </tr>
            <tr>
              <td>Conserto de débitos técnicos</td>
              <td>25 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <StatusBadge status="in-progress" />
              </td>
            </tr>
            <tr>
              <td>Conserto de débitos técnicos</td>
              <td>25 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <StatusBadge status="suspended" />
              </td>
            </tr>
            <tr>
              <td>Conserto de débitos técnicos</td>
              <td>25 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <StatusBadge status="suspended" />
              </td>
            </tr>
            <tr>
              <td>Conserto de débitos técnicos</td>
              <td>25 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <StatusBadge status="done" />
              </td>
            </tr>
            <tr>
              <td>Conserto de débitos técnicos</td>
              <td>25 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td>
                <StatusBadge status="in-progress" />
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryListWrapper>
    </HistoryContainer>
  )
}
