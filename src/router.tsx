import { Routes, Route } from 'react-router-dom'

import { History } from './pages/history'
import { Home } from './pages/home'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History />} />
    </Routes>
  )
}
