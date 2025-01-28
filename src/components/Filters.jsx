import "../static/css/filter.css";

const filters = () => {
    return (
        <div className={"filter"}>
            <div className={"filter-header"}>
                <h2>Filters</h2>

            </div>

            <div className={"filter-body"}>
                <div className={"filter-item"}>
                    {/* Buttons in this function server to close or open selected category
                     TODO: Implement logic behind button opening and closing */}
                    <button className={"category-name"}>
                        Manufacturer
                    </button>
                    <ul>
                        <li>
                            <input type={"checkbox"} />
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
                </div>
                <div className={"filter-item"}>
                    <button className={"category-name"}>
                        Price
                    </button>
                    <div className={"price-range"}>
                        <input type={"number"} />
                        <input type={"number"} />
                    </div>
                    <div className={"price-slider"}>

                    </div>
                </div>
                <div className={"filter-item"}>
                    <button className={"category-name"}>
                        Features
                    </button>
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
                </div>
                <div className={"filter-item"}>
                    <button className={"category-name"}>
                        Transmission type
                    </button>
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
                </div>
            </div>
        </div>
    );
}
export default filters;