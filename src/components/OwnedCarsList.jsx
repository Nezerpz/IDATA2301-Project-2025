
import OwnedCarListItem from "./OwnedCarListItem.jsx";


function OwnedCarsList(cars) {
    cars = cars["cars"]
    return (
            <ul className={"scrollable-list"}>
                {cars.map((car) => (
                    <OwnedCarListItem car={car} key ={car.id}/>
                ))}
            </ul>
    )
}

export default OwnedCarsList;