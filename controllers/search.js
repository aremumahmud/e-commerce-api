const search = require("../db/search")
const RefineSearch = require("../utils/refineSearch")

function search_controller(req, res) {
    let searchString = req.query.search_string
    if (!searchString) return res.status(404).json({
            error: true,
            message: 'search string not provided!'
        })
        //let search = search
    Promise.allSettled([search.full_text_search(searchString), search.partial_search(searchString)]).then(response => {
        console.log(response)
        RefineSearch(response).then(response0 => {
            res.status(200).json(response0)
        })

    })
}

module.exports = search_controller