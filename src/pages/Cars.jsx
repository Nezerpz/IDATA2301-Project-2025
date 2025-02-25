import useTitle from "../components/useTitle.jsx";
import Filters from "../components/Filters.jsx";
import CarList from "../components/CarList.jsx";
import { render } from "react-dom";

async function renderPage(cars, error) {
    console.debug(cars)
    return (
        (error ? <div>{error}</div> :
            <div className="row">
                <div className="col-3">
                    <Filters cars={cars}/>
                </div>
                <div className="col-9">
                    <div className={"car-grid"}>
                        <CarList cars={cars}/>
                    </div>
                </div>
            </div>
        )
    )
}

function Cars(){
    useTitle("Cars");
    (async () => { 
        try {
            fetch(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/cars")
                .then(response => response.json())
                .then(data => renderPage(data, null));
        } catch (e) {
            renderPage([], e.message);
        }
        //renderPage(cars, error);
    })();
}

export default Cars;
