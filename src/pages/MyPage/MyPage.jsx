
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
import {jwtDecode} from "jwt-decode";
import BackButton from "../../components/BackButton/BackButton.jsx";

function MyPage() {
    useTitle("My Page");
    const isLoggedIn = CheckLogin();
    if (isLoggedIn) {
        return (
            <div className={"row mypage-background"}>
                <div className={"col-2"}>
                </div>
                <div className={"col-8"}>
                    <div className={"mypage-container"}>
                        <Outlet/>
                    </div>
                </div>
            </div>
        );
    } else {
        return <AccessDeniedPage />;
    }
}

export default MyPage;
