import "../static/css/car.css";
import PropTypes from 'prop-types';


function Feature ({feature}) {
    return (
        <div className="feature">
            <li>{feature.name}</li>
        </div>
    )
}


Feature.propTypes = {
    feature: PropTypes.shape({
        name: PropTypes.string,
    })
}


export default Feature;
