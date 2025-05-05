import PropTypes from 'prop-types';

function updateList(event, name, onUpdate) {
    let selectedFilters = new Array()
    let filterList = document.getElementById(name);

    // Add checked options to list
    for (const listItem of filterList.childNodes) {
        let checkboxElement = listItem.querySelector(".filter-checkbox")
        let valueElement= listItem.querySelector(".filter-value")
        let value = valueElement.innerText

        if (checkboxElement.checked) {
            selectedFilters.push(value)
        }

    }

    onUpdate(selectedFilters)
}

function CheckBoxFilters({name, values, onUpdate}) {
    return (
        <details className={"filter-category"}>
            <summary className={"filter-category-name"}>{name}</summary>
            <ul>
                {Object.entries(values).map(indexValue => (
                    <li key={indexValue[0]}>
                        <label className={"filter-value"}>
                            <input className={"filter-checkbox"} 
                                type={"checkbox"} 
                                onChange={(e) => {updateList(e, name, onUpdate)}}/>
                                {indexValue[1]}
                        </label>

                    </li>
                ))}
            </ul>
        </details>
    );
}

CheckBoxFilters.propTypes = {
    name: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.string),
    onUpdate:  PropTypes.func
};

export default CheckBoxFilters;
