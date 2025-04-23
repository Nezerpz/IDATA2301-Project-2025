
//TODO: CSS for review-box


import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

function ReviewPage() {
    const location = useLocation();
    const { order, type } = location.state;
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);

    return (
        <form className={"review-box"}>
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
                    <textarea name="review" rows="4" cols="50"></textarea>
                </label>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}

export default ReviewPage;