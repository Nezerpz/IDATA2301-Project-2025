import "./Car.css";
import PropTypes from 'prop-types';
import FeatureList from "./FeatureList.jsx";
import { CarContext } from "../../context/CarContext.js";
import OrderModal from "./OrderModal.jsx";
import { useState, useContext } from "react";



function Car ({car}) {
    const [ordering, setIsOrdering] = useState(false)
    let [ fromToDate, setFromToDate ] = useContext(CarContext);
    // <button onClick={() => {orderCar(car, fromToDate, setIsOrdering)}}>Order Now</button>
    return (
        <div className="car">
            <h3>{car.manufacturer} {car.carModel} ({car.productionYear})</h3>
            <img src={"src" + car.imagePath} alt={car.carModel} className={"car-image"}/>
            <div>
                <div>
                    <p><strong>{car.user}</strong></p>
                    <p>{car.transmissionType} {car.fuelType}</p>
                    <p>{car.numberOfSeats} seats</p>
                </div>
                <div className={"features"}>
                    <FeatureList features={car.features}/>
                </div>
            </div>
            <div>
                <button className = {"big-button"} onClick={() => {setIsOrdering(true)}}>Rent for {car.price}/day</button>
            </div>
            <OrderModal 
                open={ordering} 
                onClose={() => {setIsOrdering(false)}} 
                car={car} 
                timespan={fromToDate}>
            </OrderModal>
        </div>
    )
}

Car.propTypes = {
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
    })
}


export default Car
