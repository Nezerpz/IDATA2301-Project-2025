import PropTypes from 'prop-types';
import {  useState } from 'react';

function minUpdate() {
}

function maxUpdate() {
}

function SliderFilter({name, min, max, onUpdate}) {
    let allFilters = new Array()
    let selectedFilters = new Array()
    let minSlider = document.getElementById(`${name}-min-slider`)
    let maxSlider = document.getElementById(`${name}-max-slider`)
    
    const [minValue, setMinValue] = useState(min);
    const [maxValue, setMaxValue] = useState(max);
    
    return (
        <details className={"filter-item"}>
            <summary className={"category-name"}>{name}</summary>
            <div className={"price-range"}>
                <input type="range" min={min} max={max} value={minValue} className="min" id={`${name}-min-slider`} onChange={e => setMinValue(e.target.value)}/>
                <input type="range" min={min} max={max} value={maxValue} className="max" id={`${name}-max-slider`} onChange={e => setMaxValue(e.target.value)}/>
            </div>
            <div>
                <input type="number" min={min} max={max} defaultValue={min} onChange={minUpdate}/>
                <input type="number" min={min} max={max} defaultValue={max} onChange={maxUpdate}/>
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
