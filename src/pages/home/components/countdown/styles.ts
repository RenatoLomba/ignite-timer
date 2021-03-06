import styled from 'styled-components'

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

  @media screen and (max-width: 768px) {
    font-size: 5rem;
    line-height: 4rem;

    span.separator {
      width: 2rem;
    }
  }

  @media screen and (max-width: 465px) {
    font-size: 2.5rem;
    line-height: 2rem;

    span.separator {
      width: 1rem;
    }
  }
`
