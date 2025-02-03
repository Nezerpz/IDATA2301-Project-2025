import useTitle from "../components/useTitle.jsx";
import Filters from "../components/Filters.jsx";
import Car from "../components/Car.jsx";

function Cars(){
    useTitle("Cars");
    let car = {
        manufacturer: "BMW",
        model: "M3",
        price: 2351.37,
        features: ["Seat warming", "Roof window", "4-wheel drive"],
        transmission: "Manual",
        imageUrl: "https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088025.jpg"
    }
    //let cars = fetch("/cars").then((res) => res.json())
    return (
        <div className="row">
            <div className="col-3">
                <Filters />
            </div>
            <div className="col-9">
                <div className={"car-grid"}>
                <Car car={car}/>
                </div>
            </div>
        </div>
    )
}
export default Cars;
