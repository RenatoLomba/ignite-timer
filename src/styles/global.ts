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

  ::selection {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors['green-300']};
  }

  ::-moz-selection {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors['green-300']};
  }

  ::-webkit-scrollbar {
    display: block;
    width: 0.5rem;
    height: 0.5rem;
  }

  ::-webkit-scrollbar-thumb {
    background: #505059;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-corner {
    display: none;
  }

  body {
    background: ${(props) => props.theme.colors['gray-900']};
    color: ${(props) => props.theme.colors['gray-100']};
    -webkit-font-smoothing: antialiased;
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

  @media screen and (max-width: 768px) {
    html {
      font-size: 87.5%;
    }
  }
`
