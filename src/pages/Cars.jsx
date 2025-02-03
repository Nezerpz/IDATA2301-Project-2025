import useTitle from "../components/useTitle.jsx";
import Filters from "../components/Filters.jsx";
import CarList from "../components/CarList.jsx";

function Cars(){
    useTitle("Cars");
    return (
        <div className="row">
            <div className="col-3">
                <Filters />
            </div>
            <div className="col-9">
                <div className={"car-grid"}>
                    <CarList />
                </div>
            </div>
        </div>
    )
}
export default Cars;
