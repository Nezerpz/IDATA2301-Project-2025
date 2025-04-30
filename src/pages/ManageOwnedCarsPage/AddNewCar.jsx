

//TODO: Add option to add manufacturer
function AddNewCar() {
    return (
        <div>
            <h1>Add New Car</h1>
            <form>
                <label>
                    <span>Manufacturer</span>
                    <select placeholder="Select Manufacturer">
                        <option>Volvo</option>
                        <option>BMW</option>
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
                    <input type="text" placeholder="Enter features" alt="feature, feature, feature..." />
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
