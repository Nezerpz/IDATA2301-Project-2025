

function UserList(users) {
    users = ["users"];
    return (
        <div>
            <h1>List of all users</h1>
            {users.map((user) => <User key={user.id} user={user} readOnly={true} />)}
        </div>
    )
}

export default UserList;