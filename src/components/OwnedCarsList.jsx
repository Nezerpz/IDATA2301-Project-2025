import Car from "./Car.jsx";


function OwnedCarsList(cars) {
    cars = cars["cars"]
    return (
        <div>
                {cars.map((car, index) => (
                    <Car key={index} car={car}/>))}
        </div>
    )
}

export default OwnedCarsList;