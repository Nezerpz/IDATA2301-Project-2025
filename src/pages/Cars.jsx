import useTitle from "../components/useTitle.jsx";

function Cars(){
    useTitle("Cars");
    return (
        <div className="row">
            <div className="col-2">
                <p>Filters</p>
            </div>
            <div className="col-10">
                <article className="car">
                    <div className="specs">

                    </div>
                    <div className="order">
                        <button>Order NOW</button>
                    </div>
                    <div className="moreSpecs">

                    </div>
                </article>
            </div>
        </div>
    )
}
export default Cars;