import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useRef, useState} from "react";
import {fetchWithAuth} from "../../static/js/auth.js";
import "./dropdown.css";
import Logout from "../../components/LogOut/Logout.jsx";

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
    const [userType, setUserType] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
                let response = await fetchWithAuth(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/userType");

            if (response.status === 401) {
                localStorage.removeItem("jwt");
                navigate('/login', { state: { from: window.location.pathname } });
            }

                let data = await response.json();
                setUserType(data);
        };

        fetchData();
    }, []);
    return renderComponent({userType});
}

function DropdownAdmin() {
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
            <span className={"navbar-item-dark dropItem"}>
                Admin Settings
            </span>
            {isOpen && (
                <div className={"dropdown-content"} ref={dropdownRef}>
                    <Link to={"/mypage/admin/users"} className={"navbar-item-dark"}>
                        Manage Users
                    </Link>
                    <Link to={"/mypage/admin/cars"} className={"navbar-item-dark"}>
                        Manage Cars
                    </Link>
                    <Link to={"/mypage/admin/orders"} className={"navbar-item-dark"}>
                        Manage Orders
                    </Link>
                </div>
            )}
        </div>
    )
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
            <span className={"navbar-item-dark dropItem"}>
                Provider
            </span>
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
            const response = await fetchWithAuth(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/become-provider", {
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
    return (
        <>
            <NavBarPicker />
            <Logout />
        </>
    );

}

export default SettingsNavbar;
