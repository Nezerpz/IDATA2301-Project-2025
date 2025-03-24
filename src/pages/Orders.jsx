//TODO: Fetch the orders from the database and display them in a table
import OrderList from "../components/OrderList.jsx";
import useTitle from "../components/useTitle.jsx";
import React, { useState, useEffect } from 'react';

function renderPage(orders) {
  return (
    <div className={"row"}>
            <div className={"col-1"}></div>
            <div className={"col-10"}>
                <div id={"order-list"}>
                    <OrderList orders={orders} />
                </div>
            </div>
            <div className={"col-1"}></div>
    </div>
  );
}

function Orders(){
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response = await fetch(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/orders");
                let data = await response.json();
                setOrders(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return renderPage(orders);


}

export default Orders;