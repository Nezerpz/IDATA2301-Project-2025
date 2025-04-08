import PropTypes from "prop-types"
import ReactDom from 'react-dom'

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

const INFO_STYLES = {
    maxHeight: '200px', 
    overflow: 'scroll',
    boxShadow: '0px -20px 20px lightgrey inset'
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

function OrderModal({open, onClose, car, timespan}) {
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
                <div style={INFO_STYLES}>
                    <h5>From</h5>
                    <p>{timespan.dateFrom} {timespan.timeFrom}</p>
                    <h5>To</h5>
                    <p>{timespan.dateTo} {timespan.timeTo}</p>
                    <h5>For</h5>
                    <p>{car.price}/day</p>
                </div>
                <h5>In Total</h5>
                <p>{car.price} x {totalDays} = {totalPrice} total</p>
                <button onClick={onClose}>Place Order</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </>,
        document.getElementById("portal")
    )
}


OrderModal.PropTypes = {
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
