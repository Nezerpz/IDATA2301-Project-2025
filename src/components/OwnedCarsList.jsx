
import OwnedCarListObject from "./OwnedCarListObject.jsx";


function OwnedCarsList(cars) {
    cars = cars["cars"]
    return (
            <ul className={"scrollable-list"}>
                {cars.map((car) => (
                    <OwnedCarListObject car={car} key ={car.id}/>
                ))}
            </ul>
    )
}

export default OwnedCarsList;