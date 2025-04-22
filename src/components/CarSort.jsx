import PropTypes from "prop-types";
import sortMethods from "../util/sortMethods.js";


function CarSort(setSortMethod) {

    const updateSortMethod = (event) => {
        let key = event.target.value
        let method = sortMethods[key]
        console.log(setSortMethod)
        setSortMethod(method)
    }

    return (
        <div>
            <h4>Sort</h4>
            <select onChange={updateSortMethod}>
                <option value={"price_high_low"}>Price High-Low</option>
                <option value={"price_low_high"}>Price Low-High</option>
            </select>
        </div>
    );
}

CarSort.propTypes = {
    setSortMethod: PropTypes.func
}

export default CarSort
