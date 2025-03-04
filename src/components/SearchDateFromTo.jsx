import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../static/css/searchDateFromTo.css';

function SearchDateFromTo() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ dateFrom: '', dateTo: '' });

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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <form className="search-date-from-to" onSubmit={handleSubmit}>
            <div className="input-with-label">
                <label htmlFor="from">
                    <span>From</span>
                    <input type="date" name="dateFrom" id="from" value={formData.dateFrom} onChange={handleChange} />
                </label>
            </div>
            <label htmlFor="to">
                <span>To</span>
                <input type="date" name="dateTo" id="to" value={formData.dateTo} onChange={handleChange} />
            </label>
            <button type="submit">Find car</button>
        </form>
    );
}

export default SearchDateFromTo;