import React, {useEffect, useState} from 'react';
import "../Modal.css"
import {fetchJSON} from "../../../static/js/auth.js";
import scrollLock from "../../scrollLock/scrollLock.jsx";



//TODO: If modal is open prevent user from being able to scroll
function getReviews(id, setReviews, type, setLoading) {
    useEffect(() => {
        const fetchdata = async () => {
            try {
                let data = await fetchJSON(`/review/${type}/` + id);
                 setReviews(data);
                 setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchdata();
    }, [id]);
}

//TODO: Implement the ability to click the reviews name in the car page, to be able to read all reviews related to the provider
function ReviewModal({ open, id, type, onClose }) {
    if (!open) return null;
    let [reviews, setReviews] = useState(null);
    let [loading, setLoading] = useState(true);

    getReviews(id, setReviews, type, setLoading);

    console.debug(reviews)

    let userNameString = "Sorry, no reviews found";
    if (!loading && reviews && reviews.length > 0) {
        if (type === "car") {
            userNameString = reviews[0].car.manufacturer + " " + reviews[0].car.carModel;
        } else {
            userNameString = reviews[0].reviewedUser.firstName + " " + reviews[0].reviewedUser.lastName;
        }
    }


    return (
        <>
        <div className={"overlay"}></div>
        <div className={"modal"}>
            <div className="modal-content flex-container-column">
                <div className="modal-header flex-container-row">
                    <h4>{userNameString}</h4>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="size-6 close" style={{ maxWidth: "24px", marginLeft: "auto" }} onClick={() => {
                             onClose();
                         }}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
                    </svg>
                </div>
                <div className={"scrollable-list"}>
                    {reviews && reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div className="review" key={review.id}>
                                <p><strong>
                                    {type === "car"
                                        ? review.user.firstName + " " + review.user.lastName
                                        : review.reviewingUser.firstName + " " + review.reviewingUser.lastName}
                                </strong></p>
                                <span>{review.review}</span>
                                <span>Rating: {review.rating}</span>
                            </div>
                        ))
                    ) : (
                        <p>No one has reviewed this user</p>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}

export default scrollLock(ReviewModal);