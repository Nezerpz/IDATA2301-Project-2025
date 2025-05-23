import React, {useEffect, useState} from "react";
import {fetchWithAuth} from "../../static/js/auth.js";
import {useNavigate, useParams} from "react-router-dom";
import "./EditOrderPage.css"
import Select from "react-select";


async function saveChanges(order) {
    try {
        const response = await fetchWithAuth("/orders/" + order.id, {
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
        } else if (response.status === 400) {
            throw new Error('You cannot change the order status once an order has been completed or cancelled. ' +
                'If you accidentally closed or cancelled the order, please contact us.');
        } else if (!response.ok) {
            throw new Error('Failed to update order');
        }
        alert("Order details updated successfully!");
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}


function renderPage(order, setOrder, customerName, providerName, orderStatuses, handleSubmit) {
    const options = orderStatuses != null
        ? orderStatuses.map(f => ({value: f, label: f}))
        : [];
    if (order === null) {
        return <p>No order found</p>;
    } else {
        return (
            <>
                <h1>Order {order.id}</h1>
                <form className={"edit-order-page"} onSubmit={handleSubmit}>
                    <label>
                        <h5 className={"edit-order-page-header"}>Customer:</h5>
                        <p className={"edit-order-page-paragraph"}>{customerName}</p>
                    </label>
                    <label>
                        <h5 className={"edit-order-page-header"}>Provider:</h5>
                        <p className={"edit-order-page-paragraph"}>{providerName}</p>
                    </label>
                    <label>
                        <h5 className={"edit-order-page-header"}>Rental period:</h5>
                        <p className={"edit-order-page-paragraph"}>{order.dateFrom}-{order.timeFrom} / {order.dateTo}-{order.timeTo}</p>
                    </label>
                    <label>
                        <h5 className={"edit-order-page-header"}>Price:</h5>
                        <p className={"edit-order-page-paragraph"}>{order.pricePaid}</p>
                    </label>
                    <label>
                        <h5 className={"edit-order-page-header"}>Order number:</h5>
                        <p className={"edit-order-page-paragraph"}>{order.id}</p>
                    </label>
                    <label>
                        <h5 className={"edit-order-page-header"}>Status</h5>
                        <Select
                            className={"react-select"}
                            options={options}
                            value={options.filter(option => option.value === order.orderStatus)}
                            onChange={selectedOption => {
                                setOrder({...order, orderStatus: selectedOption.value});
                            }}
                        />
                    </label>
                    <button type="submit" className={"big-button"}>Save changes</button>
                </form>
            </>
        );
    }
}

function EditOrderPage() {
    const navigate = useNavigate();
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
                let orderResponse = await fetchWithAuth("/orders/" + id);
                let orderData = await orderResponse.json();
                setOrder(orderData);

                // Fetch the customer
                let customerResponse = await fetchWithAuth("/users/name/" + orderData.customerId);
                let customerData = await customerResponse.json();
                setCustomerName(customerData.name);

                // Fetch the provider
                let providerResponse = await fetchWithAuth("/users/name/" + orderData.providerId);
                let providerData = await providerResponse.json();
                setProviderName(providerData.name);

                let orderStatusResponse = await fetchWithAuth("/order-statuses");
                let orderStatusData = await orderStatusResponse.json();
                setOrderStatuses(orderStatusData);

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
