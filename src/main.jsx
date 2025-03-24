import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './static/css/index.css'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Cars from './pages/Cars.jsx'
import Login from './pages/Login.jsx'
import Signup from "./pages/Signup.jsx";
import Review from "./pages/Review.jsx";
import MyPage from "./pages/MyPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import User from "./components/User.jsx";
import ManageOwnedCars from "./components/ManageOwnedCars.jsx";
import Settings from "./pages/Settings.jsx";
import Users from "./components/Users.jsx";
import Orders from "./pages/Orders.jsx";
import ProviderSettings from "./components/ProviderSettings.jsx";
import AddNewCar from "./components/AddNewCar.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <NotFound />
    },
    {
        path: '/cars',
        element: <Cars />
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
    {
        path: '/review',
        element: <Review />
    },
    {
        path: '/mypage/*',
        element: <MyPage />,
        children: [
            {
                path: "orders",
                element: <Orders />,
                children:[
                    {
                        path: "review",
                        element: <Review />
                    }
                ]
            },
            {
                path: "users",
                element: <Users />
            },
            {
                path: "settings",
                element: <Settings />,
                children: [
                    {
                        path: "provider",
                        element: <ProviderSettings />,
                        children: [
                            {
                                index: true,
                                path: "cars",
                                element: <ManageOwnedCars />
                            },
                            {
                                path: "add",
                                element: <AddNewCar />
                            }
                        ]
                    }
                ]
            }
        ]
    },
    //TODO: Temp solution to the routing problem. User will be under edit admin users...
    {
        path: '/user',
        element: <User />
    }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
