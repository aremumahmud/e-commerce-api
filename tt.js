let edit = new Proxy({
    process: 'jn'
}, {
    set: (...args) => {
        console.log(args)
    },

    get: (...args) => {
        console.log(args)
    }
})

edit.danxe = '34'
edit.danxe