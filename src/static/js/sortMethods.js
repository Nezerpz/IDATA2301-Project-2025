function nullCheck(a, b) {
    return (a == null) || (b == null)
}

const sortMethods = {
    "price_low_high": (a, b) => { return nullCheck(a,b) ? 0 : a["price"] - b["price"] },
    "price_high_low": (a, b) => { return nullCheck(a,b) ? 0 : b["price"] - a["price"] },
    "best_reviews":   (carA, carB) => { carA["rating"] - carB["rating"] }
}

export default sortMethods
