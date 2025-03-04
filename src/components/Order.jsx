import PropTypes from 'prop-types';
import React from "react";

//TODO: Implement logic to show a different button depending on the user's role in the order.
// If the user is a customer, show a button to review the car, and provider.
// If the user is a provider, show a button to review the customer (Might be more relevant to have in the provider menu).

function Order ({order}) {
    return (
        <div className="order">
            <h2>{order.id}</h2>
            <p><strong>Start date: </strong>{order.startDate}</p>
            <p><strong>End date: </strong>{order.endDate}</p>
            <p><strong>Price paid: </strong>{order.pricePaid}</p>
            <p><strong>Order status: </strong>{order.orderStatus}</p>

            <button onClick={() => {
                /*TODO: Implement logic to redirect to review page for specific car*/
            }}>
                Review car
            </button>
            <button onClick={() => {
                /*TODO: Implement logic to redirect to review page for specific provider*/
            }}>
                Review provider
            </button>

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
