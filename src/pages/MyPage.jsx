
//TODO: This is supposed to be the root where the user can see their profile and corresponding information.
// Implement the actual page with the user's information. Rename to mypage?

import {Link, Outlet, useResolvedPath } from 'react-router-dom';

function MyPage() {
    return (
        <div className={"row"}>
            <div className={"col-2"}>
                {/*TODO: Add nav bar for this menu*/}
                <div className={"navbar"}>
                    <nav>
                        <Link to={"/mypage/users"} className={"navbar-item"}>Users</Link>
                        <Link to={"/mypage/orders"} className={"navbar-item"}>Orders</Link>
                        <Link to={"/mypage/settings"} className={"navbar-item"}>Settings</Link>
                    </nav>
                </div>
            </div>
            <div className={"col-10"}>
                <Outlet />
            </div>
        </div>
    );
}

export default MyPage;