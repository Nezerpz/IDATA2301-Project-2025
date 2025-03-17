
//TODO: This is supposed to be the root where the user can see their profile and corresponding information.
// Implement the actual page with the user's information. Rename to mypage?

import { Routes, Route } from 'react-router-dom';
import SettingsNavbar from "../components/SettingsNavbar.jsx";
import Orders from './Orders.jsx';
import ProviderSettings from "../components/ProviderSettings.jsx";

function User() {
    return (
        <div>
            <Orders />
        </div>
    );
}

export default User;