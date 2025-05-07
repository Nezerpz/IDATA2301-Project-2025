//TODO: Fetch the orders from the database and display them in a table
import OrderList from "../../components/OrderList/OrderList.jsx";
import useTitle from "../../components/useTitle.jsx";
import React, { useState, useEffect } from 'react';
import {fetchWithAuth} from "../../static/js/auth.js";
import BackButton from "../../components/BackButton/BackButton.jsx";

function renderPage(orders) {
    const path = window.location.pathname;
    const isProvider = path.includes("provider");
    const isAdmin = path.includes("admin");

    if (orders.length === 0) {
        return <p>No orders found</p>;
    } else if (orders.length >= 1) {
        if (isProvider) {
            return (
                <div id={"order-list"}>
                    <BackButton />
                    <h1>Orders</h1>
                    <OrderList orders={orders} />
                </div>
            );
        }
        if (isAdmin) {
            return (
                <div id={"order-list"}>
                    <BackButton />
                    <h1>List of all orders</h1>
                    <OrderList orders={orders} />
                </div>
            );
        }
        return (
            <div id={"order-list"}>
                <h1>Orders</h1>
                <OrderList orders={orders} />
            </div>
        );
    }
}

function OrdersPage() {
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {

                // Determine the correct endpoint based on the current path
                const path = window.location.pathname;
                let endpoint = path.includes("provider") ? "/orders/provider" : path.includes("admin") ? "/orders" : "/orders/customer";

                // Fetch orders
                let response = await fetchWithAuth(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + endpoint);
                let data = await response.json();
                setOrders(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [window.location.pathname]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return renderPage(orders);
}

export default OrdersPage;
