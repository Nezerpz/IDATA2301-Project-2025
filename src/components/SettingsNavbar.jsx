import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";

//TODO: Make this dynamically change based on the user's role

function renderComponent({userType}) {
    const navigate = useNavigate();
    const handleBecomeProvider = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem("jwt");
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/become-provider", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
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
    if (userType === "ADMIN") {
        {/*TODO: Remove the parts used for testing later.*/}
        return (
            <>
                <Link to={"/mypage/users"} className={"navbar-item-dark"}>
                    User administration
                </Link>
                <Link to={"/mypage/orders"} className={"navbar-item-dark"}>
                    Order history
                </Link>
                <Link to={"/mypage/settings"} className={"navbar-item-dark"}>
                    Settings
                </Link>
                <Link className={"navbar-item-dark"} to={"/"} onClick={handleBecomeProvider}>
                    Become a provider
                </Link>
                <Link className={"navbar-item-dark"} to={"/mypage/provider"}>
                    Provider options
                </Link>
            </>
        );
    } else if (userType === "PROVIDER") {
        return (
            <>
                <Link to={"/mypage/orders"} className={"navbar-item-dark"}>
                    Orders as a customer
                </Link>
                <Link to={"/mypage/provider/orders"} className={"navbar-item-dark"}>
                    Orders as a provider
                </Link>
                <Link to={"/mypage/settings"} className={"navbar-item-dark"}>
                    Settings
                </Link>
            </>
        );
    } else if (userType === "CUSTOMER") {
        return (
            <>
                <Link to={"/mypage/orders"} className={"navbar-item-dark"}>
                    Orders
                </Link>
                <Link to={"/mypage/settings"} className={"navbar-item-dark"}>
                    Settings
                </Link>
                <Link className={"navbar-item-dark"} to={"/"} onClick={handleBecomeProvider}>
                    Become a provider
                </Link>
            </>
        );
    }
}

function NavBarPicker() {
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
                const token = localStorage.getItem("jwt");
                let response = await fetch(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/userType", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                let data = await response.json();
                setUserType(data);
        };

        fetchData();
    }, []);
    return renderComponent({userType});
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