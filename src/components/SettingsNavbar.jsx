import {Link, useNavigate} from 'react-router-dom';

//TODO: Make this dynamically change based on the user's role


function NavBarPicker(userType) {
    const navigate = useNavigate();

    const handleBecomeProvider = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/become-provider", {
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

    if (userType === "admin") {
        return (
            <>
                <Link to={"/mypage/users"} className={"navbar-item-dark"}>
                    Users
                </Link>
                <Link to={"/mypage/settings"} className={"navbar-item-dark"}>
                    Settings
                </Link>
            </>
        );
    } else if (userType === "provider") {
        return (
            <>
                <Link to={"/mypage/orders"} className={"navbar-item-dark"}>
                    Orders
                </Link>
                <Link to={"/mypage/settings"} className={"navbar-item-dark"}>
                    Settings
                </Link>
            </>
        );
    } else if (userType === "customer") {
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
    } else {
        //TODO: Remove after testing. Return null if no userType is provided.
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
    }
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