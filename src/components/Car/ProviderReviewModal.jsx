import React from 'react';
import "./Modal.css"

async function getProviderReviews(carId) {

}

//TODO: Implement the ability to click the reviews name in the car page, to be able to read all reviews related to the provider
function ProviderReviewModal({ open, carId, onClose }) {
    if (!open) return null;
    const providerReviews = getProviderReviews(carId)

    return (
        <>
        <div className={"overlay"}></div>
        <div className={"modal"}>
            <div className="modal-content">
                {/*TODO: change the span to a button or something simular*/}
                <span className="close" onClick={onClose}>x</span>
                <h2>{}</h2>
            </div>
        </div>
        </>
    );
}

export default ProviderReviewModal;