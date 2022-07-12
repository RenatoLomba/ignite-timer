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

export const TaskFormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  flex-wrap: wrap;

  input {
    background: transparent;
    border: 0;
    border-bottom: 2px solid ${(props) => props.theme.colors['gray-500']};
    padding: 0.5rem 0.5rem 0.25rem;
    color: ${(props) => props.theme.colors['gray-100']};
    font-size: ${(props) => props.theme.fontSizes.lg};

    &::placeholder {
      font-size: ${(props) => props.theme.fontSizes.lg};
      color: ${(props) => props.theme.colors['gray-500']};
      font-weight: ${(props) => props.theme.fontWeights.bold};
    }
  }
`

export const CountdownContainer = styled.div`
  font-family: ${(props) => props.theme.fontFamilies['roboto-mono']};
  font-size: 10rem;
  line-height: 8rem;
  color: ${(props) => props.theme.colors['gray-100']};
  display: flex;
  gap: 1rem;

  span {
    background: ${(props) => props.theme.colors['gray-700']};
    padding: 2rem 1rem;
    border-radius: ${(props) => props.theme.radius.md};
  }

  span.separator {
    padding: 2rem 0;
    color: ${(props) => props.theme.colors['green-500']};
    width: 4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
    background: transparent;
  }
`
