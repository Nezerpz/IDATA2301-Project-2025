import PropTypes from "prop-types";
import Feature from "./Feature.jsx";

function FeatureList ({features}) {
    return (
        <div>
            {features.features.map((feature, index) => (
                <Feature key={index} feature={feature} />
            ))}
        </div>
    );
}
FeatureList.propTypes = {
    features: PropTypes.shape({
        features: PropTypes.array
    })
}

export default FeatureList;
