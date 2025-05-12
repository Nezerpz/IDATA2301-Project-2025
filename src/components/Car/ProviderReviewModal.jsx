import React, {useEffect, useState} from 'react';
import "./Modal.css"
import {fetchJSON} from "../../static/js/auth.js";

function getReviews(carId, setReviews) {
    useEffect(() => {
        const fetchdata = async () => {
            try {
                let provider = await fetchJSON("/users/owner/" + carId);
                let data = await fetchJSON("/review/user/" + provider.id);
                 setReviews(data);
                 console.debug(provider)
                 console.debug(data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchdata();
    }, [carId]);
}

//TODO: Implement the ability to click the reviews name in the car page, to be able to read all reviews related to the provider
function ProviderReviewModal({ open, carId, onClose }) {
    if (!open) return null;
    let [reviews, setReviews] = useState(null);

    getReviews(carId, setReviews);


    return (
        <>
        <div className={"overlay"}></div>
        <div className={"modal"}>
            <div className="modal-content flex-container-column">
                {/*TODO: change the span to a button or something simular*/}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="size-6 close flex-end-item"  style={{maxWidth: "24px", marginBottom: "2rem"}} onClick={onClose}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
                    </svg>

                {reviews && reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div className="review" key={review.id}>
                            <p>{review.review}</p>
                            <p>Rating: {review.rating}</p>
                        </div>
                    ))
                ) : (
                    <p>No one has reviewed this provider</p>
                )}
            </div>
        </div>
        </>
    );
}

export default ProviderReviewModal;