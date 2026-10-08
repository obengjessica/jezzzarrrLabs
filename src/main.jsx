import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './asset-overrides.css'
import './altfit-reference.css'
import './altfit-commerce.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
