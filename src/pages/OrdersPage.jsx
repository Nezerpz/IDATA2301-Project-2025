//TODO: Fetch the orders from the database and display them in a table
import OrderList from "../components/OrderList.jsx";
import useTitle from "../components/useTitle.jsx";
import React, { useState, useEffect } from 'react';
import {fetchWithAuth} from "../static/js/auth.js";

function renderPage(orders) {
    if (orders.length === 0) {
        return <text>No orders found</text>;
    } else if (orders.length >= 1) {
        return (
            <div id={"order-list"}>
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