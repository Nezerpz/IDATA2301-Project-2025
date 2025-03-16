
//TODO: CSS for review-box


function Review(){
    return (
        <div className={"review-box"}>
            <h1>Review</h1>
            <form>
                <label>
                    <span>Review:</span>
                    <textarea name="review" rows="4" cols="50"></textarea>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Review;