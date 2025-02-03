import "../static/css/car.css";
import PropTypes from 'prop-types';


function Car ({car}) {
    return (
        <div className="car">
            <h2>{car.manufacturer} {car.model}</h2>
            <div>
                <img src={car.imageUrl} />
                <div>
                    <p><strong>Price: </strong>{car.price}</p>
                    <p><strong>Transmission: </strong>{car.transmission}</p>
                    <strong>Features:</strong>
                    <ul>
                        {car.features.map(feature => <li><p>{feature}</p></li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}


Car.propTypes = {
    car: PropTypes.shape({
        manufacturer: PropTypes.string,
        model: PropTypes.string,
        imageUrl: PropTypes.string,
        price: PropTypes.number,
        transmission: PropTypes.string,
        features: PropTypes.shape({})
    })
}


export default Car
