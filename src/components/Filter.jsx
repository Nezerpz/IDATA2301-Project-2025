
export default function Filter() {
    return (
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
    );
}
