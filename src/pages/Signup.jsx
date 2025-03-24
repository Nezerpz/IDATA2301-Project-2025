import useTitle from "../components/useTitle.jsx";
import "../static/css/loginAndSignup.css";
import {Link} from "react-router-dom";
import Conflict from "./Conflict.jsx";


function Signup() {
    useTitle("Sign up");
    const isUserLoggedIn = localStorage.getItem('jwt') !== null;
    if (isUserLoggedIn) {
        return <Conflict error={"You are already logged in."}/>;
    } else {
        return (
            <div className={"row"}>
                <div className={"col-2"}></div>
                <div className={"col-8"}>
                    <div className={"login"}>
                        <h1 className={"login-header"}>Sign up</h1>
                        <form className={"login-form"}>
                            <div className={"col-12"}>
                                <label htmlFor={"firstName"}>
                                    <span>First name</span>
                                    <input type="name" id="name" name="name"/>
                                </label>
                                <label htmlFor={"lastName"} l>
                                    <span>Last name</span>
                                    <input type="lastName" id="lastName" name="lastName"/>
                                </label>
                                <label htmlFor={"username"}>
                                    <span>Username</span>
                                    <input type="username" id="username" name="username"/>
                                </label>
                                <label htmlFor={"password"}>
                                    <span>Password</span>
                                    <input type="password" id="password" name="password"/>
                                </label>
                                <label htmlFor={"email"}>
                                    <span>Email</span>
                                    <input type="email" id="email" name="email"/>
                                </label>
                                <label htmlFor={"phone"}>
                                    <span>Phone</span>
                                    <input type="phone" id="phone" name="phone"/>
                                </label>
                            </div>
                            <div>
                                <Link to={"/login"}>Login here</Link>
                                <button type="submit">Sign up</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={"col-2"}></div>
            </div>
        );
    }
}

export default Signup;