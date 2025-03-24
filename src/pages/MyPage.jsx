
//TODO: This is supposed to be the root where the user can see their profile and corresponding information.
// Implement the actual page with the user's information. Rename to mypage?

import {Link, Outlet, useResolvedPath } from 'react-router-dom';
import SettingsNavbar from "../components/SettingsNavbar.jsx";
import useTitle from "../components/useTitle.jsx";

function MyPage() {
    useTitle("My Page");
    return (
        <div className={"row"}>
            <div className={"col-2"}>
                {/*TODO: Add nav bar for this menu*/}
                    <SettingsNavbar />
            </div>
            <div className={"col-10"}>
                <Outlet />
            </div>
        </div>
    );
}

export default MyPage;