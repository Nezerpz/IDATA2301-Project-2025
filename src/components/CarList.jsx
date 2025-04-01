import PropTypes from "prop-types";
import Car from "./Car.jsx";

function CarList ({cars, filters}) {
    var visibleCars = cars;

    if (filters != null && cars != null) {
        visibleCars = visibleCars.filter(car => {
    console.debug(car)
            let manufacturer = filters["manufacturers"]
            let features = filters["features"]
            let prices = filters["prices"]
            let transmission = filters["transmission"]
            console.log(`filter: ${features} \n\n car: ${car["features"]}`)
            console.log(features.length)
            return (
                (manufacturer.length != 0
                    ? manufacturer.includes(car["manufacturer"])
                    : true) &&
                car["price"] >= prices[0] && car["price"] <= prices[1] &&
                (transmission.length != 0
                    ? transmission.includes(car["transmissionType"])
                    : true) &&
                (features.length != 0 
                    ? features.every((feature) => car["features"].includes(feature))
                    : true)

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
