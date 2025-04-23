function CheckLogin() {
    const user = localStorage.getItem('jwt');
    return user !== null;
}

export default CheckLogin;