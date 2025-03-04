import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Cars from './pages/Cars.jsx'
import Login from './pages/Login.jsx'
import Signup from "./pages/Signup.jsx";
import Orders from "./pages/Orders.jsx";
import Review from "./pages/Review.jsx";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/review" element={<Review />} />
      </Routes>
  )
}

export default App
