import PropTypes from "prop-types"
import ReactDom from 'react-dom'
import { useNavigate } from 'react-router';
import {fetchWithAuth} from "../../static/js/auth.js";

const MODAL_STYLES = {
    position: 'fixed',
    width: '325px',
    maxHeight: '525px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#EEE',
    borderRadius: '12px',
    padding: '25px',
    zIndex: 1000
}

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000
}

async function placeOrder(car, timespan, navigate, onClose) {
    var response
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
            <div style={OVERLAY_STYLES}></div>
            <div style={MODAL_STYLES}>
                <h4>Order {car.carModel}</h4>
                <p><strong>From:</strong> {timespan.dateFrom} {timespan.timeFrom}</p>
                <p><strong>To:</strong> {timespan.dateTo} {timespan.timeTo}</p>
                <p><strong>For</strong> {car.price}/day</p>
                <h4>In Total</h4>
                <p>{car.price} x {totalDays} = {totalPrice} total</p>
                <div className={"button-container flex-container-row"}>
                    <button className = {"big-button"} onClick={() => {placeOrder(car, timespan, navigate, onClose)}}>Place Order</button>
                    <button className = {"big-button"} onClick={onClose}>Cancel</button>
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

export default OrderModal
