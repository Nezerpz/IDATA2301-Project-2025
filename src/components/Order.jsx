import PropTypes from 'prop-types';
import React from "react";
import Review from "../pages/Review.jsx";

//TODO: Implement logic to show a different button depending on the user's role in the order.
// If the user is a customer in the order, show a button to review the car, and provider.
// If the user is a provider in the order, show a button to review the customer (Might be more relevant to have in the provider menu).

function Order ({order}) {
    return (
        <div className="order">
            <h2>{order.id}</h2>
            <div className={"flex-container-row"}>
                <ul className={"order-list"}>
                    <li><strong>Start date: </strong>{order.startDate}</li>
                    <li><strong>End date: </strong>{order.endDate}</li>
                    <li><strong>Price paid: </strong>{order.pricePaid}</li>
                    <li><strong>Order status: </strong>{order.orderStatus}</li>
                </ul>
                <div className={"button-container"}>
                    <button onClick={() => {
                        <Review order = {order} type={"car"}/>
                        /*TODO: Implement logic to redirect to review page for specific car*/
                    }}>
                        Review car
                    </button>
                    <button onClick={() => {
                        <Review order = {order} type={"provider"}/>
                        /*TODO: Implement logic to redirect to review page for specific provider*/
                    }}>
                        Review provider
                    </button>
                </div>
            </div>
        </div>
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
