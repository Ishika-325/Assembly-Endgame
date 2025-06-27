import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import EndGame from './Assembly Endgame/EndGame'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EndGame />
  </StrictMode>,
)
