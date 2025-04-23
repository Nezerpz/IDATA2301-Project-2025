import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './static/css/index.css'
import BrowserRouter from "./BrowserRouter.jsx";



createRoot(document.getElementById('root')).render(
  <StrictMode>
          <BrowserRouter/>
  </StrictMode>,
)
