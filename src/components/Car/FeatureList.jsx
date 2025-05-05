import PropTypes from "prop-types";
import Feature from "./Feature.jsx";

function FeatureList ({features = []}) {
    return features.length > 0
        ? (
            <div className={"features"}>
                <ul>
                {features.map((feature, index) => (
                    <Feature key={index} feature={feature} />
                ))}
                </ul>
            </div>
        ) : (<></>);
}
FeatureList.propTypes = {
    features: PropTypes.array
}

export default FeatureList;
