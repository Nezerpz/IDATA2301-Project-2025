import {Route, Routes, useLocation} from "react-router-dom";
import AddNewCar from "./AddNewCar.jsx";
import ManageOwnedCars from "./ManageOwnedCars.jsx";
import React from "react";


function ProviderSettings() {
    const location = useLocation();
    return (
        <div className={"row"}>
            <div className={"col-2"}></div>
            <div className={"col-8"}>
                <div className={"button-container"}>
                    {location.pathname === "/mypage/settings" && (
                        <button>
                            <a href={`${location.pathname}/cars`}>Cars</a>
                        </button>
                    )}
                </div>
                <Routes>
                    <Route path="add" element={<AddNewCar />} />
                    <Route path="cars" element={<ManageOwnedCars />} />
                </Routes>
            </div>
            <div className={"col-2"}></div>
        </div>
    );
}

export default ProviderSettings