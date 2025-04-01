import useTitle from "../components/useTitle.jsx";
import Filters from "../components/Filters.jsx";
import CarList from "../components/CarList.jsx";
import SearchDateFromTo from "../components/SearchDateFromTo.jsx";
import React, { useState, useEffect } from 'react';

//TODO: Implement the fetch from frontend, and display serach if not fetch has been made before
function renderPage(setFromToDate, cars, filters, updateFilters) {
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
                        <SearchDateFromTo setFromToDate={setFromToDate}/>

                        <h4>Filters</h4>
                        <Filters cars={cars} updateFilters={updateFilters} />
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
    const [fromToDate, setFromToDate] = useState(null);
    const [cars, setCars] = useState(null);
    const [filters, setFilters] = useState(null);

    function updateFilters(newFilters) {
        setFilters(newFilters)
    }

    // search cars on first render 
    // and when changing timespan
    var [loading, setLoading] = useState(true);
    var [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(
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
    return renderPage(setFromToDate, cars, filters, updateFilters);

}

export default Cars;

