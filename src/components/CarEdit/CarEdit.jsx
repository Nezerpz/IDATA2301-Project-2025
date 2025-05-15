import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { fetchJSON, fetchWithAuth } from "../../static/js/auth.js"
import "./CarEdit.css";

function CarEdit({car, setCar, addingNewCar, title, actionText}) {
    const [manufacturers, setManufacturers] = useState(null)
    const [transmissionTypes, setTransmissionTypes] = useState(null)
    const [fuelTypes, setFuelTypes] = useState(null)
    const [features, setFeatures] = useState(null)

    const options = features != null
        ? features.map(f => ({ value: f.id, label: f.featureName }))
        : [];


    //console.debug(`adding new car? ${addingNewCar}`)

    // Helper to update selected features
    function updateSelectedFeatures(selectElement) {
        let newFeatures = Array.from(selectElement.children)
            .filter(option => option.selected)
            .map(option => option.value)
        setCar({ ...car, features: newFeatures })
    }

    // Fetch required info
    useEffect(() => {
        (async () => {
            try {
                if (manufacturers == null) {
                    const data = await fetchJSON("/manufacturers", { method: "GET" });
                    setManufacturers(data);
                    if (addingNewCar && car.manufacturer === "") {
                        setCar(prevCar => ({ ...prevCar, manufacturer: data[0] }));
                    }
                }

                if (transmissionTypes == null) {
                    const data = await fetchJSON("/transmission-types", { method: "GET" });
                    setTransmissionTypes(data);
                    if (addingNewCar && car.transmissionType === "") {
                        setCar(prevCar => ({ ...prevCar, transmissionType: data[0] }));
                    }
                }

                if (fuelTypes == null) {
                    const data = await fetchJSON("/fuel-types", { method: "GET" });
                    setFuelTypes(data);
                    if (addingNewCar && car.fuelType === "") {
                        setCar(prevCar => ({ ...prevCar, fuelType: data[0] }));
                    }
                }

                if (features == null) {
                    const data = await fetchJSON("/features", { method: "GET" });
                    setFeatures(data);
                    if (addingNewCar && car.features.length === 0) {
                        setCar(prevCar => ({ ...prevCar, features: [] }));
                    }
                }
            } catch (e) {
                console.error(e);
            }
        })();
    }, [manufacturers, transmissionTypes, fuelTypes, features, addingNewCar, car]);

    // Used to set image for Car
    async function uploadImage(id, event, setCar) {
        event.preventDefault()
        let file = event.target.files[0]
        const formData = new FormData()
        formData.append('file', file)

        // Send image
        let response = await fetchWithAuth(`/upload`, {
            method: "POST",
            body: formData
        })

        console.log(response)

        if (response.status === 422) {
            const errorMessage = await response.text();
            alert(errorMessage);
            return;
        }

        if (response.ok) {
            console.log("Image uploaded successfully")
            let imagePath = await response.text();
            //console.log(imagePath)
            setCar({...car, imagePath: imagePath})
        }

        else {
            alert("Image upload failed")
        }
    }

    function validateCarState(car) {
        return car == undefined 
            ? false
            : ("manufacturer"     in car ? car.manufacturer     : false) && 
              ("carModel"         in car ? car.carModel         : false) && 
              ("numberOfSeats"    in car ? car.numberOfSeats    : false) &&
              ("transmissionType" in car ? car.transmissionType : false) &&
              ("fuelType"         in car ? car.fuelType         : false) &&
              ("price"            in car ? car.price            : false) &&
              ("productionYear"   in car ? car.productionYear   : false) &&
              ("features"         in car ? car.features         : false) 
    }

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
    const handleSubmit = (addingNewCar, car) => {
        // Map features to only include ids
        const carToSend = {
            ...car,
            features: car.features.map(feature => feature.id)
        };

        if (addingNewCar) {
            addCar(carToSend);
        } else {
            updateCar(carToSend);
        }
    };

    // cope
    if (car == undefined) {
        car = {
            manufacturer: "",
            carModel: "",
            numberOfSeats: "",
            transmissionType: "",
            fuelType: "",
            price: "",
            productionYear: "",
            features: [],
        }
    }

    return (
        <div>
            <h1>{title}</h1>
            <form className={"car-edit"} onSubmit={(e) => e.preventDefault()}>
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
                            value={car.carModel} 
                            onChange={(e) => setCar({ ...car, carModel: e.target.value })} />
                </label>
                <label>
                    <span className={"car-edit-property-heading"}>Number of seats</span>
                        <input type="number" placeholder="Enter number of seats" min={1}
                            className={"car-edit-property-input"}
                            value={car.numberOfSeats} 
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
                            value={car.price} 
                            onChange={(e) => setCar({ ...car, price: e.target.value })} />
                </label>
                <label>
                    <span className={"car-edit-property-heading"}>Production year</span>
                        <input type="number" placeholder="Enter production year" min={1885}
                            className={"car-edit-property-input"}
                            value={car.productionYear} 
                            onChange={(e) => setCar({ ...car, productionYear: e.target.value })} />
                </label>
                <label>
                    <span className={"car-edit-property-heading"}>Features </span>
                    <Select
                        options={options}
                        value={options.filter(option => car.features.some(feature => feature.id === option.value))}
                        isMulti
                        onChange={selectedOptions => {
                            const updatedFeatures = selectedOptions.map(option =>
                                features.find(feature => feature.id === option.value)
                            );
                            console.log(updatedFeatures)
                            setCar({ ...car, features: updatedFeatures });
                        }}
                    />
                </label>
                <label>
                    <span className={"car-edit-property-heading"}>Image</span>
                    <input type="file" placeholder="Upload image" accept="image/png, image/jpeg"
                        onChange={e => uploadImage(car.id, e, setCar)}/>
                </label>
                <button className={"big-button"} type="submit"
                    disabled={!validateCarState(car)}
                    onClick={e => handleSubmit(addingNewCar, car)}>{actionText}</button>
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
