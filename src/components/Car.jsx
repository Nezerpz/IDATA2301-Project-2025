import "../static/css/car.css";
import PropTypes from 'prop-types';
import FeatureList from "./FeatureList.jsx";
import { CarContext } from "../context/CarContext.js";
import { useContext} from "react";


async function orderCar(car, fromToDate) {
    let token = localStorage.getItem("jwt")
    console.log(fromToDate)
    const response = await fetch(
        import.meta.env.VITE_BACKEND_URL + ":" + 
        import.meta.env.VITE_BACKEND_PORT + `/order`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "id": car.id,
                "fromDate": fromToDate.fromDate,
                "toDate": fromToDate.toDate,
                "fromTime": fromToDate.fromTime,
                "toTime": fromToDate.toTime

            }),
        }
    );
    alert(await response.json())
}

function Car ({car}) {
    let [ fromToDate, setFromToDate ] = useContext(CarContext);
    return (
        <div className="car">
            <h2>{car.manufacturer} {car.carModel} ({car.productionYear})</h2>
            <img src={`https://dummyimage.com/600x200/000/ffffff&text=<img src="${car.manufacturer}+${car.carModel}+(${car.productionYear})" />`} alt={car.carModel}/>
            <div>
                <div>
                    <p><strong>Provider: </strong>{car.user}</p>
                    <p><strong>Price: </strong>{car.price}</p>
                    <p><strong>Number of seats: </strong>{car.numberOfSeats}</p>
                    <p><strong>Transmission: </strong>{car.transmissionType}</p>
                    <p><strong>Fuel: </strong>{car.fuelType}</p>
                </div>
                <div className={"features"}>
                    <FeatureList features={car.features}/>
                </div>
            </div>
            <div>
                <button onClick={() => {orderCar(car, fromToDate)}}>Order Now</button>
            </div>
        </div>
    )
}

Car.propTypes = {
    car: PropTypes.shape({
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
}


export default Car
