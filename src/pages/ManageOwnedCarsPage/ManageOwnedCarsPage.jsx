
import OwnedCarsList from '../../components/OwnedCarsList/OwnedCarsList.jsx';
import PropTypes from "prop-types";
import Car from "../../components/Car/Car.jsx";
import useTitle from "../../components/useTitle.jsx";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {fetchWithAuth} from "../../static/js/auth.js";
import BackButton from "../../components/BackButton/BackButton.jsx";

function renderPage(cars) {
    const path = window.location.pathname;
    const isAdmin = path.includes("admin");

    if (isAdmin) {
        return (
            <>
                <div className={"flex-container-row flex-space-between margin-bottom-10px"}>
                    <BackButton />
                </div>
                <h1>List of all cars</h1>
                <OwnedCarsList cars={cars} />
            </>
        );
    }
    return(
        <>
            <div className={"flex-container-row flex-space-between margin-bottom-10px"}>
                <BackButton />
                <button className={"big-button"}>
                    <Link to={"/mypage/provider/cars/add"}>Add new car</Link>
                </button>
            </div>
            <h1>Cars</h1>
            <OwnedCarsList cars={cars}/>
        </>
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
