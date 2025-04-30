import SearchableFieldTable from "../SearchableFieldTable/SearchableFieldTable.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchWithAuth} from "../../static/js/auth.js";

function ReviewCustomer(order, navigate) {
    return (
        <button onClick={() => {
            navigate("/mypage/review", {state: {order: order, type: "customer"}})
        }}>
            Review Customer
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
            navigate("/mypage/review", {state: {order: order, type: "car"}})
        }}>
            Review Car
        </button>
    )
}

function EditOrder(row, navigate) {
    const path = window.location.pathname;
    const isAdmin = path.includes("admin");
    const pathTo = isAdmin ? "admin" : "provider";

    return (
        <button onClick={() => {
            navigate(`/mypage/${pathTo}/orders/edit/${row.id}`);
        }}>
            Edit Order
        </button>
    );
}

function ReviewOptions({row}) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response = await fetchWithAuth(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/orders/" + row.id);
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

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                let response = await fetchWithAuth(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/users/self");
                let data = await response.json();
                console.log(data);
                setUserData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading || !userData || !order) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const isCustomer = order.customerId === userData.id;
    const isProvider = order.providerId === userData.id;
    const isAdmin = userData.userType === "ADMIN";
    const path = window.location.pathname;
    if (isAdmin && !!path.includes("admin") ) {
        return (
            <>
                {EditOrder(row, navigate)}
            </>
        )
    } else if (isCustomer) {
        return (
            <>
                {ReviewCar(order, navigate)}
                {ReviewProvider(order, navigate)}
            </>
        )
    } else if (isProvider) {
        return (
            <>
                {ReviewCustomer(order, navigate)}
                {EditOrder(row, navigate)}
            </>
        )
    }

    //TODO: Check if the user is the provider or the customer in the order


}

function OrderList (orders) {
    orders = orders["orders"]
    const processedOrders = orders.map((order) => ({
        ...order,
        "order date": `${order.dateFrom}-${order.timeFrom} / ${order.dateTo}-${order.timeTo}`,
        "status": `${order.orderStatus}`,
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
