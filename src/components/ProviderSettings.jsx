import {Route, Routes} from "react-router-dom";
import AddNewCar from "./AddNewCar.jsx";
import ManageOwnedCars from "./ManageOwnedCars.jsx";


function ProviderSettings(){
    return (
        <div className={"row"}>
            <div className={"col-2"}></div>
            <div className={"col-8"}>
                <h1>Provider Settings</h1>
                <div className={"button-container"}>
                    <button>
                        <a href={"add"}>Add new car</a>
                    </button>
                    <button>
                        <a href={"manage"}>Manage owned cars</a>
                    </button>
                </div>
                <div style={{border: "3px solid black"}}>
                <Routes>
                    <Route path="add" element={<AddNewCar />} />
                    <Route path="manage" element={<ManageOwnedCars />} />
                </Routes>
                </div>
            </div>
            <div className={"col-2"}></div>
        </div>
    )
}

export default ProviderSettings