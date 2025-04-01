
//TODO: CSS for review-box


function ReviewPage(order){
    order = ["order"];
    return (
            <div className={"review-box row"}>
            <div className={"col-2"}></div>
            <div className={"col-8"}>
                <h1>Review</h1>
                <form>
                    <label>
                        <span>Review:</span>
                        <textarea name="review" rows="4" cols="50"></textarea>
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className={"col-2"}></div>
            </div>
    )
}

export default ReviewPage;