import Car from "./Car.jsx";

async function CarList () {
    let cars = [{
        manufacturer: "BMW",
        model: "M3",
        price: 2351.37,
        features: ["Seat warming", "Roof window", "4-wheel drive"],
        transmission: "Manual",
        imageUrl: "https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088025.jpg"
    },{
        manufacturer: "BMW",
        model: "M3",
        price: 2351.37,
        features: ["Seat warming", "Roof window", "4-wheel drive"],
        transmission: "Manual",
        imageUrl: "https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088025.jpg"
    }]
    //let cars = await fetch("/cars").then((res) => console.log(res.json()))

    return cars.map(car => <Car car={car} readOnly={true} />)
}

export default CarList;
