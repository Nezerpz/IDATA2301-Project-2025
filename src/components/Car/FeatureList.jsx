import PropTypes from "prop-types";
import Feature from "./Feature.jsx";

function FeatureList ({features = []}) {
    return features.length > 0
        ? (
            <details className={"features"}>
                <summary>Features</summary>
                <ul>
                {features.map((feature, index) => (
                    <Feature key={index} feature={feature} />
                ))}
                </ul>
            </details>
        ) : (<></>);
}
FeatureList.propTypes = {
    features: PropTypes.array
}

export default FeatureList;
