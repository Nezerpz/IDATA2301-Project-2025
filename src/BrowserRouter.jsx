import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from './pages/HomePage/HomePage.jsx'
import AboutPage from './pages/AboutPage/AboutPage.jsx'
import CarsPage from './pages/CarsPage/CarsPage.jsx'
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import ReviewPage from "./pages/ReviewPage/ReviewPage.jsx";
import MyPage from "./pages/MyPage/MyPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import UserPage from "./pages/UserPage/UserPage.jsx";
import ManageOwnedCarsPage from "./pages/ManageOwnedCarsPage/ManageOwnedCarsPage.jsx";
import SettingsPage from "./pages/SettingsPage/SettingsPage.jsx";
import UsersPage from "./pages/UsersPage/UsersPage.jsx";
import OrdersPage from "./pages/OrdersPage/OrdersPage.jsx";
import AddNewCar from "./pages/ManageOwnedCarsPage/AddNewCar.jsx";
import App from "./App.jsx";
import EditCarPage from "./pages/EditCarPage/EditCarPage.jsx";
import EditOrderPage from "./pages/EditOrderPage/EditOrderPage.jsx";
import ProviderPage from "./pages/ProviderPage/ProviderPage.jsx";
import AdminPage from "./pages/AdminPage/AdminPage.jsx";

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
                                index: true,
                                element: <AdminPage />,
                            },
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
                                path: "cars/edit/:id",
                                element: <EditCarPage />
                            },
                            {
                                path: "orders",
                                element: <OrdersPage />,
                            },
                            {
                                path: "orders/edit/:id",
                                element: <EditOrderPage />
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
                                element: <ProviderPage />
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
                            },
                            {
                                path: "orders/edit/:id",
                                element: <EditOrderPage />
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
