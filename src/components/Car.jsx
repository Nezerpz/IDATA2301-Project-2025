import "../static/css/car.css";

const Car = () => {
    return (
        <article className="car">
            <h2>Car name (Manufacturer + Model)</h2>
            <img src="https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088025.jpg" alt="Image of car in article" />
            <h3>Features</h3>
            <ul>
                <li>
                    Warming seats
                </li>
                <li>
                    Roof window
                </li>
            </ul>
        </article>
    );
}
export default Car;
