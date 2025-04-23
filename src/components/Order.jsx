import PropTypes from 'prop-types';
import React, {useEffect, useState} from "react";
import ReviewPage from "../pages/ReviewPage.jsx";
import useTitle from "./useTitle.jsx";
import {fetchWithAuth} from "../static/js/auth.js";

//TODO: Implement logic to show a different button depending on the user's role in the order.
// If the user is a customer in the order, show a button to review the car, and provider.
// If the user is a provider in the order, show a button to review the customer (Might be more relevant to have in the provider menu).

//TODO: Dynamically change names for the orders based on car in them.

function Order(order) {
    order = order["order"];
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response = await fetchWithAuth(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/cars/" + order.carId);
                let data = await response.json();
                setCar(data);
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

    return renderComponent({order, car});
}

function renderComponent ({order, car}) {
    return (
        <li className="order">
            <details>
                <summary>
                    <div className={"row"}>
                        <div className={"order-header col-8"}>
                            <h4>{car.manufacturer} {car.carModel}</h4>
                        </div>
                        <div className={"col-4 button-container flex-container-row"}>
                            <text>Review: </text>
                            <button onClick={() => {
                                <ReviewPage order = {order} type={"car"}/>
                                /*TODO: Implement logic to redirect to review page for specific car*/
                            }}>
                                Car
                            </button>
                            <button onClick={() => {
                                <ReviewPage order = {order} type={"provider"}/>
                                /*TODO: Implement logic to redirect to review page for specific provider*/
                            }}>

                                Provider
                            </button>
                        </div>
                    </div>
                </summary>
            <div className={"row"}>
                <ul>
                    <li><strong>Order nr: </strong> {order.id}</li>
                    <li><strong>Start: </strong> {order.dateFrom} | {order.timeFrom}</li>
                    <li><strong>End: </strong> {order.dateTo} | {order.timeTo}</li>
                    <li><strong>Paid: </strong> {order.pricePaid}</li>
                    <li><strong>Status: </strong> {order.orderStatus ? 'Ongoing' : 'Complete'}</li>
                </ul>
            </div>
            </details>
        </li>
    )
}

export default Order
