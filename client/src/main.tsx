import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Notelist from './components/Notelist.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Notelist/>
  </StrictMode>,
)
