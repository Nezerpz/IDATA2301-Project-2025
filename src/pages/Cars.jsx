import useTitle from "../components/useTitle.jsx";
import Filters from "../components/Filters.jsx";
import Car from "../components/Car.jsx";

function Cars(){
    useTitle("Cars");
    return (
        <div className="row">
            <div className="col-3">
                <Filters />
            </div>
            <div className="col-9">
                <div className={"car-grid"}>
                <Car />
                <Car />
                <Car />
                <Car />
                </div>
            </div>
        </div>
    )
}
export default Cars;