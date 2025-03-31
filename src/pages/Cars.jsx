import useTitle from "../components/useTitle.jsx";
import Filters from "../components/Filters.jsx";
import CarList from "../components/CarList.jsx";
import SearchDateFromTo from "../components/SearchDateFromTo.jsx";
import React, { useState, useEffect } from 'react';

//TODO: Implement the fetch from frontend, and display serach if not fetch has been made before
function renderPage(cars, filters, setFromToDate, setFilters) {
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
    var [fromToDate, setFromToDate] = useState(null);
    var [cars, setCars] = useState(null);
    var [filters, setFilters] = useState(null);

    // search cars on first render 
    // and when changing timespan
    var [loading, setLoading] = useState(true);
    var [error, setError] = useState(null);
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
    }, [fromToDate]);

    // Re-render when cars or filters change
    useEffect(() => {
        return renderPage(cars, filters, setFromToDate, setFilters);
    }, [cars, filters])

}

export default Cars;

