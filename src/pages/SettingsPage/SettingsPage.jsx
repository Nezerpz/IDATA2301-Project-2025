import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";

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
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/users/self/password`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
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
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/users/self`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
                        "Content-Type": "application/json"
                    }
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
