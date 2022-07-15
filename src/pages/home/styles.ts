import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

const CountdownButton = styled.button`
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: ${(props) => props.theme.radius.md};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  cursor: pointer;
  color: ${(props) => props.theme.colors['gray-100']};
  transition: background 0.2s ease;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountdownButton = styled(CountdownButton)`
  background: ${(props) => props.theme.colors['green-500']};

  &:hover:not(:disabled) {
    background: ${(props) => props.theme.colors['green-700']};
  }
`

export const StopCountdownButton = styled(CountdownButton)`
  background: ${(props) => props.theme.colors['red-500']};

  &:hover:not(:disabled) {
    background: ${(props) => props.theme.colors['red-700']};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors['red-500']};
  }
`
