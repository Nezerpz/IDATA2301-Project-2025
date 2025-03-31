import PropTypes from "prop-types";
import Car from "./Car.jsx";
import { useState, useEffect } from 'react';

function CarList ({cars, filters}) {

    useEffect(() => {
        var visibleCars = cars
        if (filters != null && cars != null) {
            visibleCars = cars.filter(car => {
                let manufacturer = filters["manufacturers"]
                console.debug(filters)
                console.debug(manufacturer)
                console.debug(car)
                return manufacturer.includes(car["manufacturer"])
            })
        }
        return (
            <div>
                {visibleCars.map((car) => <Car key={car.id} car={car} readOnly={true} />)}
            </div>
        );
    }, [cars, filters])
}


export default CarList;

CarList.propTypes = {
    cars: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            user: PropTypes.string,
            carModel: PropTypes.string,
            carStatus: PropTypes.string,
            manufacturer: PropTypes.string,
            imagePath: PropTypes.string,
            price: PropTypes.number,
            numberOfSeats: PropTypes.number,
            transmissionType: PropTypes.string,
            fuelType: PropTypes.string,
            productionYear: PropTypes.number,
            features: PropTypes.arrayOf(PropTypes.string)
        })
    ),
    filters: PropTypes.shape({
        manufacturer: PropTypes.arrayOf(PropTypes.string),
        prices: PropTypes.arrayOf(PropTypes.number),
        transmission: PropTypes.arrayOf(PropTypes.string),
        features: PropTypes.arrayOf(PropTypes.string)
    })
}
