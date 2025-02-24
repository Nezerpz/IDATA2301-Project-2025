import "../static/css/car.css";
import PropTypes from 'prop-types';
import React from "react";
import FeatureList from "./FeatureList.jsx";


function Car ({car}) {
    return (
        <div className="car">
            <h2>{car.manufacturer} {car.carModel} ({car.productionYear})</h2>
            <img src={`https://dummyimage.com/600x200/000/ffffff&text=<img src="${car.manufacturer}+${car.carModel}+(${car.productionYear})" />`} alt={car.carModel}/>
            <div>
                <div>
                    <p><strong>Provider: </strong>{}</p>
                    <p><strong>Price: </strong>{}</p>
                    <p><strong>Provider: </strong>{car.numberOfSeats}</p>
                    <p><strong>Transmission: </strong>{car.transmissionType}</p>
                    <p><strong>Fuel: </strong>{car.fuelType}</p>
                </div>
                <div className={"features"}>
                    <FeatureList features={car.features}/>
                </div>
            </div>
        </div>
    )
}

Car.propTypes = {
    car: PropTypes.shape({
        id: PropTypes.number,
        carModel: PropTypes.string,
        numberOfSeats: PropTypes.number,
        productionYear: PropTypes.number,
        manufacturer: PropTypes.string,
        transmissionType: PropTypes.string,
        fuelType: PropTypes.string,
        features: PropTypes.array
    })
}


export default Car
