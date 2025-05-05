import useTitle from "../../components/useTitle.jsx";
import Filters from "../../components/CarFilters/CarFilters.jsx";
import CarList from "../../components/CarList/CarList.jsx";
import CarSort from "../../components/CarSort/CarSort.jsx";
import sortMethods from "../../static/js/sortMethods.js";
import SearchDateFromTo from "../../components/SearchDateFromTo/SearchDateFromTo.jsx";
import { CarContext, defaultTimespan } from "../../context/CarContext.js";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import {fetchWithAuth} from "../../static/js/auth.js";
import "./CarsPage.css";


function CarsPage() {
    useTitle("Cars");
    let defaultSortMethod = (a,b) => { return sortMethods["price_high_low"] }

    const [searchParams] = useSearchParams();
    const [cars, setCars] = useState(null);
    const [filters, setFilters] = useState(null);
    const [sortMethod, setSortMethod] = useState(defaultSortMethod);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [fromToDate, setFromToDate] = useState({
        dateFrom: searchParams.get("dateFrom") || defaultTimespan.dateFrom,
        dateTo: searchParams.get("dateTo") || defaultTimespan.dateTo,
        timeFrom: searchParams.get("timeFrom") || defaultTimespan.timeFrom,
        timeTo: searchParams.get("timeTo") || defaultTimespan.timeTo
    });

    // Fetch data when search changes (timespan)
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
                    <div id="car-controls" className="col-3">
                        <div className={"carlist-controls"}>
                            <SearchDateFromTo />
                            <Filters cars={cars} />
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

export default CarsPage;
