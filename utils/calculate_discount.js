function calculate_discount(price, discount) {
    let discount_price = (price * discount) / 100

    return price - discount_price
}

module.exports = calculate_discount