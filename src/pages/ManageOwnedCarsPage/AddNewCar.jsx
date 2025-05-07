import React, { useState, useEffect } from 'react';

//TODO: Add option to add manufacturer
function AddNewCar() {

    const [manufacturers, setManufacturers] = useState(null)
    const [manufacturer, setManufacturer] = useState("none")
    const [features, setFeatures] = useState(null)

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

    return (
        <div>
            <h1>Add New Car</h1>
            <form>
                <label>
                    <span>Manufacturer</span>
                    {/* /manufacturers */}
                    <select placeholder="Select Manufacturer" value={manufacturer} onChange={e => setManufacturer(e.target.value)}>
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
                    <select placeholder="Select Features">
                        <option>Bluetooth</option>
                        <option>BMW</option>
                    </select>
                </label>
                <label>
                    <span>Image</span>
                    <input type="file" placeholder="Upload image" />
                </label>
                <button className={"big-button"} type="submit">Add Car</button>
            </form>
        </div>
    );
}

export default AddNewCar;
