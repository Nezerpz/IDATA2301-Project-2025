import PropTypes from 'prop-types';
import "../static/css/filter.css";
import CheckBoxFilters from "./CheckBoxFilters.jsx";
import SliderFilter from './SliderFilter';

function getUniqueEntries(dictList, key) {
    const uniqueEntries = Array.from(
        // A set has no duplicates
        // we use map to only extract one column
        new Set(dictList.map(item => item[key]))
    );
    return uniqueEntries;
}

function getMaxPrice(cars) {
    const prices = getUniqueEntries(cars, "price");
    return Math.max(prices);
}

function getMinPrice(cars) {
    const prices = getUniqueEntries(cars, "price");
    return Math.min(prices);
}

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

function Filters(cars) {
    cars = cars["cars"]
    const manufacturers = getUniqueEntries(cars, "manufacturer");
    const prices = [getMinPrice(cars), getMaxPrice(cars)];
    const transmission = getUniqueEntries(cars, "transmissionType");
    const features = getUniqueEntriesInLists(cars, "features");

    console.debug(features);

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
                <CheckBoxFilters name={"Manufacturers"} values={manufacturers} />
                <SliderFilter name={"Price"} min={prices[0]} max={prices[1]} />
                <CheckBoxFilters name={"Transmission"} values={transmission} />
                <CheckBoxFilters name={"Features"} values={features} />
            </div>
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
    )
};

export default Filters;
