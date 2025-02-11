import useTitle from "../components/useTitle.jsx";
import "../static/css/loginAndSignup.css";


function Login() {
    useTitle("Login");
    return (
        <div className={"row"}>
            <div className={"col-2"}> </div>
            <div className={"col-8"}>
                <div className={"login"}>
                    <h1 className={"login-header"}>Login</h1>
                    <form className={"login-form"}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input type="username" id="username" name="username" />
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" />
                        </div>
                        <div>
                            <a href={"/signup"}>Sign up here</a>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={"col-2"}> </div>
        </div>
    );
}

export default Login;