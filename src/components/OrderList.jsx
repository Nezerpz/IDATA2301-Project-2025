import Order from './Order';

function OrderList (orders) {
    orders = orders["orders"]
    return (
        <ul>
            {orders.map((order) => <Order key={order.id} order={order} readOnly={true} />)}
        </ul>
    );
}


export default OrderList;
