import {Link} from "react-router-dom";
import "./AdminPage.css";


function AdminPage() {
  return (
      <div id={"admin-page"}>
          <h1>Admin page</h1>
          <Link to={"/mypage/admin/users"} className={"navbar-item-dark"}>
              Manage Users
          </Link>
          <Link to={"/mypage/admin/cars"} className={"navbar-item-dark"}>
              Manage Cars
          </Link>
          <Link to={"/mypage/admin/orders"} className={"navbar-item-dark"}>
              Manage Orders
          </Link>
      </div>
  );
}

export default AdminPage;