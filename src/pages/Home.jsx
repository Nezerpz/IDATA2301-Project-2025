import useTitle from "../components/useTitle.jsx";

function Home(){
    useTitle("Home");
    return (
        <div>
            <div id="home" className="row">
                <div id="callToAction" className="col-12">
                    <h2>Up for an Adventure?</h2>
                    <button>Rent Random Car</button>
                    <a href="/cars">Or Browse Available...</a>
                </div>
            </div>
            <div>
                <h2>Working Title</h2>
                <p>Drive a random car into the sunset.</p>
            </div>
        </div>
    )
}
export default Home;
