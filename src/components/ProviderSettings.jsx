import {Link, Outlet} from "react-router-dom";
import React from "react";


function ProviderSettings() {
    return (
        <div className={"row"}>
            <h2>Provider options</h2>
            <div className={"col-2"}>
                <div className={"button-container"}>
                    <button>
                        <Link to={"/mypage/provider/cars"}>Cars</Link>
                    </button>
                </div>
            </div>
            <div className={"col-8"}>
                <Outlet />
            </div>
            <div className={"col-2"}></div>
        </div>
    );
}

export default ProviderSettings