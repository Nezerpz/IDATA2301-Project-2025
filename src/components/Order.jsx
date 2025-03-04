import PropTypes from 'prop-types';
import React from "react";


function Order ({order}) {
    return (
        <div className="order">
            <h2>{order.id}</h2>
            <p><strong>Start date: </strong>{order.startDate}</p>
            <p><strong>End date: </strong>{order.endDate}</p>
            <p><strong>Price paid: </strong>{order.pricePaid}</p>
            <p><strong>Order status: </strong>{order.orderStatus}</p>

            <button onClick={() => {}}>
                Review car
            </button>
            <button onClick={() => {}}>
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
