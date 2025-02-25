import Car from "./Car.jsx";

function CarList (cars) {
    return (
        <div>
            cars.map((car, index) => (
                <Car key={index} car={car} readOnly={true} />
            ))
        </div>
    );
}

export default CarList;
