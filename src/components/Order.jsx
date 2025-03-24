import PropTypes from 'prop-types';
import React from "react";
import Review from "../pages/Review.jsx";

//TODO: Implement logic to show a different button depending on the user's role in the order.
// If the user is a customer in the order, show a button to review the car, and provider.
// If the user is a provider in the order, show a button to review the customer (Might be more relevant to have in the provider menu).

//TODO: Dynamically change names for the orders based on car in them.
function Order ({order}) {
    return (
        <li className="order">
            <details>
                <summary>
                    <div className={"row"}>
                        <div className={"order-header col-8"}>
                            <h4>Manufacturer Carmodel</h4>
                        </div>
                        <div className={"col-4 button-container flex-container-row"}>
                            <text>Review: </text>
                            <button onClick={() => {
                                <Review order = {order} type={"car"}/>
                                /*TODO: Implement logic to redirect to review page for specific car*/
                            }}>
                                Car
                            </button>
                            <button onClick={() => {
                                <Review order = {order} type={"provider"}/>
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
                    <li><strong>Start: </strong> {order.startDate}</li>
                    <li><strong>End: </strong> {order.endDate}</li>
                    <li><strong>Paid: </strong> {order.pricePaid}</li>
                    <li><strong>Status: </strong> {order.orderStatus}</li>
                </ul>
            </div>
            </details>
        </li>
    )
}

Order.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.number,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        pricePaid: PropTypes.number,
        orderStatus: PropTypes.bool,
        carId: PropTypes.number,
        customerId: PropTypes.number,
        providerId: PropTypes.number
    })
}


export default Order
