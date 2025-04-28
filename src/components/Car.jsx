import "../static/css/car.css";
import PropTypes from 'prop-types';
import FeatureList from "./FeatureList.jsx";
import { CarContext } from "../context/CarContext.js";
import OrderModal from "../components/OrderModal.jsx";
import { useState, useContext } from "react";



function Car ({car}) {
    const [ordering, setIsOrdering] = useState(false)
    let [ fromToDate, setFromToDate ] = useContext(CarContext);
    // <button onClick={() => {orderCar(car, fromToDate, setIsOrdering)}}>Order Now</button>
    return (
        <div className="car">
            <h3>{car.manufacturer} {car.carModel} ({car.productionYear})</h3>
            <img src={`https://dummyimage.com/600x200/000/ffffff&text=<img src="${car.manufacturer}+${car.carModel}+(${car.productionYear})" />`} alt={car.carModel}/>
            <img src={car.imagePath} alt={car.carModel}/>
            {console.log(car.imagePath)}
            <div>
                <div>
                    <p><strong>Provider: </strong>{car.user}</p>
                    <p><strong>Price: </strong>{car.price}/day</p>
                    <p><strong>Number of seats: </strong>{car.numberOfSeats}</p>
                    <p><strong>Transmission: </strong>{car.transmissionType}</p>
                    <p><strong>Fuel: </strong>{car.fuelType}</p>
                </div>
                <div className={"features"}>
                    <FeatureList features={car.features}/>
                </div>
            </div>
            <div>
                <button onClick={() => {setIsOrdering(true)}}>Rent This Car</button>
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
