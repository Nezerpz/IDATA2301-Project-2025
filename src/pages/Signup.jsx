import useTitle from "../components/useTitle.jsx";
import "../static/css/loginAndSignup.css";


function Signup() {
    useTitle("Sign up");
    return (
        <div className={"row"}>
            <div className={"col-2"}> </div>
            <div className={"col-8"}>
                <div className={"login"}>
                    <h1 className={"login-header"}>Sign up</h1>
                    <form className={"login-form"}>
                        <div className={"col-12"}>
                            <div>
                                {/*TODO: make label and input field be side by side without them overlaping when zooming*/}
                                <div className={"col-1"}>
                                    <label htmlFor="name">First name</label>
                                </div>
                                <div className={"col-11"}>
                                    <input type="name" id="name" name="name" placeholder="First name" />
                                </div>
                            </div>
                            <div>
                                <div className={"col-1"}>
                                    <label htmlFor="surname">Last name</label>
                                </div>
                                <div className={"col-11"}>
                                    <input type="surname" id="surname" name="surname" placeholder="Last name" />
                                </div>
                            </div>
                            <div>
                                <div className={"col-1"}>
                                    <label htmlFor="username">Username</label>
                                </div>
                                <div className={"col-11"}>
                                    <input type="username" id="username" name="username" placeholder="Username" />
                                </div>
                            </div>
                            <div>
                                <div className={"col-1"}>
                                    <label htmlFor="password">Password</label>
                                </div>
                                <div className={"col-11"}>
                                    <input type="password" id="password" name="password" placeholder="Password" />
                                </div>
                            </div>
                            <div>
                                <div className={"col-1"}>
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className={"col-11"}>
                                    <input type="email" id="email" name="email" placeholder="Email" />
                                </div>
                            </div>
                            <div>
                                <div className={"col-1"}>
                                    <label htmlFor="phone">Phone</label>
                                </div>
                                <div className={"col-11"}>
                                    <input type="phone" id="phone" name="phone" placeholder="Phone" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <a href={"/login"}>Login here</a>
                            <button type="submit">Sign up</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={"col-2"}> </div>
        </div>
    );
}

export default Signup;