import "./Car.css";
import PropTypes from 'prop-types';
import FeatureList from "./FeatureList.jsx";
import { CarContext } from "../../context/CarContext.js";
import OrderModal from "./OrderModal.jsx";
import { useState, useContext } from "react";
import checkLogin from "../../static/js/checkLogin.js";
import {useNavigate, useSearchParams} from "react-router-dom";



function Car ({car}) {
    const [ordering, setIsOrdering] = useState(false)
    const [searchParams] = useSearchParams();
    let [ fromToDate, setFromToDate ] = useContext(CarContext);

    const navigate = useNavigate();
    // <button onClick={() => {orderCar(car, fromToDate, setIsOrdering)}}>Order Now</button>


    const canOrder = () => {
        if (checkLogin()) {
            setIsOrdering(true);
        }
        else {
            alert("You need to be logged in to order a car.");
            navigate('/login', { state: { from: window.location.pathname + "?" + searchParams } });
        }
    }

    return (
        <div className="car">
            <h3>{car.manufacturer} {car.carModel}</h3>
            <img src={"src" + car.imagePath} alt={car.carModel} className={"car-image"}/>
            <div className={"carInfo"}>
                <div>
                    <p><strong>{car.user}</strong></p>
                    <p>{car.transmissionType} ∙ {car.fuelType} ∙ {car.numberOfSeats} SEATS ∙ {car.productionYear}</p>
                </div>
                <FeatureList features={car.features}/>
            </div>

            <span className={"grow"}></span>
            <div className={"orderButtonContainer"}>
                <button className = {"big-button"} onClick={() => {canOrder()}}>Rent for {car.price}/day</button>
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
