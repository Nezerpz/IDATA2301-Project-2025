
const sortMethods = {
    "price_low_high": (carA, carB) => { return carA["price"] - carB["price"] },
    "price_high_low": (carA, carB) => { return carB["price"] - carA["price"] }//,
    //"best_reviews":   (carA, carB) => { carA["review"] - carB["review"] }
}

export default sortMethods
