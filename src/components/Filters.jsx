import "../static/css/filter.css";
import {useEffect, useState} from "react";

function filters() {
    const [filters, setFilters] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchFilters() {
            try {
                let response = await fetch(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/cars");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let filters = await response.json();
                setFilters(filters);
            } catch (error) {
                setError(error.message);
                console.error("Failed to fetch cars:", error);
            }
        }

        fetchFilters().then(r => console.log("Fetched cars"));
    }, []);
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
export default filters;
