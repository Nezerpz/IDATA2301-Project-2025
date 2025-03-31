import PropTypes from "prop-types";
import Car from "./Car.jsx";

function CarList ({cars, activeFilters}) {
    var visibleCars = cars;

    if (activeFilters != null && cars != null) {
        visibleCars = visibleCars.filter(car => {
            let manufacturer = activeFilters["manufacturers"]
            return manufacturer.includes(car["manufacturer"])
        });
    }

    return (
        <div>
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
    ),
    activeFilters: PropTypes.shape({
        manufacturers: PropTypes.arrayOf(PropTypes.string),
        prices: PropTypes.arrayOf(PropTypes.number),
        transmission: PropTypes.arrayOf(PropTypes.string),
        features: PropTypes.arrayOf(PropTypes.string)
    })
}
