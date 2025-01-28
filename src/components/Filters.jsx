import "../static/css/filter.css";

const filters = () => {
    return (
        <div className={"filter"}>
            <div className={"filter-header"}>
                <h2>Filters</h2>

            </div>

            <div className={"filter-body"}>
                <details className={"filter-item"}>
                    {/* Buttons in this function server to close or open selected category
                     TODO: Implement logic behind button opening and closing */}
                    <summary className={"category-name"}>
                        Manufacturer
                    </summary>
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
export default filters;
