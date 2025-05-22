
//TODO: CSS for review-box


import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import {fetchWithAuth} from "../../static/js/auth.js";
import "./ReviewPage.css";

function ReviewPage() {
    const location = useLocation();
    const { order, type } = location.state;
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [hover, setHover] = useState(null);

    const saveReview = async (event) => {
        event.preventDefault();
        let completeReview = {}
        if (type !== "car"){
            if (type === "customer") {
                completeReview = {
                    rating: rating,
                    review: review,
                    reviewing_user_id: order.providerId,
                    reviewed_user_id: order.customerId,
                }
            } else if (type === "provider") {
                completeReview = {
                    rating: rating,
                    review: review,
                    reviewing_user_id: order.customerId,
                    reviewed_user_id: order.providerId,
                }
            }
            const response = await fetchWithAuth("/review-user", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(completeReview)
            });

            if (response.ok) {
                alert("Review submitted successfully!");
                navigate('/');
                window.location.reload();
            } else if (response.status === 409) {
                alert("You have already reviewed this user.");
            } else {
                alert("Failed to submit review. Please try again.");
            }
        } else {
            completeReview = {
                rating: rating,
                review: review,
                order_id: order.id,
                user_id: order.customerId,
            }
            const response = await fetchWithAuth("/review-car", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(completeReview)
            });
            if (response.ok) {
                alert("Review submitted successfully!");
                navigate('/');
                window.location.reload();
            } else if (response.status === 409) {
                alert("You have already reviewed this car.");
            } else {
                alert("Failed to submit review. Please try again.");
            }
        }
    }

    return (
        <form className={"review-box"} onSubmit={saveReview}>
            <h2 className={"review-heading"}>Reviewing {type} from order {order.id}</h2>
            <div className="star-container">
                {Array.from({ length: 5 }).map((_, index) => {
                    const currentRating = index + 1;
                    return (
                        <FaStar
                            key={index}
                            className={"star clickable"}
                            size={50}
                            color={currentRating <= (hover || rating) ? "#0f7c89" : "grey"}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(null)}
                            onClick={() => setRating(currentRating)}
                        />
                    );
                })}
            </div>
            <label>
                <span>Review:</span>
                <textarea
                    className={"review-textarea"}
                    name="review"
                    rows="4"
                    cols="50"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
            </label>
            <button className={"big-button"} type="submit">Submit</button>
        </form>
    );
}

export default ReviewPage;
