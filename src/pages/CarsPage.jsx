import useTitle from "../components/useTitle.jsx";
import Filters from "../components/Filters.jsx";
import CarList from "../components/CarList.jsx";
import SearchDateFromTo from "../components/SearchDateFromTo.jsx";
import { CarContext } from "../context/CarContext.js";
import React, { useState, useEffect } from 'react';
import {fetchWithAuth} from "../static/js/auth.js";

//TODO: Implement the fetch from frontend, and display serach if not fetch has been made before
function renderPage(fromToDate, setFromToDate, cars, filters, updateFilters) {
    if (cars === null) {
        return (
            <h1>No soup for You!</h1>
        )
    } else {
        return (
            <CarContext.Provider value={[fromToDate, setFromToDate]}>
                <div className="row">
                    <div className="col-3">
                        <div className={"filter"}>
                            <h4>Search</h4>
                            <SearchDateFromTo />

                            <h4>Filter</h4>
                            <Filters cars={cars} updateFilters={updateFilters} />
                        </div>
                    </div>
                    <div className="col-9">
                        <div className={"car-grid"}>
                            <CarList cars={cars} filters={filters}/>
                        </div>
                    </div>
                </div>
            </CarContext.Provider>
        )
    }
}

function CarsPage() {
    useTitle("Cars");
    const [fromToDate, setFromToDate] = useState({
        dateFrom: '2025-04-01',
        dateTo: '2025-05-17',
        timeFrom: '08:00',
        timeTo: '17:00'
    });
    const [cars, setCars] = useState(null);
    const [filters, setFilters] = useState(null);

    function updateFilters(newFilters) {
        setFilters(newFilters)
    }

    // search cars on first render
    // and when changing timespan
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(
                import.meta.env.VITE_BACKEND_URL + ":" +
                import.meta.env.VITE_BACKEND_PORT + "/cars", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify(fromToDate),
                }
            );

            let data = await response.json();
            setCars(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
      };

      fetchData();
    }, [fromToDate]);

    // Re-render when cars or filters change
    return renderPage(fromToDate, setFromToDate, cars, filters, updateFilters);

}

export default CarsPage;
