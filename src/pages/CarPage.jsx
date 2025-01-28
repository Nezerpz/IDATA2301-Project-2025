import useTitle from "../components/useTitle.jsx";

const car = {
    manufacturer: "BMW",
    model: "M3",
    price: 2351.37,
    features: ["Seat warming", "Roof window", "4-wheel drive"],
    transmission: "Manual",
    imageUrl: "https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088025.jpg"
}

function CarPage () {
    useTitle(car.model)
    return (
        <div>
            <h2>{car.manufacturer} {car.model}</h2>
            <img src={car.imageUrl} />
            <p><strong>Price: </strong>{car.price}</p>
            <p><strong>Transmission: </strong>{car.transmission}</p>
            <strong>Features:</strong>
            <ul>
                {car.features.map(feature => <li><p>{feature}</p></li>)}
            </ul>
        </div>
    )
}

export default CarPage;
