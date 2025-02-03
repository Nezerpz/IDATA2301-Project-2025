import "../static/css/car.css";

const Car = () => {
    const features = ["Warming seats", "Roof window", "Floor windows"];

    return (
        <article className="car">
            <h2>Car name (Manufacturer + Model)</h2>
            <img src="https://www.shutterstock.com/image-vector/car-logo-icon-emblem-design-600nw-473088025.jpg" alt="Image of car in article" />
            <h3>Features</h3>
            <ul>
                {features.map((feature, index) => (
                    <li key={index}>
                        {feature}
                    </li>
                ))}
            </ul>
        </article>
    );
}
export default Car;