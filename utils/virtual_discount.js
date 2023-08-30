function calculate_virtual_discount(discount, price) {
    let discounted_price = Number(price) - ((Number(price) * Number(discount)) / 100)

    return discounted_price
}

module.exports = calculate_virtual_discount