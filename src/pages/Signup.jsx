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
                        <div>
                            <label htmlFor="name">First name</label>
                            <input type="name" id="name" name="name" />
                            <label htmlFor="surname">Last name</label>
                            <input type="surname" id="surname" name="surname" />
                            <label htmlFor="username">Username</label>
                            <input type="username" id="username" name="username" />
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" />
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" />
                            <label htmlFor="phone">Phone</label>
                            <input type="phone" id="phone" name="phone" />
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