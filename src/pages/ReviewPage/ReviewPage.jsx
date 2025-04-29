
//TODO: CSS for review-box


import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import {fetchWithAuth} from "../static/js/auth.js";
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
            const response = await fetchWithAuth(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/review-user", {
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
                car: order.carId,
                user: order.customerId,
            }
            const response = await fetchWithAuth(import.meta.env.VITE_BACKEND_URL + ":" + import.meta.env.VITE_BACKEND_PORT + "/review-car", {
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
            <div>
                <h1>Reviewing {type} from order {order.id}</h1>
                <div className="star-container">
                    {Array.from({ length: 5 }).map((_, index) => {
                        const currentRating = index + 1;
                        return (
                            <FaStar
                                key={index}
                                size={50}
                                color={currentRating <= (hover || rating) ? "yellow" : "grey"}
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
                        name="review"
                        rows="4"
                        cols="50"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                </label>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default ReviewPage;
