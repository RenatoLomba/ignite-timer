import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors['green-500']};
  }

  body {
    background: ${(props) => props.theme.colors['gray-900']};
    color: ${(props) => props.theme.colors['gray-100']};
  }

  body, input, textarea, button {
    font-family: ${(props) => props.theme.fontFamilies.roboto};
    font-weight: ${(props) => props.theme.fontWeights.regular};
    line-height: 1.6;
    font-size: ${(props) => props.theme.fontSizes.md};
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`
