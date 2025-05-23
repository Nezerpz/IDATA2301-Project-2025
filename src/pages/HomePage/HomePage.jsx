import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import useTitle from "../../components/useTitle.jsx";
import SearchDateFromTo from "../../components/SearchDateFromTo/SearchDateFromTo.jsx";
import { CarContext, defaultTimespan } from "../../context/CarContext.js";
import "./HomePage.css";
import { fetchJSON } from "../../static/js/auth.js";
import CarList from "../../components/CarList/CarList.jsx";
import {jwtDecode} from "jwt-decode";
import OrderList from "../../components/OrderList/OrderList.jsx";

//TODO: Fix the link. It is currently white on white background
function HomePage(){
    useTitle("Home");
    let today = new Date()
    let oneWeekFromNow = new Date()
    oneWeekFromNow.setDate(today.getDate() + 7)
    let [timeSpan, setTimeSpan] = useState(defaultTimespan)
    const [highestRatedCars, setHighestRatedCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("jwt");
    const decodedToken = token ? jwtDecode(token) : null;
    const role = decodedToken ? decodedToken.roles[0] : null;
    const userType = role != null
        ? role.authority.split("_")[1]
        : "CUSTOMER";

    console.log(userType)

    useEffect(() => {
        const fetchHighestRatedCars = async () => {
            try {
                const data = await fetchJSON("/cars/top-rated-available");
                setHighestRatedCars(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHighestRatedCars();
    }, []);

    return (
        <div>
            <section id="home">
                <div id={"callToAction"}>
                  <h2 id={"jeremy-header"}>Up for an Adventure?</h2>
                  <CarContext.Provider value={[timeSpan, setTimeSpan]}>
                    <SearchDateFromTo />
                  </CarContext.Provider>
                </div>
            </section>
            {
                userType === "PROVIDER" && (
                    <section>
                        <h2 id={"home-page-provider-header"}>Provider Dashboard</h2>
                        <button className={"big-button home-page-provider-button"}>
                            <Link to={"/mypage/provider/orders"}>
                                Check your orders
                            </Link>
                        </button>
                        <button className={"big-button home-page-provider-button"}>
                            <Link to={"/mypage/provider/cars"}>
                                Manage your cars
                            </Link>
                        </button>
                    </section>
                )
            }
            <section>
                <h2 id={"home-page-car-list-header"}>Highest Rated Cars</h2>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                <CarList cars={highestRatedCars} />
            </section>
        </div>
    )
}
export default HomePage;
