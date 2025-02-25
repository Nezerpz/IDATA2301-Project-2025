import PropTypes from 'prop-types';
import "../static/css/filter.css";
import CheckBoxFilters from "./CheckBoxFilters.jsx";
import SliderFilter from './SliderFilter';

function getUniqueEntries(dictList, key) {
    console.log("dictList")
    console.log(dictList);
    const uniqueEntries = Array.from(
        // A set has no duplicates
        // we use map to only extract one column
        new Set(dictList.map(item => item[key]))
    );
    return uniqueEntries;
}

function getMaxPrice(cars) {
    const prices = getUniqueEntries(cars, "price");
    return Math.min(prices);
}

function getMinPrice(cars) {
    const prices = getUniqueEntries(cars, "price");
    return Math.max(prices);
}

function getUniqueEntriesInLists(dictList, key) {
    const uniqueEntries = Array.from(dictList.reduce(
        // dict[key] is a list (a given for this function)
        // The acc variable contains accumulated set
        // A set has no duplicates
        (acc, dict) => acc.add(dict[key]),
        new Set() // initial value for acc
    ));

    return uniqueEntries;
}

function Filters(cars) {
    cars = cars["cars"]
    const manufacturers = getUniqueEntries(cars, "manufacturer");
    const prices = [getMinPrice(cars), getMaxPrice(cars)];
    const transmission = getUniqueEntries(cars, "transmissionType");
    const features = getUniqueEntriesInLists(cars, "features");

    console.log("manufacturers")
    console.debug(manufacturers);
    //console.log("prices")
    //console.debug(prices);
    //console.log("transmission")
    //console.debug(transmission);
    //console.log("features")
    //console.debug(features);

    return (
        <div className={"filter"}>
            <div className={"filter-header"}>
                <h3>Filters</h3>
            </div>

            <div className={"filter-body"}>
                <input type={"text"}
                    placeholder={"Search"}
                    readOnly={true}
                    />
                <CheckBoxFilters name={"manufacturers"} values={manufacturers} />
                {/*<SliderFilter name={"Price"} min={prices[0]} max={prices[1]} />*/}
                <details className={"filter-item"}>
                    <summary className={"category-name"}>
                        Transmission
                    </summary>
                    <ul>
                        <li>
                            <input type={"checkbox"} />
                            <label>Automatic</label>
                        </li>
                        <li>
                            <input type={"checkbox"} />
                            <label>Manual</label>
                        </li>
                    </ul>
                </details>
                <details className={"filter-item"}>
                    <summary className={"category-name"}>
                        Features
                    </summary>
                    <ul>
                        <li>
                            <input type={"checkbox"} />
                            <label>Seat warming</label>
                        </li>
                        <li>
                            <input type={"checkbox"} />
                            <label>Roof window</label>
                        </li>
                        <li>
                            <input type={"checkbox"} />
                            <label>4-wheel drive</label>
                        </li>
                    </ul>
                </details>
            </div>
        </div>
    );
}

Filters.propTypes = {
    cars: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            carModel: PropTypes.string,
            numberOfSeats: PropTypes.number,
            productionYear: PropTypes.number,
            manufacturer: PropTypes.string,
            transmissionType: PropTypes.string,
            fuelType: PropTypes.string,
            features: PropTypes.array
        })
    )
};

export default Filters;
