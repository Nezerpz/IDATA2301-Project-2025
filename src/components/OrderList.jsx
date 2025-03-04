import Order from './Order';

function OrderList (orders) {
    orders = orders["orders"]
    return (
        <div>
            {orders.map((order, index) => <Order key={index} order={order} readOnly={true} />)}
        </div>
    );
}


export default OrderList;
