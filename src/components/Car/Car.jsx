import "./Car.css";
import PropTypes from 'prop-types';
import FeatureList from "./FeatureList.jsx";
import { CarContext } from "../../context/CarContext.js";
import OrderModal from "./OrderModal.jsx";
import { useState, useContext } from "react";



function Car ({car}) {
    const [ordering, setIsOrdering] = useState(false)
    let [ fromToDate, setFromToDate ] = useContext(CarContext);
    return (
        <div className="car">
            <h3>{car.manufacturer} {car.carModel}</h3>
            <img src={"src" + car.imagePath} alt={car.carModel} className={"car-image"}/>
            <div className={"carInfo"}>
                <div>
                    <p><strong>{car.user}</strong></p>
                    <p>{car.transmissionType} ∙ {car.fuelType} ∙ {car.numberOfSeats.toString().toUpperCase()} seats ∙ {car.productionYear}</p>
                </div>
                <FeatureList features={car.features}/>
            </div>
            <span className={"grow"}></span>
            <div className={"orderButtonContainer"}>
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
