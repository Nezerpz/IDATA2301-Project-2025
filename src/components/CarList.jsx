import Car from "./Car.jsx";

function CarList (cars) {
    cars = cars["cars"]
    return (
        <div>
            {cars.map((car) => <Car key={car.id} car={car} readOnly={true} />)}
        </div>
    );
}


export default CarList;
