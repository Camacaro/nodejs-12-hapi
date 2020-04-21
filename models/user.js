'use strict'

const bcrypt = require('bcrypt')

class Users {
    constructor(db) {
        this.db = db
        // raiz de base de datos
        this.ref = this.db.ref()
        this.collection = this.ref.child('users')
    }

    async create(data) {
        data.password = await this.constructor.encrypt(data.password)
        const newUSer = await this.collection.push({...data});

        return newUSer.key        
    }

    async validateUser (data) {
        
        const userQuery = await this.collection
        .orderByChild('email')
        .equalTo( data.email )
        .once('value')

        const userFound = userQuery.val()

        if( userFound ) {
            const userId = Object.keys(userFound)[0]
            const passwordRigth = await bcrypt.compare(data.password, userFound[userId].password)
            const result = passwordRigth ? userFound[userId] : false
            return result
        }

        return false

    }

    static async encrypt(password) {
        const saltRound = 10
        const hashedPassword = await bcrypt.hash(password, saltRound)
        
        return hashedPassword
    }
}

module.exports = Users