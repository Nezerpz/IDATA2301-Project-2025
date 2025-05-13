import "./Car.css";
import PropTypes from 'prop-types';
import FeatureList from "./FeatureList.jsx";
import { CarContext } from "../../context/CarContext.js";
import OrderModal from "../Modals/OrderModal/OrderModal.jsx";
import {useState, useContext, useEffect} from "react";
import checkLogin from "../../static/js/checkLogin.js";
import {useNavigate, useSearchParams} from "react-router-dom";
import ReviewModal from "../Modals/ReviewModal/ReviewModal.jsx";
import {FaStar} from "react-icons/fa";
import {fetchJSON} from "../../static/js/auth.js";

function getRating(car, setRating) {
    useEffect(() => {
        const fetchdata = async () => {
            try {
                let data = await fetchJSON(`/review/car/` + car.id);
                if (data && data.length > 0) {
                    const total = data.reduce((sum, review) => sum + review.rating, 0);
                    const average = total / data.length;
                    setRating(average);
                } else {
                    setRating(2.5);
                }
            } catch (error) {
                console.error(error);
                setRating(0);
            }
        };

        fetchdata();
    }, [car]);
}


//TODO: Add start under provider name. When clicking stars show the review modal for the car.
function Car ({car}) {
    const [ordering, setIsOrdering] = useState(false)
    const [providerReviews, setProviderReviews] = useState(false);
    const [carReviews, setCarReviews] = useState(false);
    const [rating, setRating] = useState(0);
    const [searchParams] = useSearchParams();
    let [ fromToDate, setFromToDate ] = useContext(CarContext);
    const totalStars = 5;

    const carWithRating = {
        ...car,
        rating: rating
    }

    const navigate = useNavigate();
    // <button onClick={() => {orderCar(car, fromToDate, setIsOrdering)}}>Order Now</button>

    getRating(car, setRating);


    const canOrder = () => {
        if (checkLogin()) {
            setIsOrdering(true);
        }
        else {
            alert("You need to be logged in to order a car.");
            navigate('/login', { state: { from: window.location.pathname + "?" + searchParams } });
        }
    }

    return (
        <div className="car">
            <h3>{carWithRating.manufacturer} {carWithRating.carModel}</h3>
            <img src={"src" + carWithRating.imagePath} alt={carWithRating.carModel} className={"car-image"}/>
            <div className={"carInfo"}>
                <div>
                    <p
                        className={"car-user"}
                        title={"Read reviews of this user"}
                        onClick={() => {setProviderReviews(true)}}
                    >
                        <strong>{car.user}</strong>
                    </p>
                    <ReviewModal
                        open={providerReviews}
                        onClose={() => {setProviderReviews(false)}}
                        id={carWithRating.providerId}
                        type={"user"}
                    />
                    <div className="star-container">
                        {Array.from({ length: totalStars }).map((_, index) => {
                            const currentRating = index + 1;
                            return (
                                <FaStar
                                    key={index}
                                    size={25}
                                    color={currentRating <= carWithRating.rating ? "yellow" : "grey"}
                                />
                            );
                        })}
                        <span>Rating: {carWithRating.rating} / {totalStars}</span>
                    </div>
                    <p>{carWithRating.transmissionType} ∙ {carWithRating.fuelType} ∙ {carWithRating.numberOfSeats} SEATS ∙ {carWithRating.productionYear}</p>
                </div>
                <FeatureList features={carWithRating.features}/>
            </div>
            <span className={"grow"}></span>
            <div className={"orderButtonContainer"}>
                <button className = {"big-button"} onClick={() => {canOrder()}}>Rent for {carWithRating.price}/day</button>
            </div>
            <OrderModal 
                open={ordering} 
                onClose={() => {setIsOrdering(false)}}
                car={carWithRating}
                timespan={fromToDate}>
            </OrderModal>
        </div>
    )
}

Car.propTypes = {
    car: PropTypes.shape({
        id: PropTypes.number,
        imagePath: PropTypes.string,
        carModel: PropTypes.string,
        price: PropTypes.number,
        numberOfSeats: PropTypes.number,
        productionYear: PropTypes.number,
        manufacturer: PropTypes.string,
        transmissionType: PropTypes.string,
        carStatus: PropTypes.string,
        user: PropTypes.string,
        fuelType: PropTypes.string,
        features: PropTypes.array
    })
}


export default Car
