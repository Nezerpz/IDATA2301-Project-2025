import PropTypes from "prop-types";
import Car from "../Car/Car.jsx";
import { CarContext } from '../../context/CarContext.js'
import { useContext } from "react";

function CarList ({cars}) {
    var visibleCars = cars;
    const [ , , filters, , sortMethod, ] = useContext(CarContext)

    // Only filter if there are filters and cars
    if (filters != null && cars != null) {
        visibleCars = visibleCars.filter(car => {

            // Supported filters
            let selectedManufacturers = filters["manufacturers"]
            let selectedFeatures = filters["features"]
            let selectedPriceRange = filters["prices"]
            let minPrice = selectedPriceRange[0]
            let maxPrice = selectedPriceRange[1]
            let selectedTransmissionTypes = filters["transmission"]

            // Corresponding car properties
            let carManufacturer = car["manufacturer"]
            let carPrice = car["price"]
            let carTransmissionType = car["transmissionType"]
            let carFeatures = car["features"]

            return ( // Car is shown if...

                // either none or the correct manufacturer is selected, and...
                (selectedManufacturers.length != 0
                    ? selectedManufacturers.includes(carManufacturer)
                    : true) &&

                // the car price is between min and max, and...
                carPrice >= minPrice && carPrice <= maxPrice &&

                // the right transmission type is selected, and...
                (selectedTransmissionTypes.length != 0
                    ? selectedTransmissionTypes.includes(carTransmissionType)
                    : true) &&

                // either none or all matching features are selected.
                (selectedFeatures.length != 0
                    ? selectedFeatures.every((feature) => carFeatures.map(feature => feature.featureName).includes(feature))
                    : true)

            )
        })

        if (sortMethod != null && visibleCars != null) {
            visibleCars = visibleCars.sort(sortMethod);
        }
    }

    return (
        <div id={"car-list"}>
            {visibleCars.map((car) => <Car key={car.id} car={car} readOnly={true} />)}
        </div>
    );
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
    )
}
