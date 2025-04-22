import Order from './Order';
import SearchableFieldTable from "./SearchableFieldTable.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function ReviewCustomer(order, navigate) {
    return (
        <button onClick={() => {
            navigate("/mypage/review", {state: {order: order, type: "car"}})
        }}>
            Review Car
        </button>
    )
}

function ReviewProvider(order, navigate) {
    return(
        <button onClick={() => {
            navigate("/mypage/review", {state: {order: order, type: "provider"}})
        }}>
            Review Provider
        </button>
    )
}

function ReviewCar(order, navigate) {
    return(
        <button onClick={() => {
            navigate("/mypage/review", {state: {order: order, type: "customer"}})
        }}>
            Review Customer
        </button>
    )
}

function ReviewOptions({row}) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response = await fetch(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/orders/" + row.id);
                let data = await response.json();
                setOrder(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    //TODO: Check if the user is the provider or the customer


}

function OrderList (orders) {
    orders = orders["orders"]
    const processedOrders = orders.map((order) => ({
        ...order,
        "order date": `${order.dateFrom}-${order.timeFrom} / ${order.dateTo}-${order.timeTo}`,
        "status": order.orderStaus ? "Complete" : "Ongoing",
        "order number": order.id,
        "price paid": order.pricePaid,
        "car": `${order.car.manufacturer} ${order.car.carModel}`,

    }));
    console.log(processedOrders);
    return (
            <SearchableFieldTable rowKey={"id"} data={processedOrders} columns={["order number", "car", "order date", "status", "price paid"]}>
                <ReviewOptions />
            </SearchableFieldTable>
    );
}


export default OrderList;
