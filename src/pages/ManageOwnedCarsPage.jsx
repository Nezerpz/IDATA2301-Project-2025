
import OwnedCarsList from '../components/OwnedCarsList.jsx';
import PropTypes from "prop-types";
import Car from "../components/Car.jsx";
import useTitle from "../components/useTitle.jsx";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import SearchableFieldTable from "../components/SearchableFieldTable.jsx";

//TODO: Make the fetchFunction get the cars from "/cars/providerId".
// The providerId should be stored in the session storage.

function EditCar({row}){

}

function DeleteCar({row}) {
    const handleDelete = async () => {
        const token = localStorage.getItem("jwt");
        try {
            let response = await fetch(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/cars/" + row.id, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                alert("Car deleted successfully");
            } else {
                alert("Failed to delete car");
            }
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    return (
        <button onClick={handleDelete}>
            Delete
        </button>
    );
}

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
                const token = localStorage.getItem("jwt");
                let response = await fetch(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/cars/provider", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
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