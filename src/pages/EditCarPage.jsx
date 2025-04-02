import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

async function saveChanges(car) {
    const token = localStorage.getItem("jwt");
    try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/cars/" + car.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(car)
        });
        if (!response.ok) {
            throw new Error('Failed to save changes');
        }
        alert("Car details updated successfully!");
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

function renderPage(car, setCar, manufacturers, handleSubmit) {
    const handleFeatureChange = (e, index) => {
        const newFeatures = [...car.features];
        newFeatures[index] = e.target.value;
        setCar({ ...car, features: newFeatures });
    };

    const addFeature = () => {
        setCar({ ...car, features: [...car.features, ""] });
    };

    const removeFeature = (index) => {
        const newFeatures = car.features.filter((_, i) => i !== index);
        setCar({ ...car, features: newFeatures });
    };

    return (
        <div>
            <h1>{car.manufacturer} {car.carModel}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Manufacturer</span>
                    <select placeholder="Select Manufacturer" value={car.manufacturer} onChange={(e) => setCar({ ...car, manufacturer: e.target.value })}>
                        {manufacturers.map((value, index) => (
                            <option key={index}>{value}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <span>Model</span>
                    <input type="text" placeholder="Enter Model" value={car.carModel} onChange={(e) => setCar({ ...car, carModel: e.target.value })} />
                </label>
                <label>
                    <span>Number of seats</span>
                    <input type="number" placeholder="Enter number of seats" value={car.numberOfSeats} onChange={(e) => setCar({ ...car, numberOfSeats: e.target.value })} />
                </label>
                <label>
                    <span>Transmission type</span>
                    <input type="text" placeholder="Enter transmission type" value={car.transmissionType} onChange={(e) => setCar({ ...car, transmissionType: e.target.value })} />
                </label>
                <label>
                    <span>Fuel type</span>
                    <input type="text" placeholder="Enter fuel type" value={car.fuelType} onChange={(e) => setCar({ ...car, fuelType: e.target.value })} />
                </label>
                <label>
                    <span>Price</span>
                    <input type="number" placeholder="Enter price" value={car.price} onChange={(e) => setCar({ ...car, price: e.target.value })} />
                </label>
                <label>
                    <span>Production year</span>
                    <input type="number" placeholder="Enter production year" value={car.productionYear} onChange={(e) => setCar({ ...car, productionYear: e.target.value })} />
                </label>
                <label>
                    <span>Features</span>
                    {car.features.map((feature, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                placeholder="Enter feature"
                                value={feature}
                                onChange={(e) => handleFeatureChange(e, index)}
                            />
                            <button type="button" onClick={() => removeFeature(index)}>Remove</button>
                        </div>
                    ))}
                    <button type="button" onClick={addFeature}>Add Feature</button>
                </label>
                <label>
                    <span>Image</span>
                    <input type="file" placeholder="Upload image" />
                </label>
                <button type="submit">Save changes</button>
            </form>
        </div>
    );
}

function EditCarPage() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [manufacturers, setManufacturers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("jwt");
                let response = await fetch(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/cars/" + id, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                let data = await response.json();
                setCar(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchManufacturersData = async () => {
            try {
                let response = await fetch(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/manufacturers");
                let data = await response.json();
                setManufacturers(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchManufacturersData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        saveChanges(car);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!car || manufacturers.length === 0) return <div>Loading data...</div>;

    return renderPage(car, setCar, manufacturers, handleSubmit);
}

export default EditCarPage;