import {Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import { fetchWithAuth } from "../../static/js/auth.js"
import "./SettingsPage.css"

async function saveChanges(user, userModification, navigate) {
    console.log(user)
    let userNameChanged = (user.username != userModification.username)
    if (userNameChanged) {
        if (!confirm("You have altered your username. You will be logged out and need to log back in if you choose to proceed")) return
    }
    
    try {
        const response = await fetchWithAuth("/users/self/update", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userModification)
        });
        if (response.status === 404) {
            throw new Error('User not found');
        }  else if (response.status === 401) {
            throw new Error('Unauthorized');
        } else if (!response.ok) {
            throw new Error('Failed to update user');
        }
        alert("User details updated successfully!");
        if (userNameChanged) {
            localStorage.removeItem("jwt")
            navigate("/")
            window.location.reload()
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

function UpdateUsers({user, userModification, setUserModification, navigate}) {

    return (
        <form onSubmit={(e) => e.preventDefault()}>
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
                onClick={() => saveChanges(user, userModification, navigate)}>
                Submit changes
            </button>
        </form>
    )
}

//TODO: Link to manage cars. Change the routing so the buttons dont persist to pages it shouldn't
function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleReset = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const response = await fetchWithAuth(`/users/self/password`, {
                method: "PUT",
                body: JSON.stringify({ "password": password })
            });

            if (response.ok) {
                alert("Password updated successfully.");
                setPassword("");
                setConfirmPassword("");
            } else {
                alert("Failed to update password. Please try again.");
            }
        } catch (error) {
            console.error("Error updating password:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <form
            className={"flex-container-column reset-password"}
            onSubmit={(e) => {
                e.preventDefault();
                handleReset();
            }}
        >
            <input
                className={"new-password-input"}
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                className={"new-password-input"}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className={"reset-password-button big-button"}>Reset Password</button>
        </form>
    );
}

function DeleteAccount() {
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (confirmDelete) {
            try {
                const response = await fetchWithAuth(`/users/self`, {
                    method: "DELETE",
                });
                if (response.ok) {
                    alert("Account deleted successfully.");
                } else {
                    alert("Failed to delete account. Please try again.");
                }
            } catch (error) {
                console.error("Error deleting account:", error);
                alert("An error occurred. Please try again.");
            }
        }
    };

    return (
        <button onClick={handleDelete} className={"delete-account-button big-button"}>
            Delete Account
        </button>
    );
}

function SettingsPage() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [user, setUser] = useState({});
    const [userModification, setUserModification] = useState(user)

    let navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response = await fetchWithAuth("/users/self");
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

    return (
        <>
          <h2>Settings</h2>
          <div className={"settings-page"}>
              <div>
                  <UpdateUsers 
                      user={user}
                      userModification={userModification} 
                      setUserModification={setUserModification}
                      navigate={navigate} />
              </div>
              <div>
                  <h3 className={"reset-password-heading"}>Reset Password</h3>
                  <ResetPassword />
              </div>
              <div className={"delete-account"}>
                  <h3 className={"delete-account-heading"}>Delete Account</h3>
                  <DeleteAccount />
              </div>
          </div>
        </>
    );
}

export default SettingsPage
