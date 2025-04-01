import useTitle from "../components/useTitle.jsx";
import Filters from "../components/Filters.jsx";
import CarList from "../components/CarList.jsx";
import SearchDateFromTo from "../components/SearchDateFromTo.jsx";
import React, { useState, useEffect } from 'react';

//TODO: Implement the fetch from frontend, and display serach if not fetch has been made before
function renderPage(cars) {
    if (cars === null) {
        return (
            <div>
                <SearchDateFromTo />
            </div>
        )
    } else {
        return (
            <div className="row">
                <div className="col-3">
                    <Filters cars={cars}/>
                </div>
                <div className="col-9">
                    <div className={"car-grid"}>
                        <CarList cars={cars}/>
                    </div>
                </div>
            </div>
        )
    }
}

function CarsPage() {
    useTitle("Cars");
    const [cars, setCars] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
            let response = await fetch(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/cars");
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

export default CarsPage;
