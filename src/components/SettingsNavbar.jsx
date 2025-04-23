import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useRef, useState} from "react";
import ProviderSettings from "./ProviderSettings.jsx";
import {fetchWithAuth} from "../static/js/auth.js";

//TODO: Make this dynamically change based on the user's role

function renderComponent({userType}) {
    if (userType === "ADMIN") {
        {/*TODO: Remove the parts used for testing later.*/}
        return (
            <>
                <Link to={"/mypage/users"} className={"navbar-item-dark"}>
                    User administration
                </Link>
                <CustomerOrders />
                <SettingsLink />
                <BecomeProvider />
                <DropdownProvider />
            </>
        );
    } else if (userType === "PROVIDER") {
        return (
            <>
                <CustomerOrders />
                <SettingsLink />
                <DropdownProvider />
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
    const [userType, setUserType] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
                let response = await fetchWithAuth(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/userType");

            if (response.status === 401) {
                // Delete the JWT token and redirect to the login page
                localStorage.removeItem("jwt");
                navigate('/login');
            }

                let data = await response.json();
                setUserType(data);
        };

        fetchData();
    }, []);
    return renderComponent({userType});
}

function DropdownProvider(){
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            const dropdown = dropdownRef.current;
            const rect = dropdown.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                dropdown.style.left = 'auto';
                dropdown.style.right = '0';
            }
            if (rect.bottom > window.innerHeight) {
                dropdown.style.top = 'auto';
                dropdown.style.bottom = '100%';
            }
        }
    }, [isOpen]);

    const handleDropdownClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={"dropdown"} onClick={handleDropdownClick}>
            <text className={"navbar-item-dark dropItem"}>
                Provider
            </text>
            {isOpen && (
                <div className={"dropdown-content"} ref={dropdownRef}>
                    <Link to={"/mypage/provider/cars"} className={"navbar-item-dark"}>
                        Manage cars
                    </Link>
                    <Link to={"/mypage/provider/orders"} className={"navbar-item-dark"}>
                        Orders
                    </Link>
                </div>
            )}
        </div>
    )
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

function CustomerOrders() {
    return (
        <Link to={"/mypage/orders"} className={"navbar-item-dark"}>
            Orders
        </Link>
    );
}

function BecomeProvider() {
    const navigate = useNavigate();
    const handleBecomeProvider = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem("jwt");
            const response = await fetchWithAuth(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/become-provider", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                navigate('/');
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
    return (
        <div className="navbar-column">
            <NavBarPicker />
        </div>
    );

}

export default SettingsNavbar;