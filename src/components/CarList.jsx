import React, { useEffect, useState } from "react";
import Car from "./Car.jsx";

function CarList () {
    const [cars, setCars] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchCars() {
            try {
                let response = await fetch(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/cars");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let cars = await response.json();
                setCars(cars);
            } catch (error) {
                setError(error.message);
                console.error("Failed to fetch cars:", error);
            }
        }

        fetchCars().then(r => console.log("Fetched cars"));
    }, []);

    return (
        <div>
            {error ? (
                <div>Error: {error}</div>
            ) : (
                cars.map((car, index) => (
                    <Car key={index} car={car} readOnly={true} />
                ))
            )}
        </div>
    );
}

export default CarList;
