import UserList from "../../components/UserList/UserList.jsx";
import useTitle from "../../components/useTitle.jsx";
import React, {useEffect, useState} from "react";
import {fetchWithAuth} from "../../static/js/auth.js";

function renderPage(users) {
  return (
    <>
        <h1>List of all users</h1>
        <UserList users={users} />
    </>
  );
}

function UsersPage() {
    useTitle("Users");
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response = await fetchWithAuth(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/users",{
                    method:"POST",
                });
                let data = await response.json();
                setUsers(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return renderPage(users);
}

export default UsersPage;
