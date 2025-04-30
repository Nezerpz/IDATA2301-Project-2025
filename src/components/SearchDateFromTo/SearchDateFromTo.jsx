import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './searchDateFromTo.css';
import { CarContext } from '../../context/CarContext.js';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SearchDateFromTo() {
    const navigate = useNavigate();
    const path = window.location.pathname;
    const isCarsPage = path.includes("cars");
    let [timespan, setTimespan] = useContext(CarContext);
    const [newTimespan, setNewTimespan] = useState(timespan);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setTimespan({ ...newTimespan });

        const queryParams = new URLSearchParams({
            dateFrom: newTimespan.dateFrom,
            timeFrom: newTimespan.timeFrom,
            dateTo: newTimespan.dateTo,
            timeTo: newTimespan.timeTo,
        }).toString();

        navigate(`/cars?${queryParams}`);
    };

    //TODO: Make the return time increment hourly (Can be done by making it into text, and creating a custom select time component)
    const handleChange = (event) => {
        const { id, value } = event.target;
        setNewTimespan((prevData) => ({ ...prevData, [id]: value }));
    };

    if (timespan == null) {
        return <h1>No cars available in timespan</h1>
    }

    else {
        return (
            <form className="search-date-from-to" onSubmit={handleSubmit}>

                <label htmlFor="from">
                    <span className={"search-heading"}>From</span>

                    <DatePicker id={"dateFrom"} selected={newTimespan.dateFrom} onChange={(date) => handleChange(date)}/>
                    <input type="time" name="timeFrom" id="timeFrom" step={"900"}
                        value={newTimespan.timeFrom}
                        onChange={handleChange} />

                </label>

                <label htmlFor="to">
                    <span className={"search-heading"}>To</span>

                    <DatePicker id={"dateTo"} selected={newTimespan.dateTo} onChange={handleChange} />
                    <input type="time" name="timeTo" id="timeTo" step={"900"}
                        value={newTimespan.timeTo}
                        onChange={handleChange} />
                </label>

                {isCarsPage 
                    ? (<button type="submit" 
                            className="big-button">Search
                        </button>) 
                    : (<button type="submit" 
                            className="big-button" 
                            onClick={() => navigate("/cars")}>Search
                        </button>)}
            </form>
        );
    }
}

SearchDateFromTo.propTypes = {
    setFromToDate: PropTypes.func
}

export default SearchDateFromTo;
