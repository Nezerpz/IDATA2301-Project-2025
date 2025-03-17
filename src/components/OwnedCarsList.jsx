
import OwnedCar from "./OwnedCar.jsx";


function OwnedCarsList(cars) {
    cars = cars["cars"]
    return (
            <ul className={"scrollable-list"}>
                {cars.map((car) => (
                    <OwnedCar car={car} key ={car.id}/>
                ))}
            </ul>
    )
}

export default OwnedCarsList;