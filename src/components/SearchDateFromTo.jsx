import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../static/css/searchDateFromTo.css';

function SearchDateFromTo({setFromToDate}) {
    const navigate = useNavigate();
    const [timespan, setTimespan] = useState({ 
        dateFrom: '2025-04-01', 
        dateTo: '2025-05-17', 
        timeFrom: '08:00', 
        timeTo: '17:00' 
    });


    const handleSubmit = async (event) => {
        event.preventDefault();
        console.debug("it works")
        setFromToDate({...timespan});
    };

    //TODO: Make the return time increment hourly
    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(`updated ${name} = ${value}`)
        setTimespan((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <form className="search-date-from-to" onSubmit={handleSubmit}>

            <label htmlFor="from">
                <span>From</span>

                <input type="date" name="dateFrom" id="from" 
                    value={timespan.dateFrom} 
                    onChange={handleChange} />

                <input type="time" name="timeFrom" id="fromTime" step={"3600"}
                    value={timespan.timeFrom}
                    onChange={handleChange} />

            </label>

            <label htmlFor="to">
                <span>To</span>

                <input type="date" name="dateTo" id="to" 
                    value={timespan.dateTo} 
                    onChange={handleChange} />

                <input type="time" name="timeTo" id="toTime" step={"3600"}
                    value={timespan.timeTo}
                    onChange={handleChange} />

            </label>

            <button type="submit">Find car</button>
        </form>
    );
}

SearchDateFromTo.propTypes = {
    setFromToDate: PropTypes.func
}

export default SearchDateFromTo;
