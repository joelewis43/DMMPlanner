import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import '@mantine/core/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/index.css'
import '../style/App.css'
import '../style/Route.css'
import '../style/Container.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
