import PropTypes from "prop-types";
import Feature from "./Feature.jsx";

function FeatureList ({features = []}) {
    return (
        <ul>
        {features.map((feature, index) => (
            <Feature key={index} feature={feature} />
        ))}
        </ul>
    );
}
FeatureList.propTypes = {
    features: PropTypes.array
}

export default FeatureList;
