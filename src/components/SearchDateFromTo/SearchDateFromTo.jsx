import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './searchDateFromTo.css';
import { CarContext } from '../../context/CarContext.js';

import { DatePicker, TimePicker } from 'rsuite';
import 'rsuite/TimePicker/styles/index.css';

function SearchDateFromTo() {
    const navigate = useNavigate();
    const path = window.location.pathname;
    const isCarsPage = path.includes("cars");
    let [timespan, setTimespan] = useContext(CarContext);
    const [newDateFrom, setNewDateFrom] = useState(new Date(timespan.dateFrom));
    const [newTimeFrom, setNewTimeFrom] = useState(new Date(`${timespan.dateFrom} ${timespan.timeFrom}`));
    const [newDateTo, setNewDateTo] = useState(new Date(timespan.dateTo));
    const [newTimeTo, setNewTimeTo] = useState(new Date(`${timespan.dateTo} ${timespan.timeTo}`));

    const handleSubmit = async (event) => {
        event.preventDefault();
        let timespan = {
            dateFrom: (newDateFrom.toISOString().split('T')[0]),
            timeFrom: ('0'  + newTimeFrom.getHours()).slice(-2)+':'+('0' + newTimeFrom.getMinutes()).slice(-2),
            dateTo: (newDateTo.toISOString().split('T')[0]),
            timeTo: ('0'  + newTimeTo.getHours()).slice(-2)+':'+('0' + newTimeTo.getMinutes()).slice(-2),
        }
        console.debug(timespan)
        setTimespan({...timespan});
        const queryParams = new URLSearchParams(timespan).toString();
        navigate(`/cars?${queryParams}`);
    };


    if (timespan == null) {
        return <h1>No cars available in timespan</h1>
    }

    else {
        return (
            <form className="search-date-from-to" onSubmit={handleSubmit}>

                <label htmlFor="from">
                    <span className={"search-heading"}>From</span>

                    <DatePicker id={"dateFrom"} 
                        format="dd.MM.yyyy" 
                        showWeekNumbers 
                        size="sm"
                        defaultValue={newDateFrom} 
                        onChange={(date) => {setNewDateFrom(date)}}/>

                    <TimePicker id={"timeFrom"} 
                        format="HH:mm"
                        showWeekNumbers 
                        size="sm"
                        editable={true}
                        defaultValue={newTimeFrom}
                        hideMinutes={minute => minute % 15 !== 0}
                        onChange={(time) => {setNewTimeFrom(time)}}/> 

                </label>

                <label htmlFor="to">
                    <span className={"search-heading"}>To</span>

                    <DatePicker id={"dateTo"} 
                        format="dd.MM.yyyy" 
                        size="sm"
                        defaultValue={newDateTo} 
                        onChange={(date)=> setNewDateTo(date)}/>

                    <TimePicker id={"timeTo"} 
                        format="HH:mm"
                        size="sm"
                        editable={true}
                        defaultValue={newTimeTo}
                        hideMinutes={minute => minute % 15 !== 0} 
                        onChange={(time) => {setNewTimeTo(time)}}/> 
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
