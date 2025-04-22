import UserList from "../components/UserList.jsx";
import useTitle from "../components/useTitle.jsx";
import React, {useEffect, useState} from "react";

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
                const token = localStorage.getItem("jwt");
                let response = await fetch(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/users",{
                    method:"POST",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
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