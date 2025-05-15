import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import { fetchWithAuth } from "../../static/js/auth.js"

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
            onSubmit={(e) => {
                e.preventDefault();
                handleReset();
            }}
        >
            <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">Reset Password</button>
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
        <button onClick={handleDelete}>
            Delete Account
        </button>
    );
}

function SettingsPage() {

  return (
    <>
      <h2>Settings</h2>
        <div>
            <h3>Reset Password</h3>
            <ResetPassword />
        </div>
        <div>
            <h3>Delete Account</h3>
            <DeleteAccount />
        </div>
    </>
  );
}

export default SettingsPage
