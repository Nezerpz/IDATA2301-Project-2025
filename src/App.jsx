import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Cars from './pages/Cars.jsx'
import Login from './pages/Login.jsx'
import Signup from "./pages/Signup.jsx";
import Orders from "./pages/Orders.jsx";
import Review from "./pages/Review.jsx";
import MyPage from "./pages/MyPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import User from "./components/User.jsx";

//TODO: DO THIS https://www.youtube.com/watch?v=oTIJunBa6MA&t=1334s
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
          <Route path="/mypage/*" element={<MyPage />} />
          <Route path="/user" element={<User />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
  )
}

export default App
