import Order from './Order';

function OrderList (orders) {
    orders = orders["orders"]
    return (
        <div>
            {orders.map((order) => <Order key={order.id} order={order} readOnly={true} />)}
        </div>
    );
}


export default OrderList;
