import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Cars from './pages/Cars.jsx'
import CarPage from './pages/CarPage.jsx'

function App() {
  return (
      <>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/car" element={<CarPage />} />
          <Route path="/about" element={<About />} />
      </Routes>
      </>
  )
}

export default App
