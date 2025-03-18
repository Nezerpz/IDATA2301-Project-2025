
//TODO: This is supposed to be the root where the user can see their profile and corresponding information.
// Implement the actual page with the user's information. Rename to mypage?

import { Routes, Route } from 'react-router-dom';
import Orders from './Orders.jsx';
import Settings from "./Settings.jsx";
import Users from "../components/Users.jsx";

function MyPage() {
    return (
        <div>
            <Routes>
                <Route path="/orders" element={<Orders />} />
                <Route path="settings/*" element={<Settings />} />
                <Route path="users" element={<Users />} />
            </Routes>
        </div>
    );
}

export default MyPage;