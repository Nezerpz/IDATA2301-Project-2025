import PropTypes from 'prop-types'
import React, { useState, useEffect } from "react";
import { fetchJSON, fetchWithAuth } from "../../static/js/auth.js"

function CarEdit({carToEdit, title, actionText}) {
    const [manufacturers, setManufacturers] = useState(null)
    const [manufacturer, setManufacturer] = useState("none")
    const [car, setCar] = useState(carToEdit == null ? { features: [] } : carToEdit)
    const [features, setFeatures] = useState(null)

    function updateSelectedFeatures(selectElement) {
        let newFeatures = Array.from(selectElement.children)
            .filter(option => option.selected)
            .map(option => option.value)
        setCar({ ...car, newFeatures })
    }

    useEffect(() => { (async () => {
        if (manufacturers == null) {
            try {
                let data = await fetchJSON("/manufacturers", { method: "GET" })
                setManufacturers(data)
            }   catch (e) { console.error(e) }
        }

        if (features == null) {
            try {
                let data = await fetchJSON("/features", { method: "Get" })
                console.debug(data)
                setFeatures(data)
            }   catch (e) { console.error(e) }
        }
    })()}, [manufacturers, features, car])

    // Function used to update existing car
    const updateCar = async (car) => {
        try {
            const response = await fetchWithAuth("/cars/" + car.id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(car)
            });

            // Handling return codes
            if (response.status === 404) {
                throw new Error('Car not found');
            }  else if (response.status === 401) {
                throw new Error('Unauthorized');
            } else if (!response.ok) {
                throw new Error('Failed to update car');
            }

            alert("Car details updated successfully!");
        } 

        catch (error) {
            alert(`Error: ${error.message}`);
        }
    }

    // Function used to register new car
    const addCar = async (car) => {
        try {
            const response = await fetchWithAuth("/cars/add", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(car)
            });

            // Handle return codes
            if (response.status === 404) {
                throw new Error('Car not found');
            }  else if (response.status === 401) {
                throw new Error('Unauthorized');
            } else if (!response.ok) {
                throw new Error('Failed to update car');
            }

            alert("Car details updated successfully!");
        } 

        catch (error) {
            alert(`Error: ${error.message}`);
        }
    }

    // Callback for submit button
    const handleSubmit = (e, carToEdit, car) => {
        e.preventDefault()
        if (carToEdit != null) { updateCar(car) }
        else                   { addCar(car)       }
    }

    return (
        <div>
            <h1>{title}</h1>
            <form onSubmit={(e) => handleSubmit(e, carToEdit, car)}>
                <label>
                    <span>Manufacturer</span>
                    <select placeholder="Select Manufacturer" 
                        value={manufacturer} 
                        onChange={e => setManufacturer(e.target.value)}>
                        {manufacturers != null 
                            ? manufacturers.map((value, i) => (
                                <option key={i}>{value}</option>))
                            : <option>none</option>}
                    </select>
                </label>
                <label>
                    <span>Model</span>
                    {carToEdit != null 
                        ? <input type="text" placeholder="Enter Model" 
                            value={car.carModel} 
                            onChange={(e) => setCar({ ...car, carModel: e.target.value })} />
                        : <input type="text" placeholder="Enter Model" />}
                </label>
                <label>
                    <span>Number of seats</span>
                    {carToEdit != null 
                        ? <input type="number" placeholder="Enter number of seats" 
                            value={car.numberOfSeats} 
                            onChange={(e) => setCar({ ...car, numberOfSeats: e.target.value })} />
                        : <input type="number" placeholder="Enter number of seats" />}
                </label>
                <label>
                    <span>Transmission type</span>
                    {carToEdit != null 
                        ? <select placeholder="Select transmission type" 
                            value={car.transmissionType} 
                            onChange={(e) => setCar({ ...car, transmissionType: e.target.value })} />
                        : <select placeholder="Select transmission type" />}
                </label>
                <label>
                    <span>Fuel type</span>
                    {carToEdit != null 
                        ? <input type="text" placeholder="Enter fuel type" 
                            value={car.fuelType} 
                            onChange={(e) => setCar({ ...car, fuelType: e.target.value })} />
                        : <input type="text" placeholder="Enter fuel type" />}
                </label>
                <label>
                    <span>Price</span>
                    {carToEdit != null 
                        ? <input type="number" placeholder="Enter price" 
                            value={car.price} 
                            onChange={(e) => setCar({ ...car, price: e.target.value })} />
                        : <input type="number" placeholder="Enter price" />}
                </label>
                <label>
                    <span>Production year</span>
                    {carToEdit != null 
                        ? <input type="number" placeholder="Enter production year" 
                            value={car.price} 
                            onChange={(e) => setCar({ ...car, productionYear: e.target.value })} />
                        : <input type="number" placeholder="Enter production year" />}
                </label>
                <label>
                    <span>Features</span>
                    <select placeholder="Select Features" multiple
                        value={car["features"]}
                        onChange={e => updateSelectedFeatures(e.target)}>
                        {features != null 
                            ? features
                                .map(f => [f["id"], f["featureName"]])
                                .map(f => (
                                    <option key={f[0]} value={f[0]}>
                                        {f[1]}
                                    </option>))
                            : <option>none</option>}
                    </select>
                </label>
                <label>
                    <span>Image</span>
                    <input type="file" placeholder="Upload image" />
                </label>
                <button className={"big-button"} type="submit">{actionText}</button>
            </form>
        </div>
    );
}

CarEdit.propTypes = {
    carToEdit: PropTypes.shape({
        
    }),
    title: PropTypes.string,
    actionText: PropTypes.string

}

export default CarEdit;
