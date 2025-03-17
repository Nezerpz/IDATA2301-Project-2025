function OwnedCarListObject(car) {
    car = car["car"]
    return (
        <li className={"owned-car"}>
            <span>
                {car.manufacturer} {car.carModel} ({car.productionYear})
            </span>
        </li>
    )
}



export default OwnedCarListObject;