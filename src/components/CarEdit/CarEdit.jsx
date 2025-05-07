import PropTypes from 'prop-types'
import React, { useState, useEffect } from "react";
import { fetchJSON, fetchWithAuth } from "../../static/js/auth.js"
import "./CarEdit.css";

function CarEdit({carToEdit, title, actionText}) {
    const [manufacturers, setManufacturers] = useState(null)
    const [transmissionTypes, setTransmissionTypes] = useState(null)
    const [fuelTypes, setFuelTypes] = useState(null)
    const [car, setCar] = useState(carToEdit != null ? carToEdit : { features: [] })
    const [features, setFeatures] = useState(null)

    // Helper to update selected features
    function updateSelectedFeatures(selectElement) {
        let newFeatures = Array.from(selectElement.children)
            .filter(option => option.selected)
            .map(option => option.value)
        setCar({ ...car, features: newFeatures })
    }

    // Fetch required info
    useEffect(() => { (async () => {
        if (manufacturers == null) {
            try {
                let data = await fetchJSON("/manufacturers", { method: "GET" })
                setManufacturers(data)
            }   catch (e) { console.error(e) }
        }

        if (transmissionTypes == null) {
            try {
                let data = await fetchJSON("/transmission-types", { method: "GET" })
                setTransmissionTypes(data)
            }   catch (e) { console.error(e) }
        }

        if (fuelTypes == null) {
            try {
                let data = await fetchJSON("/fuel-types", { method: "GET" })
                setFuelTypes(data)
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


    // Removes some code-duplication
    function handleReturnCodes(response) {
        if (response.status === 404) {
            throw new Error('Car not found');
        }  else if (response.status === 401) {
            throw new Error('Unauthorized');
        } else if (!response.ok) {
            throw new Error('Failed to update car');
        }
    }

    // Function used to update existing car
    const updateCar = async (car) => {
        try {
            const response = await fetchWithAuth("/cars/" + car.id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(car)
            });
            handleReturnCodes(response)
            alert("Car details updated successfully!");
        } 

        catch (error) {
            alert(`Error: ${error.message}`);
        }
    }

    // Function used to register new car
    const addCar = async (car) => {
        console.log("requerstbody car null?")
        console.log(car)
        try {
            const response = await fetchWithAuth("/cars/add", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(car)
            });
            handleReturnCodes(response)
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
            <form className={"car-edit"} onSubmit={(e) => handleSubmit(e, carToEdit, car)}>
                <label>
                    <span className={"car-edit-property-heading"}>Manufacturer</span>
                    <select placeholder="Select Manufacturer" 
                        className={"car-edit-property-input"}
                        value={car.manufacturer} 
                        onChange={e => setCar({ ...car, manufacturer: e.target.value})}>
                        {manufacturers != null 
                            ? manufacturers.map((value, i) => (
                                <option key={i}>{value}</option>))
                            : <option>None</option>}
                    </select>
                </label>
                <label>
                    <span className={"car-edit-property-heading"}>Model</span>
                        <input type="text" placeholder="Enter Model" 
                            className={"car-edit-property-input"}
                            value={car.carModel != undefined ? car.carModel : ""} 
                            onChange={(e) => setCar({ ...car, carModel: e.target.value })} />
                </label>
                <label>
                    <span className={"car-edit-property-heading"}>Number of seats</span>
                        <input type="number" placeholder="Enter number of seats" min={1}
                            className={"car-edit-property-input"}
                            value={car.numberOfSeats != undefined ? car.numberOfSeats : 5} 
                            onChange={(e) => setCar({ ...car, numberOfSeats: e.target.value })} />
                </label>
                <label>
                    <span className={"car-edit-property-heading"}>Transmission type</span>
                        <select className={"car-edit-property-input"} placeholder="Select transmission type" 
                            value={car.transmissionType} 
                            onChange={(e) => setCar({ ...car, transmissionType: e.target.value })} >
                            {transmissionTypes != null 
                                ? transmissionTypes
                                    .map((value, i) => (
                                        <option key={i} value={value}>
                                            {value}
                                        </option>))
                                : <option>None</option>}
                        </select>
                </label>
                <label>
                    <span className={"car-edit-property-heading"}>Fuel type</span>
                    <select className={"car-edit-property-input"} placeholder="Select fuel type" 
                        value={car.fuelType} 
                        onChange={(e) => setCar({ ...car, fuelType: e.target.value })} >
                        {fuelTypes != null 
                            ? fuelTypes
                                .map((value, i) => (
                                    <option key={i} value={value}>
                                        {value}
                                    </option>))
                            : <option>None</option>}
                    </select>
                        
                </label>
                <label>
                    <span className={"car-edit-property-heading"}>Rental Price per Day</span>
                         <input type="number" placeholder="Enter price" min={0}
                            className={"car-edit-property-input"}
                            value={car.price != undefined ? car.price : ""} 
                            onChange={(e) => setCar({ ...car, price: e.target.value })} />
                </label>
                <label>
                    <span className={"car-edit-property-heading"}>Production year</span>
                        <input type="number" placeholder="Enter production year" min={1885}
                            className={"car-edit-property-input"}
                            value={car.productionYear != undefined ? car.productionYear : ""} 
                            onChange={(e) => setCar({ ...car, productionYear: e.target.value })} />
                </label>
                <label>
                    <span className={"car-edit-property-heading"}>Features</span>
                    <select placeholder="Select Features" multiple
                        className={"car-edit-property-input"}
                        value={car.features}
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
                    <span className={"car-edit-property-heading"}>Image</span>
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
