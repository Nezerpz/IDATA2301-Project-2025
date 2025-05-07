import React, { useState, useEffect } from "react";

function CarEdit({carToEdit, title, actionText}) {
    const [manufacturers, setManufacturers] = useState(null)
    const [manufacturer, setManufacturer] = useState("none")
    const [car, setCar] = useState(carToEdit)
    const [selectedFeatures, setSelectedFeatures] = useState(car == null ? [] : null)
    const [features, setFeatures] = useState(null)

    function updateSelectedFeatures(selectElement) {
        let newFeatures = Array.from(selectElement.children)
            .filter(option => option.selected)
            .map(option => option.value)
        console.log("new features")
        console.log(newFeatures)
        setSelectedFeatures(newFeatures)
    }

    useEffect(() => {
        if (manufacturers == null) {
            const fetchData = async () => { 
                try {
                    const response = await fetch(
                        import.meta.env.VITE_BACKEND_URL + ":" +
                        import.meta.env.VITE_BACKEND_PORT + "/manufacturers"
                    )
                    let jsonData = await response.json()
                    console.debug(jsonData)
                    setManufacturers(jsonData)
                }
                catch (e) {
                    console.error(e)
                }
            }
            fetchData()
        }

        if (features == null) {
            const fetchData = async () => { 
                try {
                    const response = await fetch(
                        import.meta.env.VITE_BACKEND_URL + ":" +
                        import.meta.env.VITE_BACKEND_PORT + "/features"
                    )
                    let jsonData = await response.json()
                    console.debug(jsonData)
                    setFeatures(jsonData)
                }
                catch (e) {
                    console.error(e)
                }
            }
            fetchData()
        }


        if (selectedFeatures == null) {
            const fetchData = async () => { 
                try {
                    const response = await fetch(
                        import.meta.env.VITE_BACKEND_URL + ":" +
                        import.meta.env.VITE_BACKEND_PORT + `/car/${car["id"]}`
                    )
                    let jsonData = await response.json()
                    let featureData = jsonData["features"]
                    console.debug(featureData)
                    let theSelectedFeatures = featureData.map(selectedFeature => {
                        features
                            .some(f => f["featureName"] === selectedFeature)
                            .map(f  => f["id"])
                    })
                    
                    console.debug(theSelectedFeatures)
                    setSelectedFeatures(theSelectedFeatures)
                }
                catch (e) {
                    console.error(e)
                }
            }
            fetchData()
        }
    })

    const handleSubmit = (e, carToEdit) => {
        e.preventDefault()

        if (carToEdit != null) { 
            const updateCar = async () => {
                try {
                    const response = await fetchWithAuth(
                        import.meta.env.VITE_BACKEND_URL + ":" + 
                        import.meta.env.VITE_BACKEND_PORT + "/cars/" + car.id, {
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
            updateCar()
        }

        else { 
            const addCar = async () => {
                try {
                    const response = await fetchWithAuth(
                        import.meta.env.VITE_BACKEND_URL + ":" + 
                        import.meta.env.VITE_BACKEND_PORT + "/cars/add", {
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
            addCar()
        }
    }

    return (
        <div>
            <h1>{title}</h1>
            <form onSubmit={(e) => handleSubmit(e, carToEdit)}>
                <label>
                    <span>Manufacturer</span>
                    <select placeholder="Select Manufacturer" 
                        value={manufacturer} 
                        onChange={e => setManufacturer(e.target.value)}>
                        {manufacturers != null 
                            ? manufacturers.map((value, i) => (
                                <option key={i}>{value}</option>))
                            : <option>none</option>
                        }
                    </select>
                </label>
                <label>
                    <span>Model</span>
                    {carToEdit != null 
                        ? <input type="text" placeholder="Enter Model" 
                            value={car.carModel} 
                            onChange={(e) => setCar({ ...car, carModel: e.target.value })} />
                        : <input type="text" placeholder="Enter Model" />
                    }
                </label>
                <label>
                    <span>Number of seats</span>
                    {carToEdit != null 
                        ? <input type="number" placeholder="Enter number of seats" 
                            value={car.numberOfSeats} 
                            onChange={(e) => setCar({ ...car, numberOfSeats: e.target.value })} />
                        : <input type="number" placeholder="Enter number of seats" />
                    }
                </label>
                <label>
                    <span>Transmission type</span>
                    {carToEdit != null 
                        ? <input type="text" placeholder="Enter transmission type" 
                            value={car.transmissionType} 
                            onChange={(e) => setCar({ ...car, transmissionType: e.target.value })} />
                        : <input type="text" placeholder="Enter transmission type" />
                    }
                </label>
                <label>
                    <span>Fuel type</span>
                    {carToEdit != null 
                        ? <input type="text" placeholder="Enter fuel type" 
                            value={car.fuelType} 
                            onChange={(e) => setCar({ ...car, fuelType: e.target.value })} />
                        : <input type="text" placeholder="Enter fuel type" />
                    }
                </label>
                <label>
                    <span>Price</span>
                    {carToEdit != null 
                        ? <input type="number" placeholder="Enter price" 
                            value={car.price} 
                            onChange={(e) => setCar({ ...car, price: e.target.value })} />
                        : <input type="number" placeholder="Enter price" />
                    }
                </label>
                <label>
                    <span>Production year</span>
                    {carToEdit != null 
                        ? <input type="number" placeholder="Enter production year" 
                            value={car.price} 
                            onChange={(e) => setCar({ ...car, productionYear: e.target.value })} />
                        : <input type="number" placeholder="Enter production year" />
                    }
                </label>
                <label>
                    <span>Features</span>
                    {/* /features */}
                    <select placeholder="Select Features" multiple
                        value={selectedFeatures}
                        onChange={e => updateSelectedFeatures(e.target)}>
                        {features != null 
                            ? features
                                .map(f => [f["id"], f["featureName"]])
                                .map(f => (
                                    <option key={f[0]} value={f[0]}>
                                        {f[1]}
                                    </option>))
                            : <option>none</option>
                        }
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

export default CarEdit;
