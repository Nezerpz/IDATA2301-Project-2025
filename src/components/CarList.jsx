import Car from "./Car.jsx";
import PropTypes from 'prop-types';

function CarList (cars) {
    cars = cars["cars"]
    return (
        <div>
            {cars.map((car, index) => <Car key={index} car={car} readOnly={true} />)}
        </div>
    );
}

CarList.propTypes = {
    cars: PropTypes.arrayOf(
        PropTypes.shape({
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
    )
};


export default CarList;
