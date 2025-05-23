import { useState } from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import useTitle from "../../components/useTitle.jsx";
import "../../static/css/loginAndSignup.css";
import Conflict from "../ConflictPage/ConflictPage.jsx";


function LoginPage() {
    useTitle("Login");
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isUserLoggedIn = localStorage.getItem('jwt') !== null;

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/api/authenticate", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('jwt', data["accessToken"]);  // Store the token
                const redirectTo = location.state?.from || '/';
                navigate(redirectTo);
                window.location.reload();
            } else if (response.status === 403){
                alert("You have been forbidden from logging in. Your account is most likely suspended. Contact us for more information.")
            } else {
                console.error('Failed to login', response.statusText);
                alert('Failed to login');
            }
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    if(isUserLoggedIn) {
        return <Conflict error={"You are already logged in."}/>;
    } else {
        return (
            <div className={"row"}>
                <div className={"col-2"}></div>
                <div className={"col-8"}>
                    <div className={"login"}>
                        <h1 className={"login-header"}>Login</h1>
                        <form className={"login-form"} onSubmit={handleLogin}>
                            <div className={"col-12"}>
                                <label htmlFor={"username"}>
                                    <span>Username</span>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </label>
                                <label htmlFor={"password"}>
                                    <span>Password</span>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div>
                                <Link className={"bright-link"} to={"/signup"} state={location.state}>Sign up here</Link>
                                <button className={"big-button"}type="submit">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={"col-2"}></div>
            </div>
        );
    }
}

export default LoginPage;
