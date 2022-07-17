import { BrowserRouter as RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { CyclesProvider } from './contexts/cycles'
import { Router } from './router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <RouterProvider>
        <CyclesProvider>
          <Router />
        </CyclesProvider>
      </RouterProvider>

      <GlobalStyle />
    </ThemeProvider>
  )
}
