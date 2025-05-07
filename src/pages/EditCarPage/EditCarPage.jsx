import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {fetchWithAuth} from "../../static/js/auth.js";

async function saveChanges(car) {
    console.log(car);
    try {
        const response = await fetchWithAuth("/cars/" + car.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(car)
        });
        if (response.status === 404) {
            throw new Error('Car not found');
        }  else if (response.status === 401) {
            throw new Error('Unauthorized');
        } else if (!response.ok) {
            throw new Error('Failed to update car');
        }
        alert("Car details updated successfully!");
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

function renderPage(car, setCar, manufacturers, transmissionTypes, fuelTypes, carStatus, handleSubmit) {
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
                    <span>Status</span>
                    <select placeholder={"Select status"} value={car.status} onChange={(e) => setCar({ ...car, status: e.target.value })}>
                        {carStatus.map((value, index) => (
                        <option key={index}>{value}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <span>Number of seats</span>
                    <input type="number" placeholder="Enter number of seats" value={car.numberOfSeats} onChange={(e) => setCar({ ...car, numberOfSeats: e.target.value })} />
                </label>
                <label>
                    <span>Transmission</span>
                    <select placeholder="Select transmission" value={car.transmissionType} onChange={(e) => setCar({ ...car, transmissionType: e.target.value })}>
                        {transmissionTypes.map((value, index) => (
                            <option key={index}>{value}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <span>Fuel</span>
                    <select placeholder="Select fuel" value={car.fuelType} onChange={(e) => setCar({ ...car, fuelType: e.target.value })}>
                        {fuelTypes.map((value, index) => (
                            <option key={index}>{value}</option>
                        ))}
                    </select>
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
                            <button className={"big-button"} type="button" onClick={() => removeFeature(index)}>Remove</button>
                        </div>
                    ))}
                    <button className={"big-button"} type="button" onClick={addFeature}>Add Feature</button>
                </label>
                <label>
                    <span>Image</span>
                    <input type="file" placeholder="Upload image" />
                </label>
                <button className={"big-button"} type="submit">Save changes</button>
            </form>
        </div>
    );
}

function EditCarPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [manufacturers, setManufacturers] = useState([]);
    const [transmissionTypes, setTransmissionTypes] = useState([]);
    const [fuelTypes, setFuelTypes] = useState([]);
    const [carStatus, setCarStatus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response = await fetchWithAuth("/cars/" + id, {
                    headers: {
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

    //TODO: Condense into one fetch function
    useEffect(() => {
        const fetchManufacturersData = async () => {
            try {
                let response = await fetchWithAuth("/manufacturers");
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

    useEffect(() => {
        const fetchTransmissionTypesData = async () => {
            try {
                let response = await fetchWithAuth("/transmission-types");
                let data = await response.json();
                setTransmissionTypes(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchTransmissionTypesData();
    }, []);

    useEffect(() => {
        const fetchFuelTypesData = async () => {
            try {
                let response = await fetchWithAuth("/fuel-types");
                let data = await response.json();
                setFuelTypes(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchFuelTypesData();
    }, []);

    useEffect(() => {
        const fetchCarStatusData = async () => {
            try {
                let response = await fetchWithAuth("/car-status");
                let data = await response.json();
                setCarStatus(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchCarStatusData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        saveChanges(car);
        let path = window.location.pathname;
        let pathTo = "provider";
        let isAdmin = path.includes("admin");
        if (isAdmin) {
            pathTo = "admin";
        }
        navigate(`/mypage/${pathTo}/cars`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!car || manufacturers.length === 0) return <div>Loading data...</div>;

    return renderPage(car, setCar, manufacturers, transmissionTypes, fuelTypes, carStatus, handleSubmit);
}

export default EditCarPage;
