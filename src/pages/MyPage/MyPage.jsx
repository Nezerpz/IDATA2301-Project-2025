
//TODO: This is supposed to be the root where the user can see their profile and corresponding information.
// Implement the actual page with the user's information. Rename to mypage?

//TODO: When token is expired, the user should be redirected to the login page.
// Works when first entering the page, since the check happens in SettingsNavbar.
// Change the check to happen in every page which needs credentials.

import {Outlet } from 'react-router-dom';
import SettingsNavbar from "./SettingsNavbar.jsx";
import useTitle from "../../components/useTitle.jsx";
import CheckLogin from "../../static/js/checkLogin.js";
import AccessDeniedPage from "../AccessDeniedPage/AccessDeniedPage.jsx";
import Logout from "../../components/LogOut/Logout.jsx";
import "./MyPage.css";
import React from "react";

function MyPage() {
    useTitle("My Page");
    const isLoggedIn = CheckLogin();
    if (isLoggedIn) {
        return (
            <div className={"row"}>
                <div className={"col-2"}>
                    <div id={"settings-menu"}>
                        <h1>user name</h1>
                        {/*TODO: Add nav bar for this menu*/}
                        <SettingsNavbar/>
                        <Logout />
                    </div>
                </div>
                <div className={"col-10 mypage-background"}>
                    <div className={"col-9"}>
                        <div className={"col-1"}></div>
                        <div className={"col-10"}>
                            <div id={"order-list"}>
                                <Outlet/>
                            </div>
                        </div>
                        <div className={"col-1"}></div>
                    </div>
                    <div className={"col-3"}></div>
                </div>

            </div>
        );
    } else {
        return <AccessDeniedPage />;
    }
}

export default MyPage;
