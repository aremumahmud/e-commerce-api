require('./conn')

/**
 * this class is for user login and creation! 
 * */
const UserModel = require('./Models/User.Model')

class User {

    /**
     * 
     * @param {*} email users email_address
     * @param {*} username users username
     * @param {*} password users password
     * @returns 
     */
    createUser(email, username, password) {
        return new Promise((res, rej) => {
            new UserModel({
                username,
                email_address: email,
                password
            }).save().then(result => {
                res({
                    sucess: true
                })
            }).catch(err => {
                rej(err)
            })
        })

    }

    findUserById(userId) {
        return new Promise((res, rej) => {

            UserModel.findById(userId)
                .then(result => {
                    // //(result)
                    res(result)
                }).catch(err => {
                    // //(err)
                    rej()
                })

        })
    }

    findUserByEmail(email) {
        return new Promise((res, rej) => {

            UserModel.findOne({ email_address: email })
                .then(result => {
                    // //(result)
                    res(result)
                }).catch(err => {
                    //(err)
                    rej()
                })

        })
    }


    delete_user(id) {
        return UserModel.findByIdAndDelete(id)
    }
}

module.exports = new User()