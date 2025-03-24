
//TODO: This is supposed to be the root where the user can see their profile and corresponding information.
// Implement the actual page with the user's information. Rename to mypage?

import {Outlet } from 'react-router-dom';
import SettingsNavbar from "../components/SettingsNavbar.jsx";
import useTitle from "../components/useTitle.jsx";
import CheckLogin from "../components/CheckLogin.jsx";
import AccessDenied from "./AccessDenied.jsx";

function MyPage() {
    useTitle("My Page");
    const isLoggedIn = CheckLogin();
    if (isLoggedIn) {
        return (
            <div className={"row"}>
                <div className={"col-2"}>
                    <h1>user name</h1>
                    {/*TODO: Add nav bar for this menu*/}
                    <SettingsNavbar/>
                </div>
                <div className={"col-10 mypage-background"}>
                    <div className={"col-9"}>
                        <Outlet/>
                    </div>
                    <div className={"col-3"}></div>
                </div>

            </div>
        );
    } else {
        return <AccessDenied />;
    }
}

export default MyPage;