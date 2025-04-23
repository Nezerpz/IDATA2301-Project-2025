
import OwnedCarsList from '../components/OwnedCarsList.jsx';
import PropTypes from "prop-types";
import Car from "../components/Car.jsx";
import useTitle from "../components/useTitle.jsx";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import SearchableFieldTable from "../components/SearchableFieldTable.jsx";
import {fetchWithAuth} from "../static/js/auth.js";

function renderPage(cars) {
    return(
        <div id={"manage-cars"}>
            <div className={"button-container-end"}>
                <button>
                    <Link to={"/mypage/provider/cars/add"}>Add new car</Link>
                </button>
            </div>
            <OwnedCarsList cars={cars}/>
        </div>
    )
}

function ManageOwnedCarsPage() {
    useTitle("Manage");
    const [cars, setCars] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const path = window.location.pathname;
                let endpoint = path.includes("provider") ? "/cars/provider" : "/cars" ;

                let response = await fetchWithAuth(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + endpoint);
                let data = await response.json();
                setCars(data);
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

    return renderPage(cars);
}

Car.propTypes = {
    car: PropTypes.shape({
        id: PropTypes.number,
        imagePath: PropTypes.string,
        carModel: PropTypes.string,
        price: PropTypes.number,
        numberOfSeats: PropTypes.number,
        productionYear: PropTypes.number,
        manufacturer: PropTypes.string,
        transmissionType: PropTypes.string,
        carStatus: PropTypes.string,
        user: PropTypes.string,
        fuelType: PropTypes.string,
        features: PropTypes.array
    })
}

export default ManageOwnedCarsPage;