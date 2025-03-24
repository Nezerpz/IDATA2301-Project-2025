import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../static/css/searchDateFromTo.css';

function SearchDateFromTo() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ dateFrom: '', dateTo: '', timeFrom: '', timeTo: '' });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/cars", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            navigate('/cars');
        } else {
            // Handle error
            console.error('Failed to submit form');
        }
    };

    //TODO: Make the return time increment hourly
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <form className="search-date-from-to" onSubmit={handleSubmit}>
            <label htmlFor="from">
                <span>From</span>
                <input type="date" name="dateFrom" id="from" value={formData.dateFrom} onChange={handleChange} />
                <input type="time" name="timeFrom" id="fromTime" onChange={handleChange} step={"3600"}/>
            </label>
            <label htmlFor="to">
                <span>To</span>
                <input type="date" name="dateTo" id="to" value={formData.dateTo} onChange={handleChange} />
                <input type="time" name="timeTo" id="toTime" onChange={handleChange} step={"3600"}/>
            </label>
            <button type="submit">Find car</button>
        </form>
    );
}

export default SearchDateFromTo;
