import PropTypes from 'prop-types';

function CheckBoxFilters({name, values, onUpdate}) {
    return (
        <details className={"filter-item"}>
            <summary className={"category-name"}>{name}</summary>
            <ul>
                {values.map((value, key) => (
                    <li key={key}>
                        <input type={"checkbox"} />
                        <label>{value}</label>
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
