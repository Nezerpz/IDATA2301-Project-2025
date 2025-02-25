import "../static/css/filter.css";
import Filter from "./Filter.jsx";

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

export default function filters(cars) {
    const manufacturers = getUniqueEntries(cars, "manufacturer");
    const prices = [getMinPrice(cars), getMaxPrice(cars)];
    const transmission = getUniqueEntries(cars, "transmissionType");
    const features = getUniqueEntriesInLists(cars, "features");

    console.debug(manufacturers);
    console.debug(prices);
    console.debug(transmission);
    console.debug(features);

    return (
        <div className={"filter"}>
            <div className={"filter-header"}>
                <h3>Filters</h3>
            </div>

            <div className={"filter-body"}>
                <input type={"text"}
                    placeholder={"Search"}
                    onChange={event => {}}
                    />
                <details className={"filter-item"}>
                    {/* Buttons in this function server to close or open selected category
                     TODO: Implement logic behind button opening and closing */}
                    <summary className={"category-name"}>
                        Manufacturer
                    </summary>
                    <ul>
                        <li>
                            <input type={"checkbox"}
                            onChange={event => {}}/>
                            <label>BMW</label>
                        </li>
                        <li>
                            <input type={"checkbox"} />
                            <label>Volkswagen</label>
                        </li>
                        <li>
                            <input type={"checkbox"} />
                            <label>Skoda</label>
                        </li>
                    </ul>
                </details>
                <details className={"filter-item"}>
                    <summary className={"category-name"}>
                        Price
                    </summary>
                    <div className={"price-range"}>
                        <input type="range" min="1" max="100" value="50" className="slider" id="myRange" />
                    </div>
                    <div className={"price-slider"}>

                    </div>
                </details>
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
