const alpha = ('abcdefghijklmnopqrstuvwxyz').toLocaleUpperCase().split('')

let random = (x, y) => (Math.floor(Math.random() * y) + x)


function generate(length) {
    let result = ''
    for (let i = 0; i < length; i++) {
        let letter = alpha[random(0, alpha.length - 1)]
        result += letter


    }
    return result
}

module.exports = generate