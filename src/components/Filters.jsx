import PropTypes from 'prop-types';
import "../static/css/filter.css";
import CheckBoxFilters from "./CheckBoxFilters.jsx";
import SliderFilter from './SliderFilter';
import { useState, useEffect } from 'react';


/*
 * Returns list of unique values
 * from multiple dicts having the same key
 */
function getUniqueEntries(dictList, key) {
    const uniqueEntries = Array.from(
        // A set has no duplicates
        // we use map to only extract one column
        new Set(dictList.map(item => item[key]))
    );
    return uniqueEntries;
}

/*
 * Returns highest price found among the cars 
 */
function getMaxPrice(cars) {
    const prices = getUniqueEntries(cars, "price");
    const maxPrice = Math.max(...prices);
    console.log(maxPrice);
    return maxPrice;
}

/*
 * Returns lowest price found among the cars 
 */
function getMinPrice(cars) {
    const prices = getUniqueEntries(cars, "price");
    const minPrice = Math.min(...prices);
    console.log(minPrice);
    return minPrice;
}


/*
 * Returns flattened list of unique values
 * from multiple dicts having the same key
 * where the key value is a list
 * (not a single value)
 */
function getUniqueEntriesInLists(dictList, key) {
    const uniqueEntries = Array.from(dictList.reduce(
        // The acc variable contains accumulated set
        // The ... operator inserts list content as args
        // dict[key] is a list (a given for this function)
        // A set has no duplicates
        (acc, dict) => new Set([...acc, ...dict[key]]),
        new Set() // initial value for acc
    ));

    return uniqueEntries;
}

function Filters({cars, filters, setFilters}) {
    const [manufacturers, setManufacturers] = useState(getUniqueEntries(cars, "manufacturer"));
    const [prices, setPrices] = useState([getMinPrice(cars), getMaxPrice(cars)]);
    const [transmission, setTransmission] = useState(getUniqueEntries(cars, "transmissionType"));
    const [features, setFeatures] = useState(getUniqueEntriesInLists(cars, "features"));
    console.debug(cars);
    console.debug(features);

    // Called when filters are updated
    useEffect(() => {
        let filters = {
            "manufacturers": manufacturers,
            "prices": prices,
            "transmission": transmission,
            "features": features
        };
        setFilters(filters);
    }, [manufacturers, prices, transmission, features]);

    return (
            <div className={"filter-body"}>

                <CheckBoxFilters 
                    name={"Manufacturers"} 
                    values={manufacturers} 
                    onUpdate={setManufacturers}/>

                <SliderFilter 
                    name={"Price"} 
                    min={prices[0]} 
                    max={prices[1]} 
                    onUpdate={setPrices}/>

                <CheckBoxFilters 
                    name={"Transmission"} 
                    values={transmission} 
                    onUpdate={setTransmission}/>

                <CheckBoxFilters 
                    name={"Features"} 
                    values={features} 
                    onUpdate={setFeatures}/>

        </div>
    );
}

Filters.propTypes = {
    cars: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            imagePath: PropTypes.string,
            carModel: PropTypes.string,
            price: PropTypes.number,
            numberOfSeats: PropTypes.number,
            productionYear: PropTypes.number,
            manufacturer: PropTypes.string,
            transmissionType: PropTypes.string,
            carStatus: PropTypes.string,
            user: PropTypes.string,
            fuelType: PropTypes.string,
            features: PropTypes.array
        })
    ),
    setFilters: PropTypes.func
};

export default Filters;
