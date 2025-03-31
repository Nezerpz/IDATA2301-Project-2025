function logout() {
    localStorage.removeItem("jwt");
    window.location.href = "/login";
}

function Logout() {
    return (
        <button onClick={logout}>Logout</button>
    );
}

export default Logout;