// let edit = new Proxy({
//     process: 'jn'
// }, {
//     set: (...args) => {
//         console.log(args)
//     },

const categoryModel = require('./db/Models/category.Model')

//     get: (...args) => {
//         console.log(args)
//     }
// })

// edit.danxe = '34'
// edit.danxe

require('./db/conn')
new categoryModel({
    categories: []
}).save().then(res => {
    console.log('successfully create the category element')
}).catch(err => {
    console.log('failed with error', err)
})