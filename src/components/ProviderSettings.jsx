import {Route, Routes, useLocation} from "react-router-dom";
import AddNewCar from "./AddNewCar.jsx";
import ManageOwnedCars from "./ManageOwnedCars.jsx";
import React from "react";
import NotFound from "../pages/NotFound.jsx";


function ProviderSettings({ currentPath }) {
    return (
        <div className={"row"}>
            <div className={"col-2"}></div>
            <div className={"col-8"}>
                <div className={"button-container"}>
                    {currentPath === "/mypage/settings" && (
                        <button>
                            <a href={`${currentPath}/cars`}>Cars</a>
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