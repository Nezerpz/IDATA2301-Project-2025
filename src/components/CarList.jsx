import PropTypes from "prop-types";
import Car from "./Car.jsx";

function CarList ({cars, filters}) {
    var visibleCars = cars;
    console.debug(filters)

    if (filters != null && cars != null) {
        visibleCars = visibleCars.filter(car => {
            let manufacturer = filters["manufacturers"]
            let features = filters["features"]
            let prices = filters["prices"]
            let transmission = filters["transmission"]
            return (
                manufacturer.includes(car["manufacturer"]) &&
                car["price"] >= prices[0] && car["price"] <= prices[1] &&
                transmission.includes(car["transmission"]) &&
                features.every((feature) => car["features"].includes(feature))

            )
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
    filters: PropTypes.shape({
        manufacturers: PropTypes.arrayOf(PropTypes.string),
        prices: PropTypes.arrayOf(PropTypes.number),
        transmission: PropTypes.arrayOf(PropTypes.string),
        features: PropTypes.arrayOf(PropTypes.string)
    })
}
