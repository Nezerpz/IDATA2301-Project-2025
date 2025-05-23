import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState } from "react";
import {fetchWithAuth} from "../../static/js/auth.js";
import "./UserPage.css";

async function saveChanges(user, navigate) {
    try {
        const response = await fetchWithAuth("/users/" + user.id + "/update", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
        if (response.status === 404) {
            throw new Error('User not found');
        }  else if (response.status === 401) {
            throw new Error('Unauthorized');
        } else if (!response.ok) {
            throw new Error('Failed to update user');
        }
        alert("User details updated successfully!");
        navigate("/mypage/admin/users")
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

async function updatePassword(event, user, navigate) {
    if (!confirm("Are you sure you want to update this user's password?")) return
    let passwordField = event.target.parentElement.querySelector('input[type="password"]')
    let password = passwordField.value
    const response = await fetchWithAuth(`/users/${user.id}/password`, { 
        method: "PUT", 
        body: JSON.stringify({
            "password": password 
        })
    })
    if (response.ok) {
        alert("Password updated successfully")
        navigate("/mypage/admin/users")
    }
    else {
        console.error(response)
    }
}

async function unsuspendUser(user, navigate) {
    if (!confirm("Sure you want to unsuspend this user?")) return
    let response = await fetchWithAuth(`/users/unsuspend/${user.id}`, { method: "POST" })
    if (response.ok) {
        alert("User successfully unsuspended")
        navigate("/mypage/admin/users")
    }
    else {

        alert("Error occured")
    }
}

async function suspendUser(user, navigate) {
    if (!confirm("Sure you want to suspend this user?")) return
    let response = await fetchWithAuth(`/users/suspend/${user.id}`, { method: "POST" })
    if (response.ok) {
        alert("User successfully suspended")
        navigate("/mypage/admin/users")
    }
    else {
        alert("Error occured")
    }
}

async function deleteUser(user, navigate) {
    if (!confirm("Sure you want to delete this user?")) return
    let response = await fetchWithAuth(`/users/${user.id}`, { method: "DELETE" })
    if (response.ok) {
        alert("User successfully deleted")
        navigate("/mypage/admin/users")
    }
    else {
        alert("Error occured")
    }
}

function renderPage(user, userModification, setUserModification, navigate) {
    return (
        <>
            <h2>Manage user - {user.firstName} {user.lastName}</h2>
            <div className={"user-information"}>
                <h4>User information</h4>
                <form className={"flex-container-column"} onSubmit={(e) => e.preventDefault()}>
                    <label>
                        <span>Name</span>
                        <input className={"user-information-input"} type={"text"} value={userModification.firstName}
                            onChange={(e) => setUserModification({
                                ...userModification,
                                firstName: e.target.value
                            })}/>
                        <input className={"user-information-input"} type={"text"} value={userModification.lastName}
                            onChange={(e) => setUserModification({
                                ...userModification,
                                lastName: e.target.value
                            })}/>
                    </label>
                    <label>
                        <span>Username</span>
                        <input className={"user-information-input"} type={"text"} value={userModification.username}
                            onChange={(e) => setUserModification({
                                ...userModification,
                                username: e.target.value
                            })} />
                    </label>
                    <label>
                        <span>Email</span>
                        <input className={"user-information-input"} type={"email"} value={userModification.email}
                            onChange={(e) => setUserModification({
                                ...userModification,
                                email: e.target.value
                            })} />
                    </label>
                    <button className={"big-button user-information-button"} type={"submit"}
                        onClick={() => saveChanges(userModification, navigate)}>
                        Submit changes
                    </button>
                </form>
                <div className={"flex-container-column password-reset"}>
                    <h4>Password reset</h4>
                    <input type={"password"} placeholder={"Enter new password"} className={"password-reset-input"}></input>
                    <button className={"big-button password-reset-button"}
                        onClick={(e) => updatePassword(e, user, navigate)}>Send password reset</button>
                </div>
                <h4>Suspend/unsuspend or delete user?</h4>
                <div className={"flex-container-row user-actions"}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        strokeWidth={1.5} stroke="currentColor"
                        width={48}
                        className="size-6 clickable" onClick={() => unsuspendUser(user, navigate)}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        strokeWidth="1.5" stroke="currentColor"
                        className="size-6 flex-end-item clickable" width={48}
                        onClick={() => suspendUser(user, navigate)}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="size-6 flex-end-item clickable" width={48}
                         onClick={() => deleteUser(user, navigate)}>
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                    </svg>
                </div>
            </div>
        </>
    );
}

function UserPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [userModification, setUserModification] = useState(user)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response = await fetchWithAuth("/users/" + id);
                let data = await response.json();
                setUser(data);
                setUserModification(data);
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
    if (user === null) return <div>User not found</div>;

    return renderPage(user, userModification, setUserModification, navigate);
}

export default UserPage;
