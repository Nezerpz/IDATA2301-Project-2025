function logout() {
    localStorage.removeItem("jwt");

}

/**
 * Logs out the user and redirects to the login page.
 *
 * Use of <a> instead of <Link> due to reloading the
 * window, so the user does not see the option to go to the mypage.
 *
 * @returns {JSX.Element}  The logout button.
 * @constructor The logout button.
 */
function Logout() {
    return (
        <a href={"/login"} className={"navbar-item-dark"} onClick={logout}>Logout</a>
    );
}

export default Logout;