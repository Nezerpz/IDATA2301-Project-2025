import React, { useState, useEffect } from "react";

function CarEdit({car, title, actionText}) {
    const [manufacturers, setManufacturers] = useState(null)
    const [manufacturer, setManufacturer] = useState("none")
    const [features, setFeatures] = useState(null)
    const [selectedFeatures, setSelectedFeatures] = useState(car == null ? [] : null)

    function updateSelectedFeatures(selectElement) {
        let newFeatures = Array.from(selectElement.children)
            .filter(option => option.selected)
            .map(option => option.value)
        console.debug(newFeatures)
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

    return (
        <div>
            <h1>{title}</h1>
            <form>
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
                    <input type="text" placeholder="Enter Model" />
                </label>
                <label>
                    <span>Number of seats</span>
                    <input type="number" placeholder="Enter number of seats" />
                </label>
                <label>
                    <span>Transmission type</span>
                    <input type="text" placeholder="Enter transmission type" />
                </label>
                <label>
                    <span>Fuel type</span>
                    <input type="text" placeholder="Enter fuel type" />
                </label>
                <label>
                    <span>Price</span>
                    <input type="number" placeholder="Enter price" />
                </label>
                <label>
                    <span>Production year</span>
                    <input type="number" placeholder="Enter production year" />
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
