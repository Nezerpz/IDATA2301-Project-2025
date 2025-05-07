import {Link} from "react-router-dom";
import "./ProviderPage.css"

function ProviderPage() {

    return(
        <div id={"provider-page"}>
            <Link to={"/mypage/provider/cars"} className={"navbar-item-dark"}>
                Manage cars
            </Link>
            <Link to={"/mypage/provider/orders"} className={"navbar-item-dark"}>
                Orders
            </Link>
        </div>
    )
}

export default ProviderPage;