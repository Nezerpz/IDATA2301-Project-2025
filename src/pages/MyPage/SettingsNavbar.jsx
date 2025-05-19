import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useRef, useState} from "react";
import {fetchWithAuth} from "../../static/js/auth.js";
import "./dropdown.css";
import Logout from "../../components/LogOut/Logout.jsx";
import {jwtDecode} from "jwt-decode";

function renderComponent({userType}) {
    if (userType === "ADMIN") {
        return (
            <>
                <CustomerOrders />
                <SettingsLink />
                <AdminPage />
            </>
        );
    } else if (userType === "PROVIDER") {
        return (
            <>
                <CustomerOrders />
                <SettingsLink />
                <ProviderPage />
            </>
        );
    } else if (userType === "CUSTOMER") {
        return (
            <>
                <CustomerOrders />
                <SettingsLink />
                <BecomeProvider />
            </>
        );
    }
}

function NavBarPicker() {
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt");
    const decodedToken = token ? jwtDecode(token) : null;
    const role = decodedToken ? decodedToken.roles[0] : null;
    const userType = role != null 
        ? role.authority.split("_")[1] 
        : "CUSTOMER";


    return renderComponent({userType});
}

function SettingsLink() {
    return (
        <>
            <Link to={"/mypage/settings"} className={"navbar-item-dark"}>
                Settings
            </Link>
        </>
    );
}

function AdminPage() {
    return (
        <Link to={"/mypage/admin"} className={"navbar-item-dark"}>
            Admin Page
        </Link>
    );
}

function ProviderPage() {
    return (
        <Link to={"/mypage/provider"} className={"navbar-item-dark"}>
            Provider Page
        </Link>
    );
}

function CustomerOrders() {
    return (
        <Link to={"/mypage/orders"} className={"navbar-item-dark"}>
            My Orders
        </Link>
    );
}

function BecomeProvider() {
    const navigate = useNavigate();
    const handleBecomeProvider = async (event) => {
        event.preventDefault();
        try {
            if (window.confirm("Are you sure you want to become a provider?")) {
            const token = localStorage.getItem("jwt");
            const response = await fetchWithAuth("/become-provider", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            }

            if (response.ok) {
                //navigate('/');
                navigate('/login', { state: { from: window.location.pathname } });
            } else {
                console.error('Failed to become a provider', response.statusText);
            }
        } catch (error) {
            console.error('Error becoming a provider', error);
        }
    };
    return (
        <Link className={"navbar-item-dark"} to={"/"} onClick={handleBecomeProvider}>
            Become a provider
        </Link>
    );
}

//TODO: On mobile, after choosing an option, the navbar should collapse, and a back button should be shown.
// When the  back button is clicked, the navbar should expand again, and you will see my page again.

function SettingsNavbar() {
    const token = localStorage.getItem("jwt");
    const decodedToken = token ? jwtDecode(token) : null;
    const userName = decodedToken ? decodedToken.sub : null;
    return (
        <>
            <span className={"username-in-navbar"}>{userName}</span>
            <NavBarPicker />
            <Logout />
        </>
    );

}

export default SettingsNavbar;
