import "../static/css/car.css";
import PropTypes from 'prop-types';
import React from "react";
import FeatureList from "./FeatureList.jsx";


function Car ({car}) {
    return (
        <div className="car">
            <h2>{car.manufacturer} {car.carModel} ({car.productionYear})</h2>
            <div>
                <div>
                    <p><strong>Provider: </strong>{car.provider}</p>
                    <p><strong>Price: </strong>{car.price}</p>
                    <p><strong>Provider: </strong>{car.numberOfSeats}</p>
                    <p><strong>Transmission: </strong>{car.transmissionType}</p>
                    <p><strong>Fuel: </strong>{car.fuelType}</p>
                </div>
                <div className={"features"}>
                    {car.features.map((feature, index) => (
                    <FeatureList key={index} feature={feature} readOnly={true} />
                    ))}
                </div>
            </div>
        </div>
    )
}


Car.propTypes = {
    car: PropTypes.shape({
        id: PropTypes.number,
        manufacturer: PropTypes.string,
        carModel: PropTypes.string,
        numberOfSeats: PropTypes.number,
        transmissionType: PropTypes.string,
        fuelType: PropTypes.string,
        productionYear: PropTypes.number,
        price : PropTypes.number,
        provider: PropTypes.string,
        features: PropTypes.array
    })
}


export default Car
