import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import CarsPage from './pages/CarsPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from "./pages/SignupPage.jsx";
import ReviewPage from "./pages/ReviewPage.jsx";
import MyPage from "./pages/MyPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import ManageOwnedCarsPage from "./pages/ManageOwnedCarsPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import AddNewCar from "./components/AddNewCar.jsx";
import App from "./App.jsx";
import EditCarPage from "./pages/EditCarPage.jsx";

const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: '/cars',
                element: <CarsPage />
            },
            {
                path: '/about',
                element: <AboutPage />
            },
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/signup',
                element: <SignupPage />
            },
            {
                path: '/mypage/*',
                element: <MyPage />,
                children: [
                    {
                        path: "orders",
                        element: <OrdersPage />,
                    },
                    {
                        path: "review",
                        element: <ReviewPage />
                    },
                    {
                        path: "admin",
                        children: [
                            {
                                path: "users",
                                element: <UsersPage />,
                            },
                            {
                                path: "users/:id",
                                element: <UserPage />,
                            },
                            {
                                path: "cars",
                                element: <ManageOwnedCarsPage />,
                            },
                            {
                                path: "orders",
                                element: <OrdersPage />
                            }
                        ]
                    },
                    {
                        path: "settings",
                        element: <SettingsPage />,
                    },
                    {
                        path: "provider",
                        children: [
                            {
                                index: true,
                                element: <ManageOwnedCarsPage />
                            },
                            {
                                path: "cars",
                                element: <ManageOwnedCarsPage />
                            },
                            {
                                path: "cars/add",
                                element: <AddNewCar />
                            },
                            {
                                path: "cars/edit/:id",
                                element: <EditCarPage />
                            },
                            {
                                path:"orders",
                                element: <OrdersPage />
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);

export default function  BrowserRouter() {
    return (<RouterProvider router={router} />)
}
