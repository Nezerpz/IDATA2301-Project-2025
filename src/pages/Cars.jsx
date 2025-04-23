import useTitle from "../components/useTitle.jsx";
import Filters from "../components/Filters.jsx";
import CarList from "../components/CarList.jsx";
import CarSort from "../components/CarSort.jsx";
import sortMethods from "../util/sortMethods.js";
import SearchDateFromTo from "../components/SearchDateFromTo.jsx";
import { CarContext } from "../context/CarContext.js";
import React, { useState, useEffect } from 'react';


function Cars() {
    useTitle("Cars");

    const [cars, setCars] = useState(null);
    const [filters, setFilters] = useState(null);
    const [sortMethod, setSortMethod] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fromToDate, setFromToDate] = useState({ 
        dateFrom: '2025-04-01', 
        dateTo: '2025-05-17', 
        timeFrom: '08:00', 
        timeTo: '17:00' 
    });

    // Fetch data when search changes (timespan)
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
      }
      fetchData();
    }, [fromToDate]);


    // React is weird...
    function updateFilters(newFilters) {
        setFilters(newFilters)
    }

    // Return JSX
    if (cars == null) {
        return (
            <h1>No soup for You!</h1>
        )
    } else {
        return (
            <CarContext.Provider value={[fromToDate, setFromToDate, filters, updateFilters, sortMethod, setSortMethod]}>
                <div className="row">
                    <div className="col-3">
                        <div className={"filter"}>
                            <h4>Search</h4>
                            <SearchDateFromTo />

                            <h4>Filter</h4>
                            <Filters cars={cars} />

                            <h4>Sort</h4>
                            <CarSort />
                        </div>
                    </div>
                    <div className="col-9">
                        <div className={"car-grid"}>
                            <CarList cars={cars} />
                        </div>
                    </div>
                </div>
            </CarContext.Provider>
        )
    }

}

export default Cars;

