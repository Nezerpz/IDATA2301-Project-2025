import PropTypes from "prop-types";
import { useContext } from "react";
import { CarContext } from '../context/CarContext.js'
import sortMethods from "../util/sortMethods.js";


function CarSort() {

    const [ , , , , , setSortMethod] = useContext(CarContext)

    const updateSortMethod = (event) => {
        let key = event.target.value;
        let method = sortMethods[key];
        setSortMethod((a,b) => (a,b) => {return method(a,b)});
    }

    return (
        <div>
            <select onChange={updateSortMethod}>
                <option value={"price_high_low"}>Price High-Low</option>
                <option value={"price_low_high"}>Price Low-High</option>
            </select>
        </div>
    );

}

export default CarSort
