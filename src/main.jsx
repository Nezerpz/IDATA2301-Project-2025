import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import './static/css/index.css'
import BrowserRouter from "./BrowserRouter.jsx";



createRoot(document.getElementById('root')).render(
  <StrictMode>
          <App/>
  </StrictMode>,
)
