import useTitle from "../components/useTitle.jsx";
import Filters from "../components/Filters.jsx";
import CarList from "../components/CarList.jsx";
import SearchDateFromTo from "../components/SearchDateFromTo.jsx";
import React, { useState, useEffect } from 'react';

//TODO: Implement the fetch from frontend, and display serach if not fetch has been made before
function renderPage(cars, filters, setFilters) {
    if (cars === null) {
        return (
            <h1>No soup for You!</h1>
        )
    } else {
        return (
            <div className="row">
                <div className="col-3">
                    <div className={"filter"}>
                        <h4>Search</h4>
                        <SearchDateFromTo />

                        <h4>Filters</h4>
                        <Filters cars={cars} setFilters={setFilters}/>
                    </div>
                </div>
                <div className="col-9">
                    <div className={"car-grid"}>
                        <CarList cars={cars} filters={filters}/>
                    </div>
                </div>
            </div>
        )
    }
}

function Cars() {
    useTitle("Cars");
    const [cars, setCars] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState(null);

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
    return renderPage(cars, filters, setFilters);
}

export default Cars;

