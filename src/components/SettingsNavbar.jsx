import {Link, useNavigate} from 'react-router-dom';

//TODO: Make this dynamically change based on the user's role

function SettingsNavbar() {
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

    return (
        <div className={"row"}>
                <div className="navbar">
                    <Link className="navbar-item"to={"orders"}>
                        Order History
                    </Link>
                    <Link className={"navbar-item"} to={"/"} onClick={handleBecomeProvider}>
                        Become a provider
                    </Link>
                </div>
        </div>
    );

}

export default SettingsNavbar;