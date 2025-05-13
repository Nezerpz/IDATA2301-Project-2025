import PropTypes from "prop-types"
import ReactDom from 'react-dom'
import { useNavigate } from 'react-router';
import {fetchWithAuth} from "../../../static/js/auth.js";
import "../Modal.css"
import {useEffect} from "react";
import scrollLock from "../../scrollLock/scrollLock.jsx";

async function placeOrder(car, timespan, navigate, onClose) {
    let response
    try {
        response = await fetchWithAuth(`/order`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "id": car.id,
                    "dateFrom": timespan.dateFrom,
                    "dateTo": timespan.dateTo,
                    "timeFrom": timespan.timeFrom,
                    "timeTo": timespan.timeTo

                }),
            }
        );
        response = await response.json()
        navigate("/mypage/orders")
    }

    catch (e) {
        alert("Failed to place order")
        onClose()
    }

}

function OrderModal({open, onClose, car, timespan}) {
    let navigate = useNavigate()
    if (!open) return null
    let dateFrom = new Date(timespan.dateFrom)
    let dateTo = new Date(timespan.dateTo)
    let totalDays = dateTo.getDate() - dateFrom.getDate()
    let totalPrice = car.price * totalDays
    return ReactDom.createPortal(
        <>
            <div className={"overlay"}></div>
            <div className={"modal"}>
                <h4>Order {car.carModel}</h4>
                <p><strong>From:</strong> {timespan.dateFrom} {timespan.timeFrom}</p>
                <p><strong>To:</strong> {timespan.dateTo} {timespan.timeTo}</p>
                <p><strong>For</strong> {car.price}/day</p>
                <h4>In Total</h4>
                <p>{car.price} x {totalDays} = {totalPrice} total</p>
                <div className={"button-container flex-container-row"}>
                    <button className = {"big-button"} onClick={() => {
                        document.body.classList.remove("no-scroll");
                        placeOrder(car, timespan, navigate, onClose);
                    }}>Place Order</button>
                    <button className = {"big-button"} onClick={() => {
                        document.body.classList.remove("no-scroll");
                        onClose();
                    }}>Cancel</button>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    )
}


OrderModal.propTypes = {
    open: PropTypes.bool,
    car: PropTypes.shape({
        id: PropTypes.number,
        imagePath: PropTypes.string,
        carModel: PropTypes.string,
        price: PropTypes.number,
        numberOfSeats: PropTypes.number,
        productionYear: PropTypes.number,
        manufacturer: PropTypes.string,
        transmissionType: PropTypes.string,
        carStatus: PropTypes.string,
        user: PropTypes.string,
        fuelType: PropTypes.string,
        features: PropTypes.array
    }),
    timespan: PropTypes.shape({
        dateFrom: PropTypes.string,
        dateTo: PropTypes.string,
        timeFrom: PropTypes.string,
        timeTo: PropTypes.string
    })
}

export default scrollLock(OrderModal);
