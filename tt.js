// // let edit = new Proxy({
// //     process: 'jn'
// // }, {
// //     set: (...args) => {
// //         console.log(args)
// //     },

// const categoryModel = require('./db/Models/category.Model')

// //     get: (...args) => {
// //         console.log(args)
// //     }
// // })

// // edit.danxe = '34'
// // edit.danxe

// require('./db/conn')
// new categoryModel({
//     categories: []
// }).save().then(res => {
//     console.log('successfully create the category element')
// }).catch(err => {
//     console.log('failed with error', err)
// })

const ids = [
    '648c48ab44d3c031bd92ea48',
    '648c48ac44d3c031bd92ea4a',
    '648c48ab44d3c031bd92ea48'
];
require('./db/conn/index')
const mongoose = require('mongoose');
// const colorModel = require('./db/Models/color.Model');
// const ObjectId = mongoose.Types.ObjectId;

// const objectIds = ids.map(id => new ObjectId(id));

// colorModel.find({ '_id': { $in: objectIds } })
//     .then(results => {
//         console.log(results);
//     })
//     .catch(err => {
//         console.error(err);
//     });