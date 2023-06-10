const { castObject } = require("../db/Models/category.Model")

function RefineSearch(results) {
    return new Promise((resolve, reject) => {
        if (results.constructor.name.toLowerCase() !== 'array') return reject({
                error: true,
                message: 'results to be filtered are not type Array'
            })
            // console.log(results.length)
        let filtered = results.filter(doc => {
                // return
                // console.log(doc.status)
                if (doc.status === 'rejected') {
                    return false
                }
                return true
            }).map(filt => {
                return filt.value.data
            }).flat(1)
            //lets convert to an object
            // console.log(filtered.length)
        let object = {}
        filtered.forEach(data => {
            //console.log('yay')
            object[data._id] = data
        })

        //  console.log(Object.keys(object).length)
        resolve(Object.values(object))
    })

}

module.exports = RefineSearch