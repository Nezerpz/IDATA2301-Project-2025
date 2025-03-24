import PropTypes from 'prop-types';

function SliderFilter({name, min, max, onUpdate}) {
    return (
        <details className={"filter-item"}>
            <summary className={"category-name"}>{name}</summary>
            <div className={"price-range"}>
                <input type="range" min={min} max={max} value={max} className="slider" id={name}/>
            </div>
        </details>
    );
}

SliderFilter.propTypes = {
    name: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    onUpdate: PropTypes.func
};

export default SliderFilter;
