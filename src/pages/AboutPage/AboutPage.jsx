import useTitle from "../../components/useTitle.jsx";
import {Link} from "react-router-dom";

function AboutPage() {
    useTitle("About");
    return(
    <div className="row">
        <div className={"col-2"}></div>
        <div className="col-8">
            <h2>Our Story</h2>
            <p>
                Welcome to Rental Roulette, the service that wants to make car rental easy for you!

                We are a dedicated team of car enthusiasts who wish to make car rental as easy as possible.
                Both as a provider and a user!
            </p>
            <p>
                We are a small team of developers that have worked hard to make this service a reality.
                We are passionate about cars and want to make it as easy as possible for you to rent a car.
                We have worked hard to implement features we think you will love.
            </p>
            <p>
                We are always looking for ways to improve our service, so if you have any feedback or suggestions,
                please feel free to contact us. We would love to hear from you!
            </p>
        </div>
        <div className={"col-2"}></div>
    </div>
)
}
export default AboutPage;
