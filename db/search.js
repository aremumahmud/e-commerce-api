//const colorModel = require('./Models/color.Model')
const productsModel = require('./Models/products.Model')

require('./conn')

class Search {



    full_text_search(searchString) {
        return new Promise((resolve, reject) => {
            productsModel.find({
                    $text: {
                        $search: searchString
                    }
                })
                .populate('varieties')
                .then(docs => {

                    if (!docs || docs.length === 0) return reject({
                        error: true,
                        type: 'full',
                        message: 'no docs found for this search'
                    })

                    resolve({
                        error: false,
                        type: 'full',
                        data: docs
                    })

                }).catch(err => {
                    //(err)
                    return reject({
                        error: true,
                        type: 'full',
                        error_object: err
                    })
                })
        })
    }

    partial_search(searchString) {
        return new Promise((resolve, reject) => {
            productsModel.find({
                    $or: [{
                        name: {
                            $regex: searchString
                        }
                    }, {
                        description: {
                            $regex: searchString
                        }
                    }, {
                        category: {
                            $regex: searchString
                        }
                    }]
                })
                .populate('varieties')
                .then(res => {
                    if (!res || Object.keys(res).length === 0) return reject({
                        error: true,
                        type: 'partial',
                        message: 'could not find product'
                    })

                    resolve({
                        error: false,
                        type: 'partial',
                        data: res
                    })


                }).catch(err => {
                    //(err)
                })
        })

    }
}

module.exports = new Search()