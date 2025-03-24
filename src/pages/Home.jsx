import useTitle from "../components/useTitle.jsx";
import SearchDateFromTo from "../components/SearchDateFromTo.jsx";
import { Link } from 'react-router-dom';

//TODO: Fix the link. It is currently white on white background
function Home(){
    useTitle("Home");
    return (
        <div>
            <section id="home" className="row">
                <div id={"callToAction"} className="col-12">
                  <h2 id={"jeremy-header"}>Up for an Adventure?</h2>
                  <SearchDateFromTo />
                </div>
            </section>
            <section>
                <h2>To Rent, or to be Rented?</h2>
                <img id="leavingEnteringCar" src="https://imgs.search.brave.com/KrL80VTX3Q5YgcGGFwgNJ-oaKwtwD1UeliYNT5iGqVc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvODY5/NjgzNTg4L3Bob3Rv/L3BhY2tpbmctb24t/YWlycG9ydC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9TDF4/clVkMEZrZ2ZvOWVq/a2pFWTRqYlMyUjNx/RnlVOTZPM3NlNjNz/VF9hQT0" />
                <p>Not using your car for a extended period of time? Rent it out <Link to="/signup">here!</Link></p>
                <p>Or perhaps you need a car? Find one <Link to="/cars">here!</Link></p>
            </section>
        </div>
    )
}
export default Home;
