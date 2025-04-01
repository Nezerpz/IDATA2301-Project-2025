import useTitle from "../components/useTitle.jsx";

function AboutPage() {
    useTitle("About");
    return(
    <div className="row">
        <div className={"col-2"}></div>
        <div className="col-8">
            <h2>Our Story</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet erat in ante cursus feugiat vel a metus. Integer viverra orci ac urna sodales, ac vehicula dolor fermentum. Nulla facilisi. Integer ultricies, nunc at facilisis gravida, ante purus varius risus, in laoreet nunc purus sed libero. Sed euismod vestibulum orci id varius. Nam et purus nisi.</p>

            <p>Vivamus euismod est sit amet sollicitudin pharetra. Fusce bibendum ligula at ipsum vulputate, non venenatis felis laoreet. Integer auctor vel tortor non tristique. Etiam euismod auctor eros, ac suscipit felis volutpat id. Mauris auctor neque ut ante lacinia, ac tincidunt sapien iaculis. Aliquam interdum purus vel nisi placerat, a feugiat lectus rhoncus.</p>

            <p>Donec sollicitudin lectus vel risus aliquet, vel lobortis ipsum gravida. Fusce lacinia sem felis, et volutpat ante congue vel. Donec fermentum ante et nisi pharetra, at auctor neque tristique. Curabitur egestas leo ac dolor consectetur, ut luctus felis gravida. Aenean cursus tristique felis a tincidunt. Vivamus volutpat nec nisi ac rhoncus.</p>

        </div>
        <div className={"col-2"}></div>
    </div>
)
}
export default AboutPage;
