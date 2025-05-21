import PropTypes from 'prop-types'
import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { fetchJSON, fetchWithAuth } from "../../static/js/auth.js"
import "./CarEdit.css";
import {findVariable} from "eslint-plugin-react/lib/util/variable.js";

function CarEdit({car, setCar, addingNewCar, title, actionText}) {
    const [manufacturers, setManufacturers] = useState(null)
    const [transmissionTypes, setTransmissionTypes] = useState(null)
    const [fuelTypes, setFuelTypes] = useState(null)
    const [features, setFeatures] = useState(null)
    const [carStatus, setCarStatus] = useState(null)

    const options = features != null
        ? features.map(f => ({ value: f.id, label: f.featureName }))
        : [];

    const transmissionOptions = transmissionTypes != null
        ? transmissionTypes.map(t => ({ value: t, label: t }))
        : [];

    const fuelOptions = fuelTypes != null
        ? fuelTypes.map(t => ({ value: t, label: t }))
        : [];

    const manufacturerOptions = manufacturers != null
        ? manufacturers.map(t => ({ value: t, label: t }))
        : [];

    const carStatusOptions = carStatus != null
        ? carStatus.map(t => ({ value: t, label: t }))
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

                if (carStatus == null) {
                    const data = await fetchJSON("/car-status", { method: "GET" });
                    setCarStatus(data);
                    if (addingNewCar && car.carStatus === "") {
                        setCar(prevCar => ({ ...prevCar, carStatus: data[0] }));
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
                    <h5 className={"car-edit-property-heading"}>Manufacturer</h5>
                    <Select placeholder="Select Manufacturer"
                        options={manufacturerOptions}
                        value={manufacturerOptions.filter(option => car.manufacturer === option.value)}
                        onChange={selectedOption => {
                            setCar({ ...car, manufacturer: selectedOption.value })
                        }} />

                </label>
                <label>
                    <h5 className={"car-edit-property-heading"}>Model</h5>
                        <input type="text" placeholder="Enter Model" 
                            className={"car-edit-property-input"}
                            value={car.carModel} 
                            onChange={(e) => setCar({ ...car, carModel: e.target.value })} />
                </label>
                <label>
                    <h5 className={"car-edit-property-heading"}>Number of seats</h5>
                        <input type="number" placeholder="Enter number of seats" min={1}
                            className={"car-edit-property-input"}
                            value={car.numberOfSeats} 
                            onChange={(e) => setCar({ ...car, numberOfSeats: e.target.value })} />
                </label>
                <label>
                    <h5 className={"car-edit-property-heading"}>Transmission type</h5>
                        <Select placeholder="Select transmission type"
                                options={transmissionOptions}
                                value={transmissionOptions.filter(option => car.transmissionType === option.value)}
                            onChange={selectedOption => {
                                setCar({ ...car, transmissionType: selectedOption.value })
                            }}
                        />
                </label>
                <label>
                    <h5 className={"car-edit-property-heading"}>Fuel type</h5>
                    <Select placeholder="Select fuel type"
                        options={fuelOptions}
                        value={fuelOptions.filter(option => car.fuelType === option.value)}
                        onChange={selectedOption => {
                            setCar({ ...car, fuelType: selectedOption.value });
                        }} />
                </label>
                <label>
                    <h5 className={"car-edit-property-heading"}>Rental Price per Day</h5>
                         <input type="number" placeholder="Enter price" min={0}
                            className={"car-edit-property-input"}
                            value={car.price} 
                            onChange={(e) => setCar({ ...car, price: e.target.value })} />
                </label>
                <label>
                    <h5 className={"car-edit-property-heading"}>Production year</h5>
                        <input type="number" placeholder="Enter production year" min={1885}
                            className={"car-edit-property-input"}
                            value={car.productionYear} 
                            onChange={(e) => setCar({ ...car, productionYear: e.target.value })} />
                </label>
                <label>
                    <h5 className={"car-edit-property-heading"}>Features </h5>
                    <Select
                        options={options}
                        id="car-edit-multi-select"
                        value={options.filter(option => car.features.some(feature => feature.id === option.value))}
                        isMulti
                        onChange={selectedOptions => {
                            const updatedFeatures = selectedOptions.map(option =>
                                features.find(feature => feature.id === option.value)
                            );
                            setCar({ ...car, features: updatedFeatures });
                        }}
                    />
                </label>
                <label>
                    <h5 className={"car-edit-property-heading"}>Image</h5>
                    <input type="file" placeholder="Upload image" accept="image/png, image/jpeg"
                        onChange={e => uploadImage(car.id, e, setCar)}/>
                </label>
                <label>
                    <h5 className={"car-edit-property-heading"}>Car status</h5>
                    <Select placeholder="Select car status"
                        options={carStatusOptions}
                        value={carStatusOptions.filter(option => car.carStatus === option.value)}
                        onChange={selectedOption => {
                            setCar({ ...car, carStatus: selectedOption.value });
                        }} />
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
