import styled from 'styled-components'

export const DefaultLayoutContainer = styled.div`
  max-width: 74rem;
  width: 100%;
  height: calc(100vh - 10rem);
  margin: 5rem auto;
  padding: 2.5rem;
  background: ${(props) => props.theme.colors['gray-800']};
  border-radius: ${(props) => props.theme.radius.md};
  display: flex;
  flex-direction: column;
`
