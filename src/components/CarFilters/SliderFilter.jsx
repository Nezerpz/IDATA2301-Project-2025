import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

function SliderFilter({name, min, max, onUpdate}) {
    let allFilters = new Array()
    let selectedFilters = new Array()
    let minSlider = document.getElementById(`${name}-min-slider`)
    let maxSlider = document.getElementById(`${name}-max-slider`)
    
    const [minValue, setMinValue] = useState(min);
    const [maxValue, setMaxValue] = useState(max);

    useEffect(() => {
        onUpdate([minValue, maxValue])
    }, [minValue, maxValue])

    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), maxValue - 1); // Prevent collision
        setMinValue(value);
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), minValue + 1); // Prevent collision
        setMaxValue(value);
    };
    
    return (
        <details className={"filter-category"} open>
            <summary className={"filter-category-name"}>{name}</summary>
            <div className={"price-range"}>
                <input type="range" min={min} max={max} value={minValue} className="min" id={`${name}-min-slider`} onChange={handleMinChange}/>
                <input type="range" min={min} max={max} value={maxValue} className="max" id={`${name}-max-slider`} onChange={handleMaxChange}/>
            </div>
            <div>
                <input type="number" min={min} max={max} value={minValue} onChange={e => setMinValue(e.target.value)}/>
                <input type="number" min={min} max={max} value={maxValue} onChange={e => setMaxValue(e.target.value)}/>
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
