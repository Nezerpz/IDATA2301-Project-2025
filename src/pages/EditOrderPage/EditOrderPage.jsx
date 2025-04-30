import React, {useEffect, useState} from "react";
import {fetchWithAuth} from "../static/js/auth.js";
import {useParams} from "react-router-dom";


async function saveChanges(order) {
    try {
        const response = await fetchWithAuth(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/orders/" + order.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order)
        });
        if (response.status === 404) {
            throw new Error('Order not found');
        }  else if (response.status === 401) {
            throw new Error('Unauthorized');
        } else if (!response.ok) {
            throw new Error('Failed to update order');
        }
        alert("Order details updated successfully!");
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}


function renderPage(order, setOrder, customerName, providerName, orderStatuses, handleSubmit) {
    if (order === null) {
        return <p>No order found</p>;
    } else {
        return (
            <div>
                <h1>Order {order.id}</h1>
                <p>Customer of order: {customerName}</p>
                <p>Provider of order: {providerName}</p>
                <p>Dates of the order: {order.dateFrom}-{order.timeFrom} / {order.dateTo}-{order.timeTo}</p>
                <p>Price paid/To be paid: {order.pricePaid}</p>
                <p>Car {order.car.manufacturer} {order.car.carModel}</p>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Status</span>
                        <select value={order.orderStatus} onChange={(e) => setOrder({ ...order, orderStatus: e.target.value })}>
                            {orderStatuses.map((value, index) => (
                            <option key={index}>{value}</option>
                            ))}
                        </select>
                    </label>
                    <button type="submit">Save changes</button>
                </form>
            </div>
        );
    }
}

function EditOrderPage() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [customerName, setCustomerName] = useState("");
    const [providerName, setProviderName] = useState("");
    const [orderStatuses, setOrderStatuses] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let orderResponse = await fetchWithAuth(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/orders/" + id);
                let orderData = await orderResponse.json();
                setOrder(orderData);

                // Fetch the customer
                let customerResponse = await fetchWithAuth(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/users/" + orderData.customerId);
                let customerData = await customerResponse.json();
                setCustomerName(customerData.firstName + " " + customerData.lastName);

                // Fetch the provider
                let providerResponse = await fetchWithAuth(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/users/" + orderData.providerId);
                let providerData = await providerResponse.json();
                setProviderName(providerData.firstName + " " + providerData.lastName);

                let orderStatusResponse = await fetchWithAuth(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/order-statuses");
                let orderStatusData = await orderStatusResponse.json();
                setOrderStatuses(orderStatusData);
                console.log(orderStatusData);

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        saveChanges(order);
        let path = window.location.pathname;
        let pathTo = "provider";
        let isAdmin = path.includes("admin");
        if (isAdmin) {
            pathTo = "admin";
        }
        navigate(`/mypage/${pathTo}/orders`);
    };



    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        renderPage(order, setOrder, customerName, providerName, orderStatuses, handleSubmit)
    );
}


export default EditOrderPage;