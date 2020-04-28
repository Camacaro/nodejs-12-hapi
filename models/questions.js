'use strict'

class Questions {
    constructor(db) {
        this.db = db
        // raiz de base de datos
        this.ref = this.db.ref()
        this.collection = this.ref.child('questions')
    }

    async create(data, user) {
        data.owner = user
        const question = await this.collection.push({...data});
        return question.key        
    }
}

module.exports = Questions