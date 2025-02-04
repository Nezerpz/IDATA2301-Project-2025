import "../static/css/car.css";
import PropTypes from 'prop-types';


function Car ({car}) {
    return (
        <div className="car">
            <h2>{car.numberOfSeats} {car.carModel}</h2>
            <div>
                <div>
                    <p><strong>Price: </strong>{car.fuelType}</p>
                    <p><strong>Transmission: </strong>{car.transmissionType}</p>
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
        transmissionType: PropTypes.string,
        fuelType: PropTypes.string,
        productionYear: PropTypes.number
    })
}


export default Car
