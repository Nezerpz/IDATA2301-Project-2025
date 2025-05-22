import SearchableFieldTable from "../SearchableFieldTable/SearchableFieldTable.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchWithAuth} from "../../static/js/auth.js";
import ReviewModal from "../Modals/ReviewModal/ReviewModal.jsx";

function ReviewCustomer(order, navigate) {
    return (
        <button
            className={"small-button clickable"}
            onClick={() => {
            if (order.orderStatus !== "COMPLETED") {
                alert("You can only review the customer after the order is completed.");
                return;
            }
            navigate("/mypage/review", {state: {order: order, type: "customer"}})
        }}>
            Review customer
        </button>
    )
}

function ReviewProvider(order, navigate) {
    return(
        <button
            className={"small-button clickable"}
            onClick={() => {
            if (order.orderStatus !== "COMPLETED") {
                alert("You can only review the provider after the order is completed.");
                return;
            }
            navigate("/mypage/review", {state: {order: order, type: "provider"}})
        }}>
            Review provider
        </button>
    )
}

function ReviewCar(order, navigate) {
    return(
        <button
            className={"small-button clickable"}
            onClick={() => {
            if (order.orderStatus !== "COMPLETED") {
                alert("You can only review the car after the order is completed.");
                return;
            }
            navigate("/mypage/review", {state: {order: order, type: "car"}})
        }}>
            Review car
        </button>
    )
}

function ReadCar(row) {
    const [reviews, setReviews] = useState(false);
    return (
        <>
            <button
                className={"car-user small-button clickable"}
                title={"Read reviews of this user"}
                onClick={() => {setReviews(true)}}
            >Car reviews
            </button>
            <ReviewModal
                open={reviews}
                onClose={() => {setReviews(false)}}
                id={row.car.id}
                type={"car"}
            />
        </>
    );
}


function ReadCustomer(row) {
    const [reviews, setReviews] = useState(false);
    return (
        <>
            <button
                className={"car-user small-button clickable"}
                title={"Read reviews of this user"}
                onClick={() => {setReviews(true)}}
            >Customer reviews
            </button>
            <ReviewModal
                open={reviews}
                onClose={() => {setReviews(false)}}
                id={row.customerId}
                type={"user"}
            />
        </>
    );
}

function ReadProvider(row) {
    const [reviews, setReviews] = useState(false);
    return (
        <>
            <button
                title={"Read reviews of this user"}
                className={"small-button clickable"}
                onClick={() => {setReviews(true)}}
            >
                Provider reviews
            </button>
            <ReviewModal
                open={reviews}
                onClose={() => {setReviews(false)}}
                id={row.providerId}
                type={"user"}
            />
        </>
    );
}

function EditOrderButton(row, navigate) {
    const path = window.location.pathname;
    const isAdmin = path.includes("admin");
    const pathTo = isAdmin ? "admin" : "provider";

    return (
        <button className={"small-button clickable"} onClick={() => {
            navigate(`/mypage/${pathTo}/orders/edit/${row.id}`);
        }}>
            Edit order
        </button>
    )
}

function EditOrder(row, navigate) {
    const path = window.location.pathname;
    const isAdmin = path.includes("admin");
    const pathTo = isAdmin ? "admin" : "provider";

    return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" width={"24"} onClick={() => {
        navigate(`/mypage/${pathTo}/orders/edit/${row.id}`);
    }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>

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
                {ReadProvider(row)}
            </>
        );
    } else if (isProvider) {
        return (
            <>
                {ReviewCustomer(row, navigate)}
                {ReadCustomer(row)}
                {EditOrderButton(row, navigate)}
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
                const response = await fetchWithAuth("/users/self");
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
                            `/users/name/${order.customerId}`
                        );
                        const customerData = await customerResponse.json();

                        const providerResponse = await fetchWithAuth(
                            `/users/name/${order.providerId}`
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
