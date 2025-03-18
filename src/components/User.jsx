

function User(user) {
    user = ["user"];
  return (
      <div>
    <div className={"row"}>
        <div className={"col-3"}></div>
        <div className={"col-6"}>
            <h2>Manage user {user.username}</h2>
            <label>
                <span>Username</span>
                <input type={"text"} value={user.username}/>
            </label>
            <label>
                <span>Email</span>
                <input type={"email"} value={user.email}/>
            </label>
            <div className={"button-container"}>
                <button type={"submit"}>Submit changes</button>
                <h4>Password reset</h4>
                <button> Send password reset</button>
            </div>
            <h4> Suspend or delete user?</h4>
            <div className={"flex-container-row"}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="size-6 flex-end-item" width={48}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="size-6 flex-end-item" width={48}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                </svg>
            </div>
        </div>
        <div className={"col-3"}>
        </div>
    </div>
  </div>
  );
}

export default User;
