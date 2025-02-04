import useTitle from "../components/useTitle.jsx";

function Home(){
    useTitle("Home");
    return (
        <div id="home" className="row">
            <div id="callToAction" className="col-12">
                <h2>Up for an Adventure?</h2>
                <button>Rent Random Car</button>
            </div>
        </div>
    )
}
export default Home;
