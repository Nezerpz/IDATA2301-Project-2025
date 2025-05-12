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

function ReviewOptions({ row, userData }) {
    const navigate = useNavigate();

    const isCustomer = row.customerId === userData.id;
    const isProvider = row.providerId === userData.id;
    const isAdmin = userData.userType === "ADMIN";
    const path = window.location.pathname;

    if (isAdmin && path.includes("admin")) {
        return <>{EditOrder(row, navigate)}</>;
    } else if (isCustomer) {
        return (
            <>
                {ReviewCar(row, navigate)}
                {ReviewProvider(row, navigate)}
            </>
        );
    } else if (isProvider) {
        return (
            <>
                {ReviewCustomer(row, navigate)}
                {EditOrder(row, navigate)}
            </>
        );
    }

    return null;
}

function OrderList({ orders }) {
    const [processedOrders, setProcessedOrders] = useState([]);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetchWithAuth(
                    `${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/users/self`
                );
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchUsernames = async () => {
            try {
                const updatedOrders = await Promise.all(
                    orders.map(async (order) => {
                        const customerResponse = await fetchWithAuth(
                            `${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/users/name/${order.customerId}`
                        );
                        const customerData = await customerResponse.json();

                        const providerResponse = await fetchWithAuth(
                            `${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/users/name/${order.providerId}`
                        );
                        const providerData = await providerResponse.json();

                        return {
                            ...order,
                            "customer name": customerData.name,
                            "provider name": providerData.name,
                            "order date": `${order.dateFrom}-${order.timeFrom} / ${order.dateTo}-${order.timeTo}`,
                            "status": `${order.orderStatus}`,
                            "order number": order.id,
                            "price paid": order.pricePaid,
                            "car": `${order.car.manufacturer} ${order.car.carModel}`,
                        };
                    })
                );
                setProcessedOrders(updatedOrders);
            } catch (error) {
                console.error("Error fetching usernames:", error);
                setError(error);
            }
        };

        fetchUserData();
        fetchUsernames();
    }, [orders]);

    if (loading || !userData) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Determine columns based on user role
    const isCustomer = processedOrders.some((order) => order.customerId === userData.id);
    const isProvider = processedOrders.some((order) => order.providerId === userData.id);
    const isAdmin = userData.userType === "ADMIN";

    const columns = isAdmin
        ? ["order number", "car", "customer name", "provider name", "order date", "status", "price paid"]
        : isCustomer
            ? ["order number", "car", "provider name", "order date", "status", "price paid"]
            : isProvider
                ? ["order number", "car", "customer name", "order date", "status", "price paid"]
                : ["order number", "car", "order date", "status", "price paid"];

    return (
        <SearchableFieldTable rowKey={"id"} data={processedOrders} columns={columns}>

                <ReviewOptions userData={userData} />

        </SearchableFieldTable>
    );
}


export default OrderList;
